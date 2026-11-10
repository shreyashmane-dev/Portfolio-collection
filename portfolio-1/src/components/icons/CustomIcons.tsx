import React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  className?: string
}

export function KatanaIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M21 3C18 3 10 7 4 14L3 17L6 18L13 12C18 7 21 3 21 3Z" />
      <line x1="7" y1="13" x2="3" y2="17" strokeWidth="2.5" />
      <line x1="4.5" y1="15.5" x2="1.5" y2="18.5" strokeWidth="3" />
      <path d="M19 5C16 6 11 9.5 7 14" strokeWidth="0.75" strokeOpacity="0.7" />
    </svg>
  )
}

export function SlashMarkIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M19 3L5 21"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
      <path
        d="M21 5L15 11"
        stroke="var(--red)"
        strokeWidth="1.5"
      />
      <path
        d="M9 13L3 19"
        stroke="var(--blue)"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export function PanelCornerIcon({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M0 0H16V4H4V16H0V0Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function CrosshairIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="9" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="12" y1="2" x2="12" y2="7" />
      <line x1="12" y1="17" x2="12" y2="22" />
      <line x1="2" y1="12" x2="7" y2="12" />
      <line x1="17" y1="12" x2="22" y2="12" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function UnderlineStroke({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full overflow-visible ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M3 17C65 7 180 5 297 14C230 19 120 22 20 18"
        stroke="var(--red)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-draw"
      />
    </svg>
  )
}

export function GithubIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export function LinkedinIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}
