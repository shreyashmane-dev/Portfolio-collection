import React from 'react';

export const AnimeHeroSilhouette: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Background Anime Energy Aura */}
      <div className="absolute inset-0 bg-radial from-[var(--accent-red)]/20 via-[var(--accent-blue)]/10 to-transparent blur-3xl rounded-full scale-125 pointer-events-none" />

      {/* SVG Anime Hero Character Silhouette & Cybernetic Highlights */}
      <svg
        viewBox="0 0 600 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[540px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      >
        <defs>
          <linearGradient id="cyberSky" x1="300" y1="0" x2="300" y2="800" gradientUnits="userSpaceOnUse">
            <stop stopColor="#08090C" stopOpacity="0" />
            <stop offset="0.6" stopColor="#111319" stopOpacity="0.4" />
            <stop offset="1" stopColor="#08090C" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="neonRedBlade" x1="180" y1="200" x2="140" y2="700" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF304F" />
            <stop offset="0.5" stopColor="#FF6B8B" />
            <stop offset="1" stopColor="#FF304F" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="neonBlueAura" x1="420" y1="180" x2="480" y2="650" gradientUnits="userSpaceOnUse">
            <stop stopColor="#397BFF" />
            <stop offset="0.5" stopColor="#00E5FF" />
            <stop offset="1" stopColor="#397BFF" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="silhouetteCoat" x1="300" y1="200" x2="300" y2="750" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1F232D" />
            <stop offset="0.5" stopColor="#13151C" />
            <stop offset="1" stopColor="#08090C" />
          </linearGradient>

          <filter id="cyberGlowRed" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="cyberGlowBlue" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Distant Cyber City Skyline Silhouette */}
        <g opacity="0.4">
          <path d="M50 550 L50 420 L75 420 L75 390 L95 390 L95 440 L120 440 L120 370 L145 370 L145 460 L180 460 L180 340 L210 340 L210 480" stroke="var(--border-color)" strokeWidth="1" />
          <path d="M380 490 L380 350 L415 350 L415 320 L445 320 L445 410 L470 410 L470 380 L510 380 L510 470 L550 470 L550 550" stroke="var(--border-color)" strokeWidth="1" />
          {/* Cyber Spire Needles */}
          <line x1="85" y1="390" x2="85" y2="340" stroke="var(--accent-blue)" strokeWidth="1" opacity="0.6" />
          <line x1="195" y1="340" x2="195" y2="280" stroke="var(--accent-red)" strokeWidth="1.5" opacity="0.8" />
          <line x1="430" y1="320" x2="430" y2="260" stroke="var(--accent-blue)" strokeWidth="1.5" opacity="0.8" />
        </g>

        {/* Neo-Tokyo Overlook Platform / Rooftop Ledge */}
        <path d="M60 760 L240 680 L360 680 L540 760 L600 800 L0 800 Z" fill="#0D0E13" stroke="var(--border-color)" strokeWidth="1.5" />
        <line x1="240" y1="680" x2="360" y2="680" stroke="var(--accent-red)" strokeWidth="2" filter="url(#cyberGlowRed)" />

        {/* Atmospheric Floating Speed / Energy Particles */}
        <circle cx="160" cy="380" r="1.5" fill="#FF304F" opacity="0.8" />
        <circle cx="210" cy="290" r="2" fill="#397BFF" opacity="0.9" />
        <circle cx="420" cy="240" r="1.5" fill="#FF304F" opacity="0.7" />
        <circle cx="460" cy="360" r="2" fill="#00E5FF" opacity="0.8" />
        <circle cx="340" cy="180" r="1" fill="#FFFFFF" opacity="0.9" />

        {/* Anime Character Coat - Wind Swept Tails */}
        <path
          d="M230 460 C200 520 160 590 130 670 C170 650 220 620 260 590 Z"
          fill="url(#silhouetteCoat)"
          stroke="#FF304F"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        <path
          d="M370 460 C405 520 445 590 480 670 C440 645 390 615 350 585 Z"
          fill="url(#silhouetteCoat)"
          stroke="#397BFF"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />

        {/* Main Body Silhouette - High Collar Long Coat */}
        <path
          d="M260 270 
             C245 320 230 420 235 520 
             L250 690 
             L350 690 
             L365 520 
             C370 420 355 320 340 270 
             C330 250 315 240 300 240 
             C285 240 270 250 260 270 Z"
          fill="url(#silhouetteCoat)"
          stroke="var(--border-color)"
          strokeWidth="1"
        />

        {/* Cyber Trenchcoat Lapels & Center Seam */}
        <path d="M285 260 L295 440 L300 680" stroke="var(--border-color)" strokeWidth="1.5" opacity="0.6" />
        <path d="M315 260 L305 440" stroke="var(--border-color)" strokeWidth="1.5" opacity="0.6" />

        {/* Red Cybernetic Luminescent Accents on Left Coat Edge */}
        <path
          d="M260 270 C245 320 235 410 240 480"
          stroke="url(#neonRedBlade)"
          strokeWidth="2.5"
          filter="url(#cyberGlowRed)"
        />

        {/* Blue Cybernetic Luminescent Accents on Right Coat Edge */}
        <path
          d="M340 270 C355 320 365 410 360 480"
          stroke="url(#neonBlueAura)"
          strokeWidth="2.5"
          filter="url(#cyberGlowBlue)"
        />

        {/* Character Head & Anime Hairstyle Silhouette */}
        {/* High Tech Collar */}
        <path d="M280 250 L275 220 L300 230 L325 220 L320 250 Z" fill="#181B23" stroke="var(--border-color)" strokeWidth="1" />
        
        {/* Neck */}
        <path d="M292 230 L292 205 L308 205 L308 230 Z" fill="#13151C" />

        {/* Head Silhouette */}
        <path
          d="M282 195 
             C280 180 282 165 292 155 
             C298 148 308 148 314 155 
             C322 165 324 180 322 195 
             L314 208 
             L290 208 Z"
          fill="#111319"
        />

        {/* Anime Spiky/Layered Hair Bangs */}
        <path
          d="M276 172 
             C270 155 280 135 296 130 
             C308 126 322 130 330 142 
             C338 152 338 168 332 178 
             C328 170 322 162 312 160 
             C302 158 290 162 284 172 Z"
          fill="#0B0C10"
          stroke="var(--border-color)"
          strokeWidth="1"
        />
        {/* Stray Hair Spikes */}
        <path d="M275 160 L262 168 L276 175" fill="#0B0C10" />
        <path d="M332 158 L344 165 L331 174" fill="#0B0C10" />
        <path d="M305 130 L310 118 L318 132" fill="#0B0C10" />

        {/* Glowing Cybernetic Visor / Eye Sensor */}
        <path
          d="M290 178 L312 178"
          stroke="#FF304F"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#cyberGlowRed)"
        />
        <circle cx="308" cy="178" r="1.5" fill="#FFFFFF" />

        {/* Headset / Neural Link Terminal */}
        <path d="M280 176 L278 184 L283 186" stroke="#397BFF" strokeWidth="2" filter="url(#cyberGlowBlue)" />
        <path d="M324 176 L326 184 L321 186" stroke="#397BFF" strokeWidth="2" filter="url(#cyberGlowBlue)" />

        {/* Holographic Tactical HUD Rings Around Character */}
        <g opacity="0.6">
          <ellipse cx="300" cy="420" rx="160" ry="45" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="6 8" />
          <ellipse cx="300" cy="420" rx="190" ry="55" stroke="var(--accent-red)" strokeWidth="1" strokeDasharray="3 14" opacity="0.5" />
          <ellipse cx="300" cy="680" rx="220" ry="40" stroke="var(--accent-blue)" strokeWidth="1.2" strokeDasharray="8 6" opacity="0.6" />
        </g>

        {/* Floating Japanese Cyber Typography */}
        <g opacity="0.45" fill="var(--text-secondary)" className="font-jp text-[12px] font-bold">
          <text x="40" y="240" writingMode="tb">電脳空間</text>
          <text x="560" y="280" writingMode="tb">覚醒開始</text>
          <text x="540" y="440" writingMode="tb">限界突破</text>
        </g>
      </svg>
    </div>
  );
};

export const AnimeAboutVisual: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden glass-panel ${className}`}>
      {/* Background Anime Grid & Atmosphere */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[var(--accent-red)]/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[var(--accent-blue)]/15 rounded-full blur-3xl" />

      {/* Cyber Frame Corner Accents */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[var(--accent-red)]" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[var(--accent-red)]" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[var(--accent-blue)]" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[var(--accent-blue)]" />

      {/* Anime Character Portrait Artwork */}
      <svg
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
      >
        <defs>
          <linearGradient id="aboutCharGrad" x1="200" y1="100" x2="200" y2="500" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E232F" />
            <stop offset="0.7" stopColor="#12141C" />
            <stop offset="1" stopColor="#08090C" />
          </linearGradient>
        </defs>

        {/* Ambient Ring */}
        <circle cx="200" cy="220" r="140" stroke="var(--border-color)" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.4" />
        <circle cx="200" cy="220" r="160" stroke="var(--accent-red)" strokeWidth="1" strokeDasharray="4 16" opacity="0.3" />

        {/* Torso & Tech Jacket */}
        <path
          d="M120 400 L140 330 L170 300 L230 300 L260 330 L280 400 L340 500 L60 500 Z"
          fill="url(#aboutCharGrad)"
          stroke="var(--border-color)"
          strokeWidth="1.5"
        />

        {/* High Tech Collar */}
        <path d="M170 300 L160 250 L200 265 L240 250 L230 300 Z" fill="#181B24" stroke="var(--accent-red)" strokeWidth="1.5" />

        {/* Head Silhouette */}
        <path
          d="M165 240 C160 215 165 190 180 175 C190 165 210 165 220 175 C235 190 240 215 235 240 L220 260 L180 260 Z"
          fill="#13151D"
        />

        {/* Hair with Anime Spikes */}
        <path
          d="M158 200 C150 175 165 150 185 142 C205 136 225 142 235 158 C248 172 248 195 240 210 C234 198 226 188 214 185 C200 182 184 188 174 202 Z"
          fill="#0D0E14"
          stroke="var(--border-color)"
          strokeWidth="1"
        />
        <path d="M154 185 L138 195 L154 205" fill="#0D0E14" />
        <path d="M242 182 L258 192 L242 202" fill="#0D0E14" />

        {/* Glowing Cybernetic Eye / Visor */}
        <line x1="184" y1="210" x2="216" y2="210" stroke="#FF304F" strokeWidth="3" strokeLinecap="round" />
        <circle cx="210" cy="210" r="1.5" fill="#FFFFFF" />

        {/* Holographic Neural Interface */}
        <path d="M156 205 L150 220 L160 225" stroke="#397BFF" strokeWidth="2" />
        <line x1="145" y1="220" x2="110" y2="220" stroke="#397BFF" strokeWidth="1" strokeDasharray="3 3" />
        <text x="60" y="223" fill="#397BFF" fontSize="9" fontFamily="monospace">ID:SHR-05</text>

        {/* HUD Data Overlay */}
        <g opacity="0.7" fontFamily="monospace" fontSize="8" fill="var(--text-secondary)">
          <text x="25" y="45">ARCH: CSE // COGNITIVE AGENTS</text>
          <text x="25" y="60">SYNC: 99.8% STABLE</text>
          <text x="280" y="45">LOCATION: IN [MUM]</text>
          <text x="280" y="60">STATUS: ACTIVE</text>
        </g>
      </svg>

      {/* Floating Status Badge */}
      <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[var(--bg-elevated)]/90 backdrop-blur-md border border-[var(--border-color)] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-red)]" />
          <span className="text-xs font-mono font-medium text-[var(--text-primary)]">
            SHREYASH MANE
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--accent-blue)] bg-[var(--accent-blue)]/10 px-2 py-0.5 rounded border border-[var(--accent-blue)]/30">
          EXPLORER
        </span>
      </div>
    </div>
  );
};

export const ProjectArtwork: React.FC<{
  title: string;
  category: string;
  number: string;
  accentColor: string;
  className?: string;
}> = ({ title, category, number, accentColor, className = '' }) => {
  return (
    <div
      className={`relative w-full aspect-[16/9] overflow-hidden rounded-t-xl bg-gradient-to-br from-[var(--bg-elevated)] via-[var(--bg-secondary)] to-[var(--bg-primary)] border-b border-[var(--border-color)] flex items-center justify-center ${className}`}
    >
      {/* Cyber Grid Texture */}
      <div className="absolute inset-0 cyber-grid opacity-35" />

      {/* Radial Energy Bloom */}
      <div
        className="absolute w-44 h-44 rounded-full blur-2xl opacity-20 transition-transform duration-500 group-hover:scale-125"
        style={{ backgroundColor: accentColor }}
      />

      {/* Tactical HUD Coordinates */}
      <div className="absolute top-2.5 left-3 flex items-center gap-2 font-mono text-[9px] text-[var(--text-secondary)] opacity-70">
        <span>MSN-{number}</span>
        <span>//</span>
        <span style={{ color: accentColor }}>{category}</span>
      </div>

      <div className="absolute top-2.5 right-3 font-mono text-[9px] text-[var(--text-secondary)] opacity-70">
        SEC-{Math.floor(Math.sin(Number(number) || 1) * 900 + 1000)}
      </div>

      {/* Central Abstract Anime/Cyber Iconography */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-2">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
          style={{
            borderColor: accentColor,
            backgroundColor: 'rgba(0,0,0,0.4)',
            boxShadow: `0 0 20px -5px ${accentColor}40`
          }}
        >
          {category === 'AI' ? (
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke={accentColor} strokeWidth="1.75">
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <circle cx="8.5" cy="8.5" r="1.5" fill={accentColor} />
              <circle cx="15.5" cy="8.5" r="1.5" fill={accentColor} />
              <path d="M8 15 C10 17 14 17 16 15" strokeLinecap="round" />
            </svg>
          ) : category === 'IOT' ? (
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke={accentColor} strokeWidth="1.75">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <rect x="9" y="9" width="6" height="6" />
              <line x1="9" y1="1" x2="9" y2="4" />
              <line x1="15" y1="1" x2="15" y2="4" />
              <line x1="9" y1="20" x2="9" y2="23" />
              <line x1="15" y1="20" x2="15" y2="23" />
              <line x1="20" y1="9" x2="23" y2="9" />
              <line x1="20" y1="14" x2="23" y2="14" />
              <line x1="1" y1="9" x2="4" y2="9" />
              <line x1="1" y1="14" x2="4" y2="14" />
            </svg>
          ) : category === 'TOOLS' ? (
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke={accentColor} strokeWidth="1.75">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke={accentColor} strokeWidth="1.75">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          )}
        </div>

        <span className="font-display text-xs font-bold tracking-wider text-[var(--text-primary)] max-w-[85%] truncate">
          {title}
        </span>
      </div>

      {/* Decorative Cyber Ticks */}
      <div className="absolute bottom-1.5 left-3 w-6 h-0.5" style={{ backgroundColor: accentColor }} />
      <div className="absolute bottom-1.5 right-3 w-6 h-0.5" style={{ backgroundColor: accentColor }} />
    </div>
  );
};
