import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '../data/portfolio';
import { useScrollLock } from '../hooks/smoothScroll';
import { EASE, Magnetic } from './fx';
import { ProjectArt } from './Poster';

const block = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
};

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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryTab, setGalleryTab] = useState<'all' | 'research' | 'screens'>('all');

  const galleryList = project.gallery ?? [];
  const isApp = project.id === 'app-designs';

  useEffect(() => {
    setGalleryTab('all');
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

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
    setLightboxIndex(null);
  }, [project.id]);

  const more = projects.filter((p) => p.id !== project.id);

  return (
    <motion.div
      className="fixed inset-0 z-[140]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`title-${project.id}-modal`}
    >
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <div
        ref={scroller}
        data-lenis-prevent
        className="absolute inset-0 overflow-y-auto overscroll-contain"
        onClick={onClose}
      >
        <motion.div
          className="relative mx-auto min-h-full max-w-5xl bg-ink-2 shadow-2xl sm:my-10 sm:min-h-0 sm:rounded-2xl"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: 30, transition: { duration: 0.3 } }}
        >
          {/* billboard */}
          <div className="relative h-[52vh] min-h-[340px] overflow-hidden sm:rounded-t-2xl">
            <motion.div
              layoutId={`art-${project.id}`}
              className="absolute inset-0"
              transition={{ duration: 0.7, ease: EASE }}
            >
              <ProjectArt project={project} />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/30 to-transparent" />
            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              data-cursor="close"
              aria-label="Close project"
              className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-lg text-bone backdrop-blur transition hover:bg-black"
            >
              ✕
            </button>
            <div className="absolute inset-x-0 bottom-0 px-5 pb-6 sm:px-10">
              <motion.p
                className="mb-2 flex items-center gap-2 text-[11px] font-bold tracking-[0.34em] text-bone/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="font-display text-xl tracking-normal text-crimson-2">C</span> ORIGINAL
              </motion.p>
              <motion.h2
                id={`title-${project.id}-modal`}
                layoutId={`title-${project.id}`}
                className="font-display text-[clamp(2.8rem,8vw,6rem)] leading-[0.86] tracking-wide text-bone"
                transition={{ duration: 0.7, ease: EASE }}
              >
                {project.title}
              </motion.h2>
            </div>
          </div>

          <motion.div
            className="px-5 pb-12 sm:px-10"
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.08, delayChildren: 0.25 }}
          >
            <motion.div variants={block} className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-mist">
              <span className="font-semibold text-[#46e3a8]">{project.year}</span>
              <span className="h-1 w-1 rounded-full bg-smoke" />
              <span>{project.genre}</span>
            </motion.div>

            <motion.p variants={block} className="mt-4 max-w-3xl text-lg leading-relaxed text-bone sm:text-xl">
              {project.logline}
            </motion.p>

            {project.github && (
              <motion.div variants={block} className="mt-6 flex flex-wrap gap-3">
                <Magnetic>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="flex min-h-12 items-center gap-2 rounded-md bg-bone px-6 text-[15px] font-bold text-ink transition hover:bg-white"
                  >
                    GitHub ↗
                  </a>
                </Magnetic>
              </motion.div>
            )}

            {/* Featured Sub-Items (e.g. 9 Hero Designs, 3 Web Designs, Quick Byte, Card Designs, 3D Models) */}
            {project.subItems && project.subItems.length > 0 && (
              <motion.section variants={block} className="mt-12">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">
                    {project.id === 'web-designs'
                      ? '2 Live Web Platforms'
                      : project.id === 'hero-page-designs'
                        ? 'All 9 Hero Page Designs'
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
                        ? 'sm:grid-cols-2'
                        : project.subItems.length === 3
                          ? 'sm:grid-cols-3'
                          : 'sm:grid-cols-2 lg:grid-cols-3'
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

                          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
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
                                className="rounded px-2 py-1 text-[10px] text-smoke transition hover:bg-white/10 hover:text-white"
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

            {/* impact */}
            <motion.section variants={block} className="mt-12">
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">Result / Impact</h3>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-3 lg:grid-cols-4">
                {project.metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    className="bg-ink p-4 sm:p-5"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.07, duration: 0.5, ease: EASE }}
                  >
                    <p
                      className="font-display text-4xl leading-none text-bone sm:text-5xl"
                      style={{ color: i === 0 ? project.palette.accent : undefined }}
                    >
                      {m.value}
                    </p>
                    <p className="mt-2 text-xs leading-snug text-mist">{m.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <div className="mt-12 grid gap-10 lg:grid-cols-[3fr_2fr]">
              <motion.section variants={block}>
                <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">My Contribution</h3>
                <ul className="space-y-4">
                  {project.build.map((b) => (
                    <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-bone/85">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: project.palette.accent }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.section>
              <div className="space-y-10">
                <motion.section variants={block}>
                  <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((t) => (
                      <span key={t} className="glass rounded-full px-3 py-1.5 text-sm font-medium text-bone">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.section>
                <motion.section variants={block}>
                  <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">Key Features</h3>
                  <ul className="space-y-2.5">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-bone/85">
                        <span className="text-crimson-2">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.section>
              </div>
            </div>

            {/* Deliverables Gallery */}
            {galleryList.length > 0 && (() => {
              const researchItems = galleryList.filter((g) => g.category === 'research');
              const screenItems = galleryList.filter((g) => g.category === 'screens' || !g.category);

              return (
                <motion.section variants={block} className="mt-14 border-t border-white/10 pt-10">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-crimson-2">
                        Deliverables & Screens ({galleryList.length})
                      </h3>
                      <p className="mt-1 text-xs text-mist">
                        Click any screen to view full-resolution lightbox & explore details.
                      </p>
                    </div>

                    {isApp && (
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setGalleryTab('all')}
                          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                            galleryTab === 'all'
                              ? 'bg-bone text-black shadow-md'
                              : 'border border-white/10 bg-black/40 text-mist hover:border-white/30 hover:text-white'
                          }`}
                        >
                          All ({galleryList.length})
                        </button>
                        <button
                          type="button"
                          onClick={() => setGalleryTab('research')}
                          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                            galleryTab === 'research'
                              ? 'bg-amber-400 text-black shadow-md'
                              : 'border border-amber-400/30 bg-amber-400/10 text-amber-300 hover:border-amber-400/60'
                          }`}
                        >
                          User Research ({researchItems.length})
                        </button>
                        <button
                          type="button"
                          onClick={() => setGalleryTab('screens')}
                          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                            galleryTab === 'screens'
                              ? 'bg-crimson text-white shadow-md'
                              : 'border border-crimson/30 bg-crimson/10 text-crimson-2 hover:border-crimson/60'
                          }`}
                        >
                          32 Screens ({screenItems.length})
                        </button>
                      </div>
                    )}
                  </div>

                  {isApp ? (
                    <div className="space-y-12">
                      {/* User Research & UX Architecture Section */}
                      {(galleryTab === 'all' || galleryTab === 'research') && researchItems.length > 0 && (
                        <div>
                          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
                              <span className="h-2 w-2 rounded-full bg-amber-400" />
                              User Research & UX Discovery ({researchItems.length} Frameworks)
                            </h4>
                            <span className="font-mono text-xs text-smoke">Empathy • Flow • Journey • Synthesis</span>
                          </div>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {researchItems.map((g) => {
                              const originalIndex = galleryList.findIndex((item) => item.src === g.src);
                              return (
                                <div
                                  key={g.src}
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => openLightbox(originalIndex !== -1 ? originalIndex : 0)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      openLightbox(originalIndex !== -1 ? originalIndex : 0);
                                    }
                                  }}
                                  className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/50 p-3 transition duration-300 hover:border-amber-400/50 hover:bg-black/70 hover:shadow-[0_10px_30px_rgba(245,158,11,0.12)]"
                                >
                                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-black/80">
                                    <img
                                      src={g.src}
                                      alt={g.label}
                                      loading="lazy"
                                      className="h-full w-full object-contain p-1 transition duration-500 group-hover:scale-[1.03]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition group-hover:opacity-30" />
                                    <span className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded bg-black/85 px-2 py-0.5 text-[10px] font-medium text-bone/90 opacity-0 backdrop-blur transition group-hover:opacity-100">
                                      🔍 Click to zoom
                                    </span>
                                  </div>
                                  <div className="mt-2.5">
                                    <p className="text-xs font-semibold text-bone transition group-hover:text-amber-300">
                                      {g.label}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* 32 Production Screens Section */}
                      {(galleryTab === 'all' || galleryTab === 'screens') && screenItems.length > 0 && (
                        <div>
                          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-crimson-2">
                              <span className="h-2 w-2 rounded-full bg-crimson-2" />
                              32 Production Mobile Screens ({screenItems.length})
                            </h4>
                            <span className="font-mono text-xs text-smoke">Splash to Order Delivery</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                            {screenItems.map((g) => {
                              const originalIndex = galleryList.findIndex((item) => item.src === g.src);
                              return (
                                <div
                                  key={g.src}
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => openLightbox(originalIndex !== -1 ? originalIndex : 0)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      openLightbox(originalIndex !== -1 ? originalIndex : 0);
                                    }
                                  }}
                                  className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/40 transition duration-300 hover:border-crimson-2/50 hover:bg-black/60"
                                >
                                  <div className="relative aspect-[9/16] overflow-hidden">
                                    <img
                                      src={g.src}
                                      alt={g.label}
                                      loading="lazy"
                                      className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 transition group-hover:opacity-60" />
                                    <span className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded bg-black/85 px-1.5 py-0.5 text-[9px] font-medium text-bone/90 opacity-0 backdrop-blur transition group-hover:opacity-100">
                                      🔍 Zoom
                                    </span>
                                  </div>
                                  <div className="p-2">
                                    <p className="truncate text-[11px] font-medium text-bone/90 transition group-hover:text-white">
                                      {g.label}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`grid gap-4 ${
                        galleryList.length === 2
                          ? 'grid-cols-1 sm:grid-cols-2'
                          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                      }`}
                    >
                      {galleryList.map((g, i) => {
                        if (g.link) {
                          return (
                            <a
                              key={i}
                              href={g.link}
                              target="_blank"
                              rel="noreferrer"
                              data-cursor="link"
                              className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/40 transition hover:border-cyan-400/60 hover:bg-black/60 hover:shadow-[0_12px_36px_rgba(34,211,238,0.14)]"
                            >
                              <div className="relative aspect-[16/10] overflow-hidden">
                                <img
                                  src={g.src}
                                  alt={g.label}
                                  loading="lazy"
                                  className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 transition group-hover:opacity-50" />
                                <div className="absolute inset-x-0 bottom-0 p-3.5">
                                  <p className="text-xs font-semibold leading-tight tracking-wide text-bone drop-shadow group-hover:text-cyan-300 transition">
                                    {g.label}
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
                                        openLightbox(i);
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
                            key={i}
                            role="button"
                            tabIndex={0}
                            onClick={() => openLightbox(i)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                openLightbox(i);
                              }
                            }}
                            className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/40 transition hover:border-crimson-2/50"
                          >
                            <div className="relative aspect-[16/10] overflow-hidden">
                              <img
                                src={g.src}
                                alt={g.label}
                                loading="lazy"
                                className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 transition group-hover:opacity-60" />
                              <div className="absolute inset-x-0 bottom-0 p-3.5">
                                <p className="text-xs font-semibold leading-tight tracking-wide text-bone drop-shadow">
                                  {g.label}
                                </p>
                                <div className="mt-2 flex items-center justify-between gap-2">
                                  <span className="inline-block text-[10px] font-medium text-crimson-2 opacity-0 transition group-hover:opacity-100">
                                    🔍 Click to zoom
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.section>
              );
            })()}

            {/* More Originals */}
            <motion.section variants={block} className="mt-14 border-t border-white/10 pt-8">
              <h3 className="mb-4 font-sans text-lg font-semibold text-bone">More Originals</h3>
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
                      <p className="font-display text-3xl leading-none tracking-wide text-bone">{p.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.section>
          </motion.div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && galleryList[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl sm:p-8"
            onClick={closeLightbox}
          >
            <div
              className="relative flex max-h-full max-w-5xl flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close Preview"
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-bone transition hover:bg-white/20"
              >
                ✕
              </button>

              <div className="relative flex max-h-[82vh] items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-black/80 shadow-2xl">
                <img
                  src={galleryList[lightboxIndex].src}
                  alt={galleryList[lightboxIndex].label}
                  className="max-h-[80vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-semibold text-bone sm:text-sm">
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
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevLightbox}
                    aria-label="Previous image"
                    className="rounded-lg bg-white/10 px-3 py-1.5 font-bold text-bone transition hover:bg-white/20"
                  >
                    ← Prev
                  </button>
                  <span className="font-mono text-smoke">
                    {lightboxIndex + 1} / {galleryList.length}
                  </span>
                  <button
                    type="button"
                    onClick={nextLightbox}
                    aria-label="Next image"
                    className="rounded-lg bg-white/10 px-3 py-1.5 font-bold text-bone transition hover:bg-white/20"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
