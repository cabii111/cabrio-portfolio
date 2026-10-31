import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { useReducedMotionPref } from '../hooks/useMedia';
import { EASE, Magnetic } from './fx';

/**
 * CABRIO — THE SERIES
 * Main portfolio landing / entry screen.
 */
export default function OpeningSequence({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotionPref();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') onDone();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[120] overflow-hidden bg-black"
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
      transition={{ duration: 0.9, ease: EASE }}
      role="dialog"
      aria-label="Cabrio — The Series"
    >
      {/* Subtle cinematic red ambient lighting */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(60% 50% at 50% 55%, rgba(229,19,43,0.22), transparent 70%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Portrait of Cabrio */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-0 mx-auto flex h-[68vh] max-w-[900px] items-end justify-center"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0 : 0.9, ease: EASE }}
      >
        <img
          src={profile.portrait.src}
          srcSet={profile.portrait.srcSet}
          sizes="(max-width: 768px) 100vw, 900px"
          alt={profile.portrait.alt}
          className="h-full w-auto max-w-none object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_55%,transparent_98%)]"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-[radial-gradient(70%_60%_at_50%_40%,transparent_30%,rgba(0,0,0,0.85)_100%)]"
      />

      {/* Large Typography: CABRIO — THE SERIES */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.h1
          className="font-display leading-[0.82] text-bone drop-shadow-[0_8px_40px_rgba(0,0,0,0.8)]"
          style={{ fontSize: 'clamp(4.6rem, 20vw, 15rem)' }}
          initial={{ opacity: 0, y: '-28vh' }}
          animate={{ opacity: 1, y: '-30vh' }}
          transition={{ duration: reduced ? 0 : 0.9, ease: EASE }}
        >
          {profile.firstName}
        </motion.h1>
        <motion.p
          className="font-sans text-sm font-bold text-crimson-2 [text-shadow:0_2px_20px_rgba(0,0,0,0.9)] sm:text-lg"
          style={{ letterSpacing: '0.7em' }}
          initial={{ opacity: 0, y: '-28vh' }}
          animate={{ opacity: 1, y: '-30vh' }}
          transition={{ duration: reduced ? 0 : 0.9, ease: EASE, delay: 0.08 }}
        >
          {profile.seriesTag}
        </motion.p>
      </div>

      {/* Role Tagline & "ENTER THE SERIES" Button */}
      <div className="absolute inset-x-0 bottom-[9vh] z-20 flex flex-col items-center gap-5 px-4 text-center sm:gap-6">
        <motion.p
          className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-bone/90 sm:text-sm sm:tracking-[0.4em]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.7, ease: EASE, delay: 0.12 }}
        >
          {profile.tagline.join('  •  ')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.7, ease: EASE, delay: 0.18 }}
        >
          <Magnetic>
            <button
              type="button"
              data-cursor="view"
              onClick={onDone}
              aria-label="Enter the Series"
              className="group flex items-center gap-3 rounded-full bg-bone px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-ink shadow-[0_0_40px_rgba(229,19,43,0.35)] transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-white hover:shadow-[0_0_60px_rgba(229,19,43,0.55)] active:scale-[0.98] sm:px-9 sm:py-4 sm:text-sm"
            >
              <span>ENTER THE SERIES</span>
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
                className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>
          </Magnetic>
        </motion.div>
      </div>
    </motion.div>
  );
}
