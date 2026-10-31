import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { useScrollLock } from '../hooks/smoothScroll';
import { EASE } from './fx';
import { ResumeSheet } from './ResumeViewer';

/** Full-screen resume viewer with responsive tabs (Interactive View vs Original PDF) */
export default function ResumeModal({ onClose }: { onClose: () => void }) {
  useScrollLock(true);
  const [tab, setTab] = useState<'sheet' | 'pdf'>('sheet');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[140] flex flex-col bg-black/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Resume"
    >
      {/* Header with Title, Tabs, and Action Buttons */}
      <div className="gutter flex min-h-16 shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/10 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
          <p className="font-display text-2xl tracking-wide text-bone">The Full Story</p>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center rounded-lg border border-white/15 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setTab('sheet')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                tab === 'sheet'
                  ? 'bg-bone text-black shadow-md'
                  : 'text-mist hover:text-white'
              }`}
            >
              📄 Interactive Sheet
            </button>
            <button
              type="button"
              onClick={() => setTab('pdf')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                tab === 'pdf'
                  ? 'bg-bone text-black shadow-md'
                  : 'text-mist hover:text-white'
              }`}
            >
              📑 PDF Document
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={profile.resumePdf}
            download="Cabrio_R_Resume.pdf"
            className="flex min-h-10 items-center gap-1.5 rounded-lg bg-bone px-4 text-xs font-bold text-ink shadow transition hover:bg-white active:scale-95"
          >
            <span>⤓</span>
            <span>Download PDF</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close resume"
            data-cursor="close"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-bone hover:bg-white/20 active:scale-95"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content Area */}
      <motion.div
        className="gutter flex-1 overflow-y-auto pb-10 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {tab === 'sheet' ? (
          <div data-lenis-prevent className="mx-auto max-w-4xl">
            <ResumeSheet />
          </div>
        ) : (
          <div className="mx-auto flex h-[82vh] max-w-5xl flex-col items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-black/60 p-2">
            <iframe
              title="Cabrio R resume (PDF)"
              src={`${profile.resumePdf}#view=FitH`}
              className="h-full w-full rounded-lg bg-white"
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
