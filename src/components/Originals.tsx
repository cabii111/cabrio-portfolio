import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { projects, type Project } from '../data/portfolio';
import { useDesktop, useReducedMotionPref } from '../hooks/useMedia';
import { EASE, RevealText } from './fx';
import ProjectCard from './ProjectCard';
import { RailButtons } from './Rail';

/**
 * ORIGINALS — on desktop the section pins and scrolls sideways like a title sequence.
 * On touch / small screens / reduced motion it becomes a native swipe rail with navigation buttons.
 */
export default function Originals({ onOpen }: { onOpen: (p: Project) => void }) {
  const desktop = useDesktop();
  const reduced = useReducedMotionPref();
  return desktop && !reduced ? <PinnedOriginals onOpen={onOpen} /> : <RailOriginals onOpen={onOpen} />;
}

function Intro() {
  return (
    <div className="flex w-full shrink-0 flex-col justify-center lg:w-[32vw] xl:w-[28vw]">
      <p className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-crimson-2">
        <span className="h-px w-8 bg-crimson-2" /> {projects.length} Originals · {projects[0].year}
      </p>
      <RevealText as="h2" text="ORIGINALS" className="font-display text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.85] text-bone" />
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist sm:text-[15px]">
        Five creative productions — Hero Page Designs, Web Designs, App Designs, Graphics Designs, and 3D Modeling. Open any title to explore all deliverables.
      </p>
      <div className="mt-6 hidden items-center gap-2 text-xs tracking-[0.24em] text-smoke lg:flex">
        <span>SCROLL TO BROWSE</span>
        <span className="font-bold text-crimson-2 animate-pulse">→</span>
      </div>
    </div>
  );
}

function PinnedOriginals({ onOpen }: { onOpen: (p: Project) => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const distMV = useMotionValue(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      const d = Math.max(0, track.current.scrollWidth - window.innerWidth);
      setDist(d);
      distMV.set(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [distMV]);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] });
  const raw = useTransform([scrollYProgress, distMV], ([p, d]: number[]) => -p * d);
  const x = useSpring(raw, { stiffness: 110, damping: 28, mass: 0.35 });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={wrap} style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_60%_at_70%_50%,rgba(229,19,43,0.10),transparent_70%)]" />
        <motion.div ref={track} style={{ x }} className="gutter relative flex items-center gap-8 pr-[14vw]" data-cursor="drag">
          <Intro />
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => onOpen(p)} />
          ))}
        </motion.div>
        <div className="gutter absolute inset-x-0 bottom-8 flex items-center gap-4">
          <span className="text-[10px] font-bold tracking-[0.3em] text-smoke">ORIGINALS</span>
          <div className="h-[2px] flex-1 overflow-hidden rounded bg-white/10">
            <motion.div className="h-full origin-left bg-crimson" style={{ scaleX: bar }} />
          </div>
          <span className="font-mono text-[10px] font-bold tracking-widest text-smoke">
            05 PRODUCTIONS
          </span>
        </div>
      </div>
    </div>
  );
}

function RailOriginals({ onOpen }: { onOpen: (p: Project) => void }) {
  const railRef = useRef<HTMLDivElement>(null);
  return (
    <div className="py-8">
      <div className="gutter mb-6">
        <Intro />
      </div>
      <div className="group/rail relative">
        <motion.div
          ref={railRef}
          className="rail gutter flex snap-x snap-mandatory gap-5 overflow-x-auto pb-8 pt-2"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => onOpen(p)} />
          ))}
        </motion.div>
        <RailButtons rail={railRef} />
      </div>
    </div>
  );
}
