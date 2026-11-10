export function SplitChars({ text, className }: { text: string; className?: string }) {
  return (
    <span aria-label={text} role="text" className={className}>
      {text.split("").map((ch, i) => (
        <span key={i} aria-hidden="true" className="split-char inline-block will-change-transform" data-char={ch === " " ? "\u00A0" : ch}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

export function MaskLines({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span className="mask-line block will-change-transform">{line}</span>
        </span>
      ))}
    </span>
  );
}