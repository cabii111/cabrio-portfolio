import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, type Project, type ProjectGalleryItem } from '../data/portfolio';
import { useScrollLock } from '../hooks/smoothScroll';
import { EASE, Magnetic } from './fx';
import { ProjectArt } from './Poster';

const block = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE } },
};

const CATEGORY_NAMES: Record<string, string> = {
  saas: 'SaaS & AI Platforms',
  creative: 'Creative & Agency',
  university: 'University Portal (TNAU)',
  commercial: 'Commercial Biotech (BioFarmux)',
  research: 'User Research & UX',
  screens: '32 Mobile Screens',
  posters: 'Award Posters',
  branding: 'Brand Identity',
  hero: 'Hero & Spatial Views',
  studio: 'Studio & Topology',
};

const CATEGORY_ACCENTS: Record<string, { active: string; inactive: string }> = {
  saas: {
    active: 'bg-cyan-400 text-black shadow-md shadow-cyan-400/20',
    inactive: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300 hover:border-cyan-400/60',
  },
  creative: {
    active: 'bg-purple-400 text-black shadow-md shadow-purple-400/20',
    inactive: 'border-purple-400/30 bg-purple-400/10 text-purple-300 hover:border-purple-400/60',
  },
  university: {
    active: 'bg-emerald-400 text-black shadow-md shadow-emerald-400/20',
    inactive: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300 hover:border-emerald-400/60',
  },
  commercial: {
    active: 'bg-cyan-400 text-black shadow-md shadow-cyan-400/20',
    inactive: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300 hover:border-cyan-400/60',
  },
  research: {
    active: 'bg-amber-400 text-black shadow-md shadow-amber-400/20',
    inactive: 'border-amber-400/30 bg-amber-400/10 text-amber-300 hover:border-amber-400/60',
  },
  screens: {
    active: 'bg-crimson text-white shadow-md shadow-crimson/30',
    inactive: 'border-crimson/30 bg-crimson/10 text-crimson-2 hover:border-crimson/60',
  },
  posters: {
    active: 'bg-rose-400 text-black shadow-md shadow-rose-400/20',
    inactive: 'border-rose-400/30 bg-rose-400/10 text-rose-300 hover:border-rose-400/60',
  },
  branding: {
    active: 'bg-amber-400 text-black shadow-md shadow-amber-400/20',
    inactive: 'border-amber-400/30 bg-amber-400/10 text-amber-300 hover:border-amber-400/60',
  },
  hero: {
    active: 'bg-cyan-400 text-black shadow-md shadow-cyan-400/20',
    inactive: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300 hover:border-cyan-400/60',
  },
  studio: {
    active: 'bg-indigo-400 text-white shadow-md shadow-indigo-400/20',
    inactive: 'border-indigo-400/30 bg-indigo-400/10 text-indigo-300 hover:border-indigo-400/60',
  },
};

type SectionTab = 'all' | 'deliverables' | 'casestudy' | 'impact';

export default function ProjectModal({
  project,
  onClose,
  onSwitch,
}: {
  project: Project;
  onClose: () => void;
  onSwitch: (p: Project) => void;
}) {
  useScrollLock(true);
  const scroller = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  // Active section tab ('all' | 'deliverables' | 'casestudy' | 'impact')
  const [activeSection, setActiveSection] = useState<SectionTab>('all');
  // Active category tab for deliverables
  const [categoryTab, setCategoryTab] = useState<string>('all');
  // Full-resolution lightbox index
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Swipe gesture trackers for mobile lightbox
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const galleryList = project.gallery ?? [];
  const isApp = project.id === 'app-designs';

  // Discover all distinct categories in this project's gallery
  const uniqueCategories = Array.from(
    new Set(galleryList.map((g) => g.category).filter(Boolean))
  ) as string[];

  // Reset category and scroll on project change
  useEffect(() => {
    setCategoryTab('all');
    setActiveSection('all');
    setLightboxIndex(null);
    scroller.current?.scrollTo({ top: 0 });
  }, [project.id]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null && galleryList.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % galleryList.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null && galleryList.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + galleryList.length) % galleryList.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') {
          e.stopPropagation();
          setLightboxIndex(null);
        } else if (e.key === 'ArrowRight') {
          if (galleryList.length > 0) {
            setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryList.length : 0));
          }
        } else if (e.key === 'ArrowLeft') {
          if (galleryList.length > 0) {
            setLightboxIndex((prev) =>
              prev !== null ? (prev - 1 + galleryList.length) % galleryList.length : 0
            );
          }
        }
      } else {
        if (e.key === 'Escape') onClose();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, [lightboxIndex, galleryList.length, onClose]);

  // Touch handlers for mobile swipe in lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        nextLightbox(); // swiped left -> next
      } else {
        prevLightbox(); // swiped right -> previous
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Filter gallery items by category
  const filteredGallery =
    categoryTab === 'all'
      ? galleryList
      : galleryList.filter((item) => item.category === categoryTab);

  const more = projects.filter((p) => p.id !== project.id);

  // App designs special groups
  const researchItems = galleryList.filter((g) => g.category === 'research');
  const screenItems = galleryList.filter((g) => g.category === 'screens' || !g.category);

  return (
    <motion.div
      className="fixed inset-0 z-[140]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`title-${project.id}-modal`}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Scroller Container */}
      <div
        ref={scroller}
        data-lenis-prevent
        className="absolute inset-0 overflow-y-auto overscroll-contain"
        onClick={onClose}
      >
        <motion.div
          className="relative mx-auto min-h-full max-w-5xl bg-ink-2 shadow-2xl sm:my-8 sm:min-h-0 sm:rounded-2xl"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, y: 30, transition: { duration: 0.3 } }}
        >
          {/* Billboard Hero Header */}
          <div className="relative h-[44vh] min-h-[300px] overflow-hidden sm:h-[52vh] sm:min-h-[360px] sm:rounded-t-2xl">
            <motion.div
              layoutId={`art-${project.id}`}
              className="absolute inset-0"
              transition={{ duration: 0.7, ease: EASE }}
            >
              <ProjectArt project={project} />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/35 to-transparent" />

            {/* Mobile-Friendly Accessible Close Button */}
            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              data-cursor="close"
              aria-label="Close project"
              className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/75 text-lg text-bone shadow-2xl backdrop-blur transition hover:border-white/40 hover:bg-black active:scale-95"
            >
              ✕
            </button>

            {/* Title & Metadata */}
            <div className="absolute inset-x-0 bottom-0 px-4 pb-5 sm:px-10 sm:pb-6">
              <motion.p
                className="mb-1.5 flex items-center gap-2 text-[10px] font-bold tracking-[0.34em] text-bone/85 sm:text-[11px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="font-display text-xl tracking-normal text-crimson-2">C</span> ORIGINAL
              </motion.p>
              <motion.h2
                id={`title-${project.id}-modal`}
                layoutId={`title-${project.id}`}
                className="font-display text-[clamp(2.2rem,7.5vw,5.5rem)] leading-[0.88] tracking-wide text-bone"
                transition={{ duration: 0.7, ease: EASE }}
              >
                {project.title}
              </motion.h2>
            </div>
          </div>

          {/* Sticky Section Navigation Bar for Mobile, Tablet & Desktop */}
          <div className="sticky top-0 z-20 border-b border-white/10 bg-ink-2/95 px-4 py-2.5 backdrop-blur-md sm:px-10">
            <div className="flex items-center justify-between gap-3">
              <nav
                className="no-scrollbar flex flex-nowrap items-center gap-1.5 overflow-x-auto py-0.5 sm:gap-2"
                aria-label="Project section navigation"
              >
                {[
                  { id: 'all' as SectionTab, label: 'All Story', icon: '🎬' },
                  {
                    id: 'deliverables' as SectionTab,
                    label: 'Deliverables & Screens',
                    icon: '🖼️',
                    badge: galleryList.length > 0 ? String(galleryList.length) : undefined,
                  },
                  { id: 'casestudy' as SectionTab, label: 'Case Study & Tech', icon: '📖' },
                  { id: 'impact' as SectionTab, label: 'Impact & Results', icon: '⚡' },
                ].map((s) => {
                  const isActive = activeSection === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveSection(s.id)}
                      className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition active:scale-95 ${
                        isActive
                          ? 'bg-bone text-black shadow-md'
                          : 'border border-white/10 bg-white/5 text-mist hover:border-white/25 hover:text-white'
                      }`}
                    >
                      <span className="text-[11px]">{s.icon}</span>
                      <span>{s.label}</span>
                      {s.badge && (
                        <span
                          className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                            isActive ? 'bg-black text-bone' : 'bg-white/15 text-white'
                          }`}
                        >
                          {s.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Quick Jump back to All if in focused tab */}
              {activeSection !== 'all' && (
                <button
                  type="button"
                  onClick={() => setActiveSection('all')}
                  className="hidden shrink-0 text-xs text-mist transition hover:text-white sm:inline-block"
                >
                  Show All Sections ↓
                </button>
              )}
            </div>
          </div>

          {/* Main Modal Body */}
          <motion.div
            className="px-4 pb-12 pt-6 sm:px-10 sm:pb-16"
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.08, delayChildren: 0.15 }}
          >
            {/* Meta Tags & Logline */}
            <motion.div variants={block} className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-mist">
              <span className="font-semibold text-[#46e3a8]">{project.year}</span>
              <span className="h-1 w-1 rounded-full bg-smoke" />
              <span>{project.genre}</span>
            </motion.div>

            <motion.p variants={block} className="mt-3 max-w-3xl text-base leading-relaxed text-bone sm:mt-4 sm:text-xl">
              {project.logline}
            </motion.p>

            {project.github && (
              <motion.div variants={block} className="mt-5 flex flex-wrap gap-3">
                <Magnetic>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="flex min-h-11 items-center gap-2 rounded-md bg-bone px-5 text-sm font-bold text-ink transition hover:bg-white"
                  >
                    GitHub ↗
                  </a>
                </Magnetic>
              </motion.div>
            )}

            {/* SECTION 1: Featured Sub-Items / Showcase Overview */}
            {(activeSection === 'all' || activeSection === 'deliverables') &&
              project.subItems &&
              project.subItems.length > 0 && (
                <motion.section variants={block} className="mt-10 sm:mt-12">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">
                      {project.id === 'web-designs'
                        ? '2 Live Web Platforms'
                        : project.id === 'hero-page-designs'
                          ? 'Hero Page Productions'
                          : project.id === 'app-designs'
                            ? 'App Production Overview'
                            : project.id === 'graphics-designs'
                              ? 'Graphic Identity Suite'
                              : '3D Spatial Series'}
                    </h3>
                    <span className="font-mono text-xs text-smoke">
                      {project.subItems.length} {project.subItems.length === 1 ? 'Production' : 'Productions'}
                    </span>
                  </div>

                  <div
                    className={`grid gap-4 ${
                      project.subItems.length === 1
                        ? 'grid-cols-1'
                        : project.subItems.length === 2
                          ? 'grid-cols-1 sm:grid-cols-2'
                          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    }`}
                  >
                    {project.subItems.map((item, idx) => {
                      const matchIndex = galleryList.findIndex((g) => g.src === item.image);

                      if (item.link) {
                        return (
                          <a
                            key={idx}
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor="link"
                            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-black/40 p-4 transition-all duration-300 hover:border-cyan-400/60 hover:bg-black/70 hover:shadow-[0_12px_36px_rgba(34,211,238,0.14)]"
                          >
                            <div>
                              <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-lg bg-black/60">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  loading="lazy"
                                  className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 transition group-hover:opacity-40" />
                                {item.badge && (
                                  <span className="absolute left-2.5 top-2.5 rounded-full bg-cyan-500/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black shadow">
                                    {item.badge}
                                  </span>
                                )}
                                <span className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-black/85 px-2.5 py-1 text-[11px] font-semibold text-cyan-300 opacity-0 backdrop-blur transition group-hover:opacity-100">
                                  <span>Open Live Website</span>
                                  <span>↗</span>
                                </span>
                              </div>
                              <h4 className="font-display text-xl tracking-wide text-bone transition group-hover:text-cyan-300">
                                {item.title}
                              </h4>
                              <p className="mt-1 text-xs leading-relaxed text-mist line-clamp-3">
                                {item.description}
                              </p>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
                              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/50 bg-cyan-500/20 px-3.5 py-1.5 text-xs font-semibold text-cyan-200 transition group-hover:bg-cyan-400 group-hover:text-black">
                                <span>Visit Live Website</span>
                                <span className="text-[11px]">↗</span>
                              </span>
                              {matchIndex !== -1 && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    openLightbox(matchIndex);
                                  }}
                                  title="Zoom full-resolution design image"
                                  className="rounded px-2.5 py-1.5 text-xs text-smoke transition hover:bg-white/10 hover:text-white"
                                >
                                  🔍 Zoom Preview
                                </button>
                              )}
                            </div>
                          </a>
                        );
                      }

                      const handleSubItemClick = () => {
                        if (matchIndex !== -1) {
                          openLightbox(matchIndex);
                        } else if (idx === 1 && isApp) {
                          const firstScreen = galleryList.findIndex((g) => g.category === 'screens');
                          openLightbox(firstScreen !== -1 ? firstScreen : 0);
                        } else {
                          openLightbox(0);
                        }
                      };

                      return (
                        <div
                          key={idx}
                          role="button"
                          tabIndex={0}
                          onClick={handleSubItemClick}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleSubItemClick();
                            }
                          }}
                          className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/40 p-4 transition-all duration-300 hover:border-crimson-2/50 hover:bg-black/60"
                        >
                          <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-lg bg-black/60">
                            <img
                              src={item.image}
                              alt={item.title}
                              loading="lazy"
                              className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            {item.badge && (
                              <span className="absolute left-2.5 top-2.5 rounded-full bg-crimson/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-bone shadow">
                                {item.badge}
                              </span>
                            )}
                            <span className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded bg-black/75 px-2 py-0.5 text-[10px] font-medium text-bone/90 opacity-0 backdrop-blur transition group-hover:opacity-100">
                              🔍 View Full Image
                            </span>
                          </div>
                          <h4 className="font-display text-xl tracking-wide text-bone transition group-hover:text-white">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-xs leading-relaxed text-mist line-clamp-3">
                            {item.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.section>
              )}

            {/* SECTION 2: Impact & Results */}
            {(activeSection === 'all' || activeSection === 'impact') && (
              <motion.section variants={block} className="mt-10 sm:mt-12">
                <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">
                  Result / Impact
                </h3>
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-3 lg:grid-cols-4">
                  {project.metrics.map((m, i) => (
                    <motion.div
                      key={m.label}
                      className="bg-ink p-3.5 sm:p-5"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 0.4, ease: EASE }}
                    >
                      <p
                        className="font-display text-3xl leading-none text-bone sm:text-5xl"
                        style={{ color: i === 0 ? project.palette.accent : undefined }}
                      >
                        {m.value}
                      </p>
                      <p className="mt-2 text-xs leading-snug text-mist">{m.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* SECTION 3: Case Study, Contribution, Tech Stack, Features */}
            {(activeSection === 'all' || activeSection === 'casestudy') && (
              <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-[3fr_2fr]">
                <motion.section variants={block}>
                  <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">
                    My Contribution
                  </h3>
                  <ul className="space-y-3.5 sm:space-y-4">
                    {project.build.map((b) => (
                      <li key={b} className="flex gap-3 text-sm leading-relaxed text-bone/85 sm:text-[15px]">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: project.palette.accent }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.section>

                <div className="space-y-8 sm:space-y-10">
                  <motion.section variants={block}>
                    <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((t) => (
                        <span key={t} className="glass rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium text-bone">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.section>

                  <motion.section variants={block}>
                    <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">
                      Key Features
                    </h3>
                    <ul className="space-y-2.5">
                      {project.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-xs sm:text-sm text-bone/85">
                          <span className="text-crimson-2">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </motion.section>
                </div>
              </div>
            )}

            {/* SECTION 4: Deliverables Gallery with Category Tabs for All 5 Projects */}
            {(activeSection === 'all' || activeSection === 'deliverables') && galleryList.length > 0 && (
              <motion.section variants={block} className="mt-12 border-t border-white/10 pt-8 sm:mt-14 sm:pt-10">
                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">
                      Deliverables & Gallery ({galleryList.length})
                    </h3>
                    <p className="mt-1 text-xs text-mist">
                      Tap any item to view full-resolution lightbox & explore details.
                    </p>
                  </div>

                  {/* Dynamic Category Filter Tabs for All Projects */}
                  {uniqueCategories.length > 0 && (
                    <div className="no-scrollbar flex flex-wrap items-center gap-2 overflow-x-auto">
                      <button
                        type="button"
                        onClick={() => setCategoryTab('all')}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition active:scale-95 ${
                          categoryTab === 'all'
                            ? 'bg-bone text-black shadow-md'
                            : 'border border-white/10 bg-black/40 text-mist hover:border-white/30 hover:text-white'
                        }`}
                      >
                        All ({galleryList.length})
                      </button>

                      {uniqueCategories.map((cat) => {
                        const count = galleryList.filter((g) => g.category === cat).length;
                        const label = CATEGORY_NAMES[cat] ?? cat.toUpperCase();
                        const styling = CATEGORY_ACCENTS[cat] ?? {
                          active: 'bg-bone text-black shadow-md',
                          inactive: 'border border-white/10 bg-black/40 text-mist hover:text-white',
                        };

                        const isCatActive = categoryTab === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setCategoryTab(cat)}
                            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition active:scale-95 ${
                              isCatActive ? styling.active : styling.inactive
                            }`}
                          >
                            {label} ({count})
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Gallery Items Grid */}
                {isApp && categoryTab === 'all' ? (
                  // Quick Byte special dual-section layout when 'all' is selected
                  <div className="space-y-10 sm:space-y-12">
                    {/* User Research & UX Architecture Section */}
                    {researchItems.length > 0 && (
                      <div>
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
                            <span className="h-2 w-2 rounded-full bg-amber-400" />
                            User Research & UX Discovery ({researchItems.length} Frameworks)
                          </h4>
                          <span className="font-mono text-[11px] text-smoke">Empathy • Flow • Journey • Synthesis</span>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {researchItems.map((g) => {
                            const originalIndex = galleryList.findIndex((item) => item.src === g.src);
                            return (
                              <GalleryCard
                                key={g.src}
                                item={g}
                                onZoom={() => openLightbox(originalIndex !== -1 ? originalIndex : 0)}
                                isResearch
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 32 Production Screens Section */}
                    {screenItems.length > 0 && (
                      <div>
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-crimson-2">
                            <span className="h-2 w-2 rounded-full bg-crimson-2" />
                            32 Production Mobile Screens ({screenItems.length})
                          </h4>
                          <span className="font-mono text-[11px] text-smoke">Splash to Order Delivery</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
                          {screenItems.map((g) => {
                            const originalIndex = galleryList.findIndex((item) => item.src === g.src);
                            return (
                              <AppScreenCard
                                key={g.src}
                                item={g}
                                onZoom={() => openLightbox(originalIndex !== -1 ? originalIndex : 0)}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : isApp && categoryTab === 'screens' ? (
                  // Quick Byte 32 screens filtered view
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
                    {filteredGallery.map((g) => {
                      const originalIndex = galleryList.findIndex((item) => item.src === g.src);
                      return (
                        <AppScreenCard
                          key={g.src}
                          item={g}
                          onZoom={() => openLightbox(originalIndex !== -1 ? originalIndex : 0)}
                        />
                      );
                    })}
                  </div>
                ) : (
                  // Universal responsive gallery grid for Hero Pages, Web Platforms, 3D Models, Graphics, etc.
                  <div
                    className={`grid gap-4 ${
                      filteredGallery.length === 1
                        ? 'grid-cols-1'
                        : filteredGallery.length === 2
                          ? 'grid-cols-1 sm:grid-cols-2'
                          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    }`}
                  >
                    {filteredGallery.map((g, i) => {
                      const originalIndex = galleryList.findIndex((item) => item.src === g.src);
                      return (
                        <GalleryCard
                          key={g.src || i}
                          item={g}
                          onZoom={() => openLightbox(originalIndex !== -1 ? originalIndex : i)}
                        />
                      );
                    })}
                  </div>
                )}
              </motion.section>
            )}

            {/* SECTION 5: More Originals */}
            {activeSection === 'all' && (
              <motion.section variants={block} className="mt-12 border-t border-white/10 pt-8 sm:mt-14">
                <h3 className="mb-4 font-sans text-base font-semibold text-bone sm:text-lg">
                  More Originals
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {more.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      data-cursor="view"
                      onClick={() => onSwitch(p)}
                      className="group relative aspect-video overflow-hidden rounded-xl text-left ring-1 ring-white/10 transition hover:ring-white/30"
                    >
                      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                        <ProjectArt project={p} />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-mist">{p.genre}</p>
                        <p className="font-display text-2xl sm:text-3xl leading-none tracking-wide text-bone">{p.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.section>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Touch-Friendly Swipe Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && galleryList[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-between bg-black/95 p-3 backdrop-blur-xl sm:p-6"
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar with Safe Inset & Close Button */}
            <div
              className="flex w-full max-w-5xl items-center justify-between gap-3 pt-[max(0.5rem,env(safe-area-inset-top))]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-mono font-medium text-bone">
                  {lightboxIndex + 1} / {galleryList.length}
                </span>
                <span className="hidden sm:inline-block text-xs text-smoke">
                  (Use Arrow keys or Swipe to navigate)
                </span>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close Preview"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-bone shadow-lg transition hover:bg-white/25 active:scale-95"
              >
                ✕
              </button>
            </div>

            {/* Main Image Stage with Desktop Chevrons */}
            <div
              className="relative flex flex-1 w-full max-w-5xl items-center justify-center overflow-hidden py-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button (Desktop/Tablet) */}
              <button
                type="button"
                onClick={prevLightbox}
                aria-label="Previous image"
                className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/70 text-2xl text-bone shadow-2xl backdrop-blur transition hover:bg-white/20 active:scale-95"
              >
                ‹
              </button>

              {/* Next Button (Desktop/Tablet) */}
              <button
                type="button"
                onClick={nextLightbox}
                aria-label="Next image"
                className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/70 text-2xl text-bone shadow-2xl backdrop-blur transition hover:bg-white/20 active:scale-95"
              >
                ›
              </button>

              <div className="relative flex max-h-[72vh] sm:max-h-[80vh] items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-black/85 shadow-2xl">
                <img
                  src={galleryList[lightboxIndex].src}
                  alt={galleryList[lightboxIndex].label}
                  className="max-h-[70vh] sm:max-h-[78vh] w-auto max-w-full object-contain"
                />
              </div>
            </div>

            {/* Bottom Controls & Info Bar */}
            <div
              className="flex w-full max-w-5xl flex-col sm:flex-row items-center justify-between gap-3 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-center sm:text-left">
                <span className="text-xs sm:text-sm font-semibold text-bone">
                  {galleryList[lightboxIndex].label}
                </span>

                {galleryList[lightboxIndex].link && (
                  <a
                    href={galleryList[lightboxIndex].link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-black"
                  >
                    <span>Visit Live Website</span>
                    <span>↗</span>
                  </a>
                )}
              </div>

              {/* Mobile / Universal Prev & Next buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevLightbox}
                  aria-label="Previous image"
                  className="rounded-lg border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-bone transition hover:bg-white/20 active:scale-95"
                >
                  ← Prev
                </button>
                <span className="sm:hidden text-[11px] text-smoke">
                  Swipe ← →
                </span>
                <button
                  type="button"
                  onClick={nextLightbox}
                  aria-label="Next image"
                  className="rounded-lg border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-bone transition hover:bg-white/20 active:scale-95"
                >
                  Next →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/** Standard Gallery Card for Web, Hero, Graphics, and 3D Models */
function GalleryCard({
  item,
  onZoom,
  isResearch = false,
}: {
  item: ProjectGalleryItem;
  onZoom: () => void;
  isResearch?: boolean;
}) {
  if (item.link) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noreferrer"
        data-cursor="link"
        className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/40 transition hover:border-cyan-400/60 hover:bg-black/60 hover:shadow-[0_12px_36px_rgba(34,211,238,0.14)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={item.src}
            alt={item.label}
            loading="lazy"
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 transition group-hover:opacity-50" />
          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5">
            <p className="text-xs font-semibold leading-tight tracking-wide text-bone drop-shadow group-hover:text-cyan-300 transition">
              {item.label}
            </p>
            <div className="mt-2.5 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/50 bg-cyan-500/20 px-3 py-1 text-[11px] font-semibold text-cyan-200 transition group-hover:bg-cyan-400 group-hover:text-black">
                <span>Open Live Website</span>
                <span className="text-[10px]">↗</span>
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onZoom();
                }}
                title="Zoom full image"
                className="rounded bg-black/70 px-2 py-1 text-[10px] text-smoke backdrop-blur transition hover:bg-white/20 hover:text-white"
              >
                🔍 Zoom
              </button>
            </div>
          </div>
        </div>
      </a>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onZoom}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onZoom();
        }
      }}
      className={`group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/40 transition hover:border-crimson-2/50 ${
        isResearch
          ? 'p-3 hover:border-amber-400/50 hover:bg-black/70 hover:shadow-[0_10px_30px_rgba(245,158,11,0.12)]'
          : ''
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-black/60">
        <img
          src={item.src}
          alt={item.label}
          loading="lazy"
          className={`h-full w-full transition duration-500 ${
            isResearch ? 'object-contain p-1 group-hover:scale-[1.03]' : 'object-cover object-top group-hover:scale-105'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 transition group-hover:opacity-60" />
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5">
          <p className="text-xs font-semibold leading-tight tracking-wide text-bone drop-shadow">
            {item.label}
          </p>
          <div className="mt-1.5 flex items-center justify-between gap-2">
            <span
              className={`inline-block text-[10px] font-medium transition ${
                isResearch ? 'text-amber-300' : 'text-crimson-2'
              } opacity-0 group-hover:opacity-100`}
            >
              🔍 Click to zoom
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Specialized 9:16 Mobile Screen Card for Quick Byte App */
function AppScreenCard({
  item,
  onZoom,
}: {
  item: ProjectGalleryItem;
  onZoom: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onZoom}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onZoom();
        }
      }}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/40 transition duration-300 hover:border-crimson-2/50 hover:bg-black/60 active:scale-95"
    >
      <div className="relative aspect-[9/16] overflow-hidden">
        <img
          src={item.src}
          alt={item.label}
          loading="lazy"
          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 transition group-hover:opacity-60" />
        <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/85 px-1.5 py-0.5 text-[9px] font-medium text-bone/90 opacity-0 backdrop-blur transition group-hover:opacity-100">
          🔍 Zoom
        </span>
      </div>
      <div className="p-2 sm:p-2.5">
        <p className="truncate text-[10px] sm:text-[11px] font-medium text-bone/90 transition group-hover:text-white">
          {item.label}
        </p>
      </div>
    </div>
  );
}
