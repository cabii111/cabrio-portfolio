import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { seasons, type Season } from '../data/portfolio';
import { useDesktop, useReducedMotionPref } from '../hooks/useMedia';
import { EASE, SectionHeading } from './fx';
import EpisodeCard from './EpisodeCard';
import { RailButtons } from './Rail';

/**
 * MY JOURNEY — 5 Seasons telling the stages of the resume.
 * On desktop: Pinned full-screen with smooth scroll-linked crossfade.
 * - Shows ONLY the active season badge at the top to preserve maximum breathing room.
 * - Other seasons are hidden until scrolled into view.
 * - Each season features a centered title, synopsis, and big centered episode cards.
 * - As you scroll, Season 1 slowly fades out while Season 2 slowly fades in (and so forth).
 * - After Season 5, the entire section gently moves up and fades out into Originals.
 * On mobile / reduced motion: falls back to the clean tabbed interactive view.
 */
export default function Seasons() {
  const desktop = useDesktop();
  const reduced = useReducedMotionPref();

  return desktop && !reduced ? <PinnedJourney /> : <StandardJourney />;
}

/* ------------------------------------------------------------------ */
/* Desktop Scroll-Pinned Journey with Centered Big Cards & Crossfade  */
/* ------------------------------------------------------------------ */
function PinnedJourney() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [activeSeason, setActiveSeason] = useState(0);

  // Scroll Progress across the 480vh container
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  // Per-season scroll crossfades (Season 0 through Season 4)
  const op0 = useTransform(scrollYProgress, [0.00, 0.12, 0.20], [1, 1, 0]);
  const y0 = useTransform(scrollYProgress, [0.00, 0.12, 0.20], [0, 0, -25]);

  const op1 = useTransform(scrollYProgress, [0.12, 0.20, 0.32, 0.40], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.12, 0.20, 0.32, 0.40], [25, 0, 0, -25]);

  const op2 = useTransform(scrollYProgress, [0.32, 0.40, 0.52, 0.60], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.32, 0.40, 0.52, 0.60], [25, 0, 0, -25]);

  const op3 = useTransform(scrollYProgress, [0.52, 0.60, 0.72, 0.80], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.52, 0.60, 0.72, 0.80], [25, 0, 0, -25]);

  const op4 = useTransform(scrollYProgress, [0.72, 0.80, 0.88, 0.98], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.72, 0.80, 0.88, 1.00], [25, 0, 0, -30]);

  const seasonMotions = [
    { opacity: op0, y: y0 },
    { opacity: op1, y: y1 },
    { opacity: op2, y: y2 },
    { opacity: op3, y: y3 },
    { opacity: op4, y: y4 },
  ];

  // Upward motion & fadeout transition into the Originals section
  const exitY = useTransform(scrollYProgress, [0, 0.88, 1.00], [0, 0, -140]);
  const exitOpacity = useTransform(scrollYProgress, [0, 0.88, 0.98], [1, 1, 0]);
  const exitScale = useTransform(scrollYProgress, [0, 0.88, 1.00], [1, 1, 0.96]);

  // Bottom progress bar (0% -> 100% across the 5 seasons)
  const progressBar = useTransform(scrollYProgress, [0, 0.88], [0, 1]);

  // Synchronize active tab pill with scroll position
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    let idx = 0;
    if (p < 0.16) idx = 0;
    else if (p < 0.36) idx = 1;
    else if (p < 0.56) idx = 2;
    else if (p < 0.76) idx = 3;
    else idx = 4;

    if (idx !== activeSeason) {
      setActiveSeason(idx);
    }
  });

  // Clicking a step indicator smoothly scrolls the page to that season
  const scrollToSeason = (idx: number) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const currentScrollY = window.scrollY || window.pageYOffset;
    const wrapTop = currentScrollY + rect.top;
    const totalScrollable = wrapRef.current.scrollHeight - window.innerHeight;
    const targetPoints = [0.0, 0.25, 0.45, 0.65, 0.83];
    const targetProgress = targetPoints[idx] ?? idx * 0.2;
    const targetY = wrapTop + targetProgress * totalScrollable;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const currentSeason = seasons[activeSeason];

  return (
    <div ref={wrapRef} style={{ height: '480vh' }} className="relative">
      {/* Sticky Fullscreen Container */}
      <motion.div
        style={{
          y: exitY,
          opacity: exitOpacity,
          scale: exitScale,
        }}
        className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden px-6 py-6 sm:px-12 sm:py-8 lg:px-16"
      >
        {/* Subtle Ambient Red Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_65%_at_50%_50%,rgba(229,19,43,0.08),transparent_70%)]"
        />

        {/* TOP: Fixed Section Header with ONLY Current Season Badge (Zero Clutter) */}
        <header className="relative z-20 flex shrink-0 flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-crimson-2">
              <span className="h-px w-6 bg-crimson-2" /> {seasons.length} Seasons
            </p>
            <h2 className="font-display text-3xl tracking-wide text-bone sm:text-4xl lg:text-5xl">
              MY JOURNEY
            </h2>
          </div>

          {/* Active Season Badge & Subtle Step Indicator */}
          <div className="flex items-center gap-3">
            {/* Shows ONLY the active season — other seasons are hidden to maximize breathing room */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSeason.number}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex items-center gap-2.5 rounded-full bg-bone px-4 py-2 text-ink shadow-lg"
              >
                <span className="text-[10px] font-bold tracking-[0.24em] text-crimson">
                  SEASON 0{currentSeason.number}
                </span>
                <span className="text-sm font-bold tracking-tight">
                  {currentSeason.title}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Discreet Clickable Step Dots */}
            <div className="flex items-center gap-1.5 rounded-full bg-white/[0.06] p-1.5 ring-1 ring-white/10">
              {seasons.map((s, i) => (
                <button
                  key={s.number}
                  type="button"
                  onClick={() => scrollToSeason(i)}
                  aria-label={`Jump to Season ${s.number}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === activeSeason
                      ? 'w-7 bg-crimson'
                      : 'w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </header>

        {/* CENTER: Staged Seasons Stage with 100% Pure Breathing Room */}
        <div className="relative z-10 my-auto flex h-full max-h-[72vh] w-full flex-1 items-center justify-center">
          {seasons.map((season, idx) => {
            const m = seasonMotions[idx];
            return (
              <SeasonStage
                key={season.number}
                season={season}
                opacity={m.opacity}
                y={m.y}
                isCurrent={activeSeason === idx}
              />
            );
          })}
        </div>

        {/* BOTTOM: Progress Bar & Season Counter (Matching Originals Design) */}
        <footer className="relative z-20 flex shrink-0 items-center gap-4 pt-2">
          <span className="text-[10px] font-bold tracking-[0.3em] text-smoke">JOURNEY</span>
          <div className="h-[2px] flex-1 overflow-hidden rounded bg-white/10">
            <motion.div
              className="h-full origin-left bg-crimson"
              style={{ scaleX: progressBar }}
            />
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest text-smoke">
            <span className="text-bone">S0{activeSeason + 1}</span>
            <span>/</span>
            <span>05</span>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Season Stage Component (Centered Heading + Centered Big Cards)     */
/* ------------------------------------------------------------------ */
function SeasonStage({
  season,
  opacity,
  y,
  isCurrent,
}: {
  season: Season;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  isCurrent: boolean;
}) {
  const count = season.episodes.length;
  const visibility = useTransform(opacity, (v) => (v > 0.02 ? 'visible' : 'hidden'));

  // Responsive big card width tailored to episode count:
  // - 1 card (Season 5): large hero card centered
  // - 2 cards (Season 1): two big centered boxes
  // - 3 cards (Seasons 2, 3, 4): three big centered boxes
  const cardClass =
    count === 1
      ? 'w-[clamp(340px,36vw,500px)] shrink-0'
      : count === 2
        ? 'w-[clamp(320px,29vw,450px)] shrink-0'
        : 'w-[clamp(270px,25vw,380px)] shrink-0';

  return (
    <motion.div
      style={{ opacity, y, visibility }}
      className={`absolute inset-0 mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 ${
        isCurrent ? 'pointer-events-auto z-10' : 'pointer-events-none z-0'
      }`}
    >
      {/* Centered Season Heading, Metadata & Synopsis */}
      <div className="mx-auto mb-5 max-w-3xl text-center sm:mb-7">
        <div className="mb-2 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
          <h3 className="font-display text-3xl tracking-wide text-bone sm:text-4xl lg:text-5xl">
            <span className="text-outline mr-2 sm:mr-3">
              S{String(season.number).padStart(2, '0')}
            </span>
            {season.title}
          </h3>
          <span className="text-xs font-medium text-mist/90 sm:text-sm">
            {season.period} · {count} {count === 1 ? 'Episode' : 'Episodes'}
          </span>
        </div>
        <p className="mx-auto max-w-2xl text-xs leading-relaxed text-bone/75 sm:text-sm lg:text-[15px]">
          {season.synopsis}
        </p>
      </div>

      {/* Centered Big Episode Cards */}
      <div className="flex w-full items-stretch justify-center gap-5 sm:gap-7">
        {season.episodes.map((ep, i) => (
          <EpisodeCard key={ep.code} episode={ep} index={i} className={cardClass} />
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile / Tablet / Reduced Motion Fallback                          */
/* ------------------------------------------------------------------ */
function StandardJourney() {
  const [active, setActive] = useState(0);
  const season = seasons[active];
  const rail = useRef<HTMLDivElement>(null);

  return (
    <div className="gutter py-8">
      <SectionHeading
        kicker={`${seasons.length} Seasons`}
        title="My Journey"
        aside={
          <p className="max-w-xs text-sm text-mist">
            Every stage of the resume, told as a season — select one to see its episodes.
          </p>
        }
      />

      {/* Season Selector */}
      <div
        className="rail mb-8 flex gap-2 overflow-x-auto"
        role="tablist"
        aria-label="Seasons"
      >
        {seasons.map((s, i) => (
          <button
            key={s.number}
            role="tab"
            aria-selected={i === active}
            type="button"
            onClick={() => {
              setActive(i);
              rail.current?.scrollTo({ left: 0, behavior: 'smooth' });
            }}
            className={`relative shrink-0 rounded-full px-4 py-2.5 text-left transition ${
              i === active ? 'text-ink' : 'text-mist hover:text-bone'
            }`}
          >
            {i === active && (
              <motion.span
                layoutId="standard-season-pill"
                className="absolute inset-0 rounded-full bg-bone"
                transition={{ duration: 0.5, ease: EASE }}
              />
            )}
            <span className="relative block text-[10px] font-bold tracking-[0.24em]">
              SEASON {String(s.number).padStart(2, '0')}
            </span>
            <span className="relative block whitespace-nowrap text-sm font-semibold">
              {s.title}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={season.number}
          initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="mb-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="font-display text-4xl tracking-wide text-bone sm:text-5xl">
              <span className="text-outline mr-3">
                S{String(season.number).padStart(2, '0')}
              </span>
              {season.title}
            </h3>
            <span className="text-sm text-mist">
              {season.period} · {season.episodes.length}{' '}
              {season.episodes.length === 1 ? 'Episode' : 'Episodes'}
            </span>
          </div>
          <p className="mb-6 max-w-3xl text-[15px] leading-relaxed text-bone/75">
            {season.synopsis}
          </p>

          <div className="group/rail relative">
            <div
              ref={rail}
              className="rail flex snap-x snap-mandatory gap-4 overflow-x-auto py-8 [perspective:1200px]"
            >
              {season.episodes.map((e, i) => (
                <EpisodeCard key={e.code} episode={e} index={i} />
              ))}
            </div>
            <RailButtons rail={rail} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
