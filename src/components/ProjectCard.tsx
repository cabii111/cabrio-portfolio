import { motion } from 'framer-motion';
import type { Project } from '../data/portfolio';
import { EASE, Tilt } from './fx';

export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.article
      className="w-[85vw] shrink-0 snap-start sm:w-[62vw] md:w-[52vw] lg:w-[43vw] xl:w-[39vw]"
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px -10% 0px 0px' }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: EASE }}
    >
      <Tilt max={3} className="group h-full rounded-2xl">
        <div
          role="button"
          tabIndex={0}
          data-cursor="view"
          onClick={onOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpen();
            }
          }}
          aria-label={`Open ${project.title}`}
          className="focus-ring relative flex flex-col w-full h-[540px] sm:h-[570px] lg:h-[68vh] lg:min-h-[580px] lg:max-h-[660px] overflow-hidden rounded-2xl border border-white/10 bg-[#0c090c] shadow-2xl transition-all duration-500 group-hover:border-crimson-2/60 group-hover:shadow-[0_24px_60px_-12px_rgba(229,19,43,0.35)]"
        >
          {/* 1. VISUAL SHOWCASE PREVIEW (65% of card height) */}
          <div className="relative h-[65%] w-full overflow-hidden bg-black/95">
            <motion.div layoutId={`art-${project.id}`} className="absolute inset-0 overflow-hidden">
              {project.image && (
                <picture className="block h-full w-full">
                  <source srcSet={`${project.image}?v=2`} type="image/webp" />
                  <img
                    src={`${project.image.replace('.webp', '.jpg')}?v=2`}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-[var(--ease-cine)] group-hover:scale-[1.04]"
                  />
                </picture>
              )}
            </motion.div>

            {/* Subtle top vignette for badge legibility */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 via-black/30 to-transparent"
            />

            {/* Subtle bottom transition into the content area */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0e0a0d] to-transparent"
            />

            {/* Top Left: C ORIGINAL Badge */}
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-3 py-1 backdrop-blur-md sm:left-5 sm:top-5">
              <span className="font-display text-sm leading-none text-crimson-2">C</span>
              <span className="text-[9px] font-bold tracking-[0.28em] text-bone/90">ORIGINAL</span>
            </div>

            {/* Top Right: Year Badge */}
            <span className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-black/70 px-2.5 py-1 font-mono text-[10px] font-bold text-bone backdrop-blur-md sm:right-5 sm:top-5">
              {project.year}
            </span>

            {/* Bottom Right: Interactive Hover Prompt */}
            <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-1.5 rounded-full border border-white/20 bg-black/80 px-3 py-1 text-[11px] font-medium text-bone opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1">
              <span>Explore Deliverables</span>
              <span className="text-crimson-2 font-bold">↗</span>
            </div>
          </div>

          {/* 2. DEDICATED CLEAN CONTENT AREA (35% of card height) */}
          <div className="relative flex flex-1 flex-col justify-between border-t border-white/[0.08] bg-gradient-to-b from-[#0e0a0d] via-[#090709] to-[#050406] p-5 sm:p-6 lg:px-7 lg:py-5">
            {/* Upper Content Group */}
            <div>
              {/* Category / Genre Kicker */}
              <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-crimson-2 sm:text-[11px]">
                {project.genre}
              </p>

              {/* Main Project Category Title */}
              <motion.h3
                layoutId={`title-${project.id}`}
                className="mt-1 font-display text-2xl leading-[0.92] tracking-wide text-bone transition-colors group-hover:text-white sm:text-3xl lg:text-[2.1rem]"
              >
                {project.title}
              </motion.h3>

              {/* Logline description */}
              <p className="mt-2 text-xs leading-relaxed text-bone/75 line-clamp-2 sm:text-[13px]">
                {project.logline}
              </p>
            </div>

            {/* Lower Content Group: Stack & Actions */}
            <div className="mt-3">
              {/* Stack Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.stack.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium text-bone/90 backdrop-blur-sm transition-colors group-hover:border-white/20 sm:text-[11px]"
                  >
                    {t}
                  </span>
                ))}
                {project.stack.length > 4 && (
                  <span className="rounded-full border border-white/10 bg-white/[0.02] px-2 py-0.5 text-[10px] font-medium text-mist">
                    +{project.stack.length - 4}
                  </span>
                )}
              </div>

              {/* Action Button & Sub-Items Counter */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-3">
                <span className="flex min-h-10 items-center gap-2 rounded-lg bg-bone px-4 text-xs font-bold text-ink shadow-[0_4px_20px_rgba(0,0,0,0.6)] transition-all duration-300 group-hover:scale-[1.02] group-hover:bg-white active:scale-[0.98] sm:min-h-11 sm:px-5 sm:text-sm">
                  <span>▶</span>
                  <span>View Project</span>
                </span>

                <div className="flex items-center gap-3">
                  {project.subItems && (
                    <span className="font-mono text-[11px] text-mist/90">
                      {project.subItems.length} {project.subItems.length === 1 ? 'Production' : 'Productions'}
                    </span>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="link"
                      onClick={(e) => e.stopPropagation()}
                      className="flex min-h-10 items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 text-xs font-semibold text-bone backdrop-blur-sm transition hover:border-bone sm:min-h-11 sm:px-4 sm:text-sm"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tilt>
    </motion.article>
  );
}
