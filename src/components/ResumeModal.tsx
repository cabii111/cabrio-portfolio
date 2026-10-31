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
      {/* Responsive Header for Mobile, Tablet & Desktop */}
      <div className="gutter flex shrink-0 flex-col gap-3 border-b border-white/10 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:flex-row sm:items-center sm:justify-between">
        {/* Top row on mobile: Title + Close Button */}
        <div className="flex items-center justify-between gap-3 sm:justify-start sm:gap-6">
          <p className="font-display text-xl sm:text-2xl tracking-wide text-bone">The Full Story</p>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close resume"
            data-cursor="close"
            className="flex h-10 w-10 sm:hidden items-center justify-center rounded-full border border-white/15 bg-white/10 text-bone hover:bg-white/20 active:scale-95"
          >
            ✕
          </button>
        </div>

        {/* Second row on mobile (inline on sm+): Mode Switcher Tabs + Actions */}
        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2.5">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center rounded-lg border border-white/15 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setTab('sheet')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition active:scale-95 ${
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
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition active:scale-95 ${
                tab === 'pdf'
                  ? 'bg-bone text-black shadow-md'
                  : 'text-mist hover:text-white'
              }`}
            >
              📑 PDF Document
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.resumePdf}
              download="Cabrio_R_Resume.pdf"
              className="flex min-h-9 sm:min-h-10 items-center gap-1.5 rounded-lg bg-bone px-3.5 sm:px-4 text-xs font-bold text-ink shadow transition hover:bg-white active:scale-95"
            >
              <span>⤓</span>
              <span>Download PDF</span>
            </a>

            {/* Desktop / Tablet Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume"
              data-cursor="close"
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-bone hover:bg-white/20 active:scale-95"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <motion.div
        data-lenis-prevent
        className="gutter flex-1 overflow-y-auto pb-10 pt-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        {tab === 'sheet' ? (
          <div className="mx-auto max-w-4xl">
            <ResumeSheet />
          </div>
        ) : (
          <div className="mx-auto flex flex-col items-center max-w-5xl gap-3">
            {/* Mobile PDF quick helper */}
            <div className="flex w-full flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-mist">
              <span>Viewing the official Cabrio R Resume PDF file.</span>
              <div className="flex items-center gap-2">
                <a
                  href={profile.resumePdf}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded bg-white/10 px-2.5 py-1 text-bone hover:bg-white/20 hover:text-white"
                >
                  Open in New Tab ↗
                </a>
                <a
                  href={profile.resumePdf}
                  download="Cabrio_R_Resume.pdf"
                  className="rounded bg-crimson px-2.5 py-1 font-semibold text-white hover:bg-crimson-2"
                >
                  Download ⤓
                </a>
              </div>
            </div>

            <div className="h-[68vh] sm:h-[80vh] w-full overflow-hidden rounded-xl border border-white/15 bg-black/60 p-1 sm:p-2">
              <iframe
                title="Cabrio R resume (PDF)"
                src={`${profile.resumePdf}#view=FitH`}
                className="h-full w-full rounded-lg bg-white"
              />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
