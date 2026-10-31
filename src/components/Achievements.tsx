import { motion } from 'framer-motion';
import { achievements, certifications } from '../data/portfolio';
import { EASE, SectionHeading, Tilt } from './fx';

function Laurel({ side }: { side: 'l' | 'r' }) {
  return (
    <svg viewBox="0 0 30 64" className={`h-14 w-auto text-[#d9b46a] ${side === 'r' ? '-scale-x-100' : ''}`} aria-hidden>
      <path d="M26 62C10 52 4 36 8 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {[10, 18, 26, 34, 42, 50].map((y, i) => (
        <ellipse key={y} cx={i < 2 ? 9 : 8 + i * 1.6} cy={y} rx="5" ry="2.2" fill="currentColor" opacity="0.85" transform={`rotate(-40 ${8 + i * 1.6} ${y})`} />
      ))}
    </svg>
  );
}

export default function Achievements() {
  return (
    <>
      {/* Top Moments Section — Preserved intact */}
      <SectionHeading kicker="Awards season" title="Top Moments" />

      <div className="gutter grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 [perspective:1400px]">
        {achievements.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 50, rotateX: 18 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
          >
            <Tilt max={8} className="group h-full rounded-2xl">
              <article className="relative flex h-full min-h-[340px] flex-col items-center overflow-hidden rounded-2xl bg-[radial-gradient(120%_80%_at_50%_0%,#2a1f10,#0d0b08_60%,#07070a)] px-5 pb-6 pt-8 text-center ring-1 ring-[#d9b46a]/20 transition duration-500 group-hover:ring-[#d9b46a]/60">
                <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9b46a]/70 to-transparent" />
                <div aria-hidden className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#d9b46a]/10 blur-3xl transition duration-700 group-hover:bg-[#d9b46a]/25" />
                <div className="relative flex items-center gap-1">
                  <Laurel side="l" />
                  <div className="px-1">
                    <p className="text-[9px] font-bold uppercase leading-tight tracking-[0.24em] text-[#d9b46a]">{a.laurel}</p>
                  </div>
                  <Laurel side="r" />
                </div>
                <h3 className="relative mt-6 font-display text-[2.1rem] leading-[0.92] tracking-wide text-bone">{a.title}</h3>
                <p className="relative mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d9b46a]">{a.org}</p>
                <p className="relative mt-4 text-[13px] leading-relaxed text-bone/70">{a.detail}</p>
                {a.link && (
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="relative mt-auto inline-flex min-h-10 items-center gap-1 pt-5 text-xs font-semibold tracking-wide text-bone underline decoration-[#d9b46a]/60 underline-offset-4 hover:decoration-[#d9b46a]"
                  >
                    View certificate ↗
                  </a>
                )}
              </article>
            </Tilt>
          </motion.div>
        ))}
      </div>

      {/* Redesigned Certifications & Achievements Section */}
      <section id="certifications" className="mt-24 lg:mt-32 scroll-mt-24">
        <SectionHeading
          kicker="PROFESSIONAL CREDENTIALS"
          title="Certifications & Achievements"
          aside={
            <p className="max-w-md text-sm leading-relaxed text-mist sm:text-base">
              Continuous learning, professional training, and creative recognition.
            </p>
          }
        />

        <div className="gutter mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {certifications.map((c, i) => (
            <motion.a
              key={c.id}
              href={c.link}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:-translate-y-1.5 ${
                c.isAward
                  ? 'border border-[#d9b46a]/30 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(217,180,106,0.12),#0f0d09_55%,#07070a)] shadow-[0_12px_36px_rgba(0,0,0,0.7)] hover:border-[#d9b46a]/70 hover:shadow-[0_20px_50px_rgba(217,180,106,0.18)]'
                  : 'border border-white/10 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(229,19,43,0.08),#0e0c0e_60%,#07070a)] shadow-[0_12px_36px_rgba(0,0,0,0.7)] hover:border-crimson-2/50 hover:shadow-[0_20px_50px_rgba(229,19,43,0.16)]'
              }`}
            >
              {/* Subtle top ambient hairline */}
              <div
                aria-hidden
                className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${
                  c.isAward ? 'via-[#d9b46a]/70' : 'via-crimson-2/60'
                } to-transparent`}
              />

              {/* Certificate Preview Image */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-black/80 m-4 sm:m-5">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="h-full w-full object-contain p-2.5 transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 transition group-hover:opacity-15" />

                {/* Badge */}
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur shadow ${
                    c.isAward
                      ? 'border border-[#d9b46a]/40 bg-[#d9b46a]/20 text-[#d9b46a]'
                      : 'border border-crimson-2/40 bg-crimson/30 text-bone'
                  }`}
                >
                  {c.badge}
                </span>

                {/* Open Indicator on hover */}
                <span className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/85 px-3 py-1 text-[11px] font-semibold text-bone opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100">
                  <span>Open Certificate</span>
                  <span>↗</span>
                </span>
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col justify-between px-5 pb-5 sm:px-6 sm:pb-6">
                <div>
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-[0.22em] ${
                        c.isAward ? 'text-[#d9b46a]' : 'text-crimson-2'
                      }`}
                    >
                      {c.issuer}
                    </span>
                    <span className="font-mono text-[10px] text-smoke">{c.category}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl leading-tight tracking-wide text-bone transition group-hover:text-white">
                    {c.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-bone/75">
                    {c.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span
                    className={`inline-flex min-h-10 items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold backdrop-blur transition-all duration-300 ${
                      c.isAward
                        ? 'border border-[#d9b46a]/40 bg-[#d9b46a]/15 text-[#d9b46a] group-hover:bg-[#d9b46a] group-hover:text-black group-hover:shadow-[0_0_20px_rgba(217,180,106,0.3)]'
                        : 'border border-white/20 bg-white/5 text-bone group-hover:border-white group-hover:bg-white group-hover:text-black group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                    }`}
                  >
                    <span>View Certificate</span>
                    <span className="text-[11px]">↗</span>
                  </span>

                  <span className="text-xs font-medium text-smoke transition group-hover:text-bone">
                    Click to Open ↗
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </>
  );
}
