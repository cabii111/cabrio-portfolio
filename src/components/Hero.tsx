import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { certifications, education, profile, projects, type ProfileId } from '../data/portfolio';
import { useFinePointer } from '../hooks/useMedia';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { EASE, Magnetic, Particles } from './fx';
import { SeriesMark } from './Poster';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } } };
const item = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
};

export default function Hero({
  onResume,
  profileId,
}: {
  onResume?: () => void;
  profileId: ProfileId;
}) {
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer();
  const { scrollTo } = useSmoothScroll();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-24%']);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const blackout = useTransform(scrollYProgress, [0.35, 1], [0, 1]);

  // pointer parallax (desktop)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 45, damping: 20 });
  const py = useSpring(my, { stiffness: 45, damping: 20 });
  const bgShiftX = useTransform(px, [-1, 1], [-12, 12]);
  const chipX = useTransform(px, [-1, 1], [14, -14]);
  const chipY = useTransform(py, [-1, 1], [10, -10]);

  const meta = [
    education[0].score,
    education[0].degree,
    `${projects.length} Originals`,
    `${certifications.length} Certifications`,
  ];

  // Floating information cards framed safely around Cabrio without overlapping his portrait
  const floating = [
    {
      text: 'Full Stack Designer',
      sub: 'Digital Experiences',
      pos: 'right-[27%] top-[14%]',
      depth: -0.6,
    },
    {
      text: 'UI/UX Designer',
      sub: 'User-Centred Design',
      pos: 'right-[33%] top-[34%]',
      depth: 0.8,
    },
    {
      text: 'Product Designer',
      sub: 'Research & Product Strategy',
      pos: 'right-[24%] bottom-[20%]',
      depth: 0.5,
    },
  ];

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-ink"
      onPointerMove={(e) => {
        if (!fine) return;
        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
      }}
    >
      {/* Background hero image */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ y: bgY, scale: bgScale, x: bgShiftX, opacity: fade }}
      >
        <img
          src="/assets/Hero-image.jpg"
          alt="Cabrio R — The Series"
          className="h-full w-full select-none object-cover object-right"
        />

        {/* Ambient red atmospheric glow to enhance the cinematic mood */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[5%] top-[10%] h-[85vh] w-[55vw] rounded-full bg-[radial-gradient(closest-side,rgba(229,19,43,0.32),rgba(180,12,32,0.12)_55%,transparent)] blur-3xl"
        />

        {/* Seamless bottom fade into next section */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-10 h-36 bg-gradient-to-t from-ink via-ink/80 to-transparent"
        />

        {/* Readability gradient for text on the left */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 bg-gradient-to-r from-ink/90 via-ink/35 to-transparent lg:max-w-[55vw]"
        />
        <div aria-hidden className="absolute inset-0 z-10 bg-ink/30 lg:hidden" />
      </motion.div>

      {/* Floating interactive UI chips on the right */}
      <div className="pointer-events-none absolute inset-0 z-[3] hidden overflow-hidden lg:block">
        {floating.map((f, i) => (
          <FloatChip key={f.text} {...f} index={i} mx={chipX} my={chipY} />
        ))}
      </div>

      {/* Subtle cinematic particle layer */}
      <Particles className="z-[1] opacity-50" />

      {/* Copy content - positioned cleanly on the LEFT */}
      <motion.div
        className="gutter relative z-[4] flex min-h-[100svh] flex-col justify-end pb-16 pt-[48svh] sm:pb-20 lg:max-w-[54vw] lg:justify-center lg:pb-0 lg:pt-20 xl:max-w-[50vw]"
        style={{ y: textY, opacity: fade }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="mb-3 text-lg">
          <SeriesMark />
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display leading-[0.82] tracking-[0.02em] text-bone"
          style={{ fontSize: 'clamp(4.2rem, 9.5vw, 9.5rem)' }}
        >
          <span className="shimmer-text">{profile.firstName}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-1 font-sans text-sm font-bold tracking-[0.62em] text-crimson-2 sm:text-base"
        >
          {profile.seriesTag}
        </motion.p>

        {/* Tagline directly under THE SERIES: Full Stack Designer · UI/UX Designer · Product Designer */}
        <motion.p
          variants={item}
          className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-bone/90 sm:text-xs sm:tracking-[0.34em]"
        >
          {profile.tagline.join(' · ')}
        </motion.p>

        {/* Badges & Metadata */}
        <motion.div
          variants={item}
          className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-medium text-mist"
        >
          <span className="rounded border border-white/25 px-1.5 py-px text-[10px] font-bold tracking-wider text-bone">
            FULL STACK
          </span>
          {meta.map((m, i) => (
            <span key={m} className="flex items-center gap-3">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-smoke" />}
              {m}
            </span>
          ))}
        </motion.div>

        {/* Introduction Bio */}
        <motion.p
          variants={item}
          className="mt-5 max-w-xl text-[15px] leading-relaxed text-bone/80 sm:text-base"
        >
          {profile.intro}
        </motion.p>

        {/* Action Buttons */}
        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
          <Magnetic>
            <button
              type="button"
              data-cursor="view"
              onClick={() => scrollTo('#originals')}
              aria-label="Explore My Universe"
              className="group flex min-h-12 items-center gap-3 rounded-md bg-bone px-6 py-3 text-[15px] font-bold text-ink transition-all duration-300 hover:scale-[1.02] hover:bg-white active:scale-[0.98] sm:px-8"
            >
              <span>Explore My Universe</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>
          </Magnetic>

          <Magnetic>
            <button
              type="button"
              data-cursor="view"
              onClick={() => scrollTo('#originals')}
              aria-label="Selected Projects"
              className="glass group flex min-h-12 items-center gap-3 rounded-md border border-white/20 bg-white/[0.06] px-6 py-3 text-[15px] font-semibold text-bone transition-all duration-300 hover:border-white/40 hover:bg-white/15 active:scale-[0.98] sm:px-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-bone/80 transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              <span>Selected Projects</span>
            </button>
          </Magnetic>

          {profileId === 'recruiter' && onResume && (
            <Magnetic>
              <button
                type="button"
                onClick={onResume}
                aria-label="View Resume"
                className="glass flex min-h-12 items-center gap-2 rounded-md border border-white/15 px-5 py-3 text-[14px] font-semibold text-bone/90 transition hover:bg-white/15 hover:text-bone"
              >
                <span>⤓</span> View Resume
              </button>
            </Magnetic>
          )}

          <button
            type="button"
            onClick={() => scrollTo('#about')}
            aria-label="More info about Cabrio R"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-lg text-bone transition hover:border-bone hover:bg-white/10"
          >
            ⓘ
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] bg-ink"
        style={{ opacity: blackout }}
      />
    </section>
  );
}

type MV = ReturnType<typeof useTransform<number, number>>;

function FloatChip({
  text,
  sub,
  pos,
  depth,
  index,
  mx,
  my,
}: {
  text: string;
  sub: string;
  pos: string;
  depth: number;
  index: number;
  mx: MV;
  my: MV;
}) {
  const x = useTransform(mx, (n: number) => n * depth);
  const y = useTransform(my, (n: number) => n * depth);
  return (
    <motion.div
      className={`glass pointer-events-auto absolute hidden rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:border-crimson-2/40 hover:bg-black/60 md:block ${pos}`}
      style={{ x, y }}
      initial={{ opacity: 0, filter: 'blur(6px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, delay: 0.8 + index * 0.15, ease: EASE }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p className="text-sm font-semibold tracking-wide text-bone">{text}</p>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-crimson-2">{sub}</p>
      </motion.div>
    </motion.div>
  );
}
