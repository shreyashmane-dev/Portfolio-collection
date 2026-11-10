import Reveal from './Reveal'
import ScrambleText from './ScrambleText'

export default function SectionHeader({
  index,
  jp,
  title,
  sub,
}: {
  index: string
  jp: string
  title: string
  sub?: string
}) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal>
        <div className="mb-5 flex items-center gap-4 font-mono text-[11px] tracking-[0.35em] text-ink2">
          <span className="text-red">{index}</span>
          <span className="h-px w-14 bg-line" aria-hidden />
          <span className="font-jp tracking-[0.3em]">{jp}</span>
        </div>
      </Reveal>
      <h2 className="font-display text-[clamp(2.2rem,6vw,4.8rem)] uppercase leading-[0.95]">
        <ScrambleText text={title} duration={1000} />
      </h2>
      {sub && (
        <Reveal delay={0.15}>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink2 md:text-base">{sub}</p>
        </Reveal>
      )}
    </div>
  )
}