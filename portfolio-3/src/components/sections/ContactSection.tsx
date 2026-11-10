import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useAudio } from '../../context/AudioContext';
import { Mail, Send, Copy, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { playHover, playClick } = useAudio();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) errs.subject = 'Please enter a subject';
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (!validate()) return;

    setIsSubmitting(true);

    // Create mailto fallback link to ensure 100% deliverability without leaking backend secrets
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      `[Portfolio] ${formData.subject} - from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.open(mailtoUrl, '_blank');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 6000);
    }, 600);
  };

  const handleCopyEmail = () => {
    playClick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-8 w-full border-t border-[var(--border-color)] overflow-hidden">
      {/* Background Anime Ambience */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent-red)]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-red)] mb-3 tracking-wider px-3.5 py-1 rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)]" />
            <span>SECTION // 08</span>
            <span>-</span>
            <span className="font-jp">交信開始</span>
            <span>-</span>
            <span>DIRECT LINK</span>
          </div>
          <h2 className="text-3xl sm:text-6xl font-display font-black tracking-tight text-[var(--text-primary)] max-w-3xl leading-tight">
            EVERY GREAT IDEA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-red)] via-[var(--accent-blue)] to-[#00E5FF]">
              STARTS SOMEWHERE.
            </span>
          </h2>
          <p className="text-base sm:text-lg font-heading text-[var(--text-secondary)] mt-4 max-w-xl">
            Have an interesting idea, project collaboration, or vision? Let&apos;s build something extraordinary together.
          </p>
        </div>

        {/* Contact Layout: Info Cards on Left + Functional Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto text-left">
          {/* Left Column: Direct Reachouts & Socials */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Primary Email Card */}
            <div className="p-6 rounded-2xl glass-card relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-red)]/10 text-[var(--accent-red)] border border-[var(--accent-red)]/20 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                    PRIMARY TRANSMISSION
                  </span>
                  <h3 className="font-heading font-bold text-sm text-[var(--text-primary)]">
                    Direct Email
                  </h3>
                </div>
              </div>

              <div className="text-sm font-mono text-[var(--accent-red)] font-semibold truncate mb-4">
                {PERSONAL_INFO.email}
              </div>

              <button
                onClick={handleCopyEmail}
                onMouseEnter={playHover}
                className="w-full py-2.5 px-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-elevated)] text-xs font-mono font-medium text-[var(--text-primary)] hover:border-[var(--accent-red)] flex items-center justify-center gap-2 transition-all"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY EMAIL ADDRESS</span>
                  </>
                )}
              </button>
            </div>

            {/* GitHub Card */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              className="p-5 rounded-2xl glass-card flex items-center justify-between group hover:border-[var(--accent-blue)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--badge-bg)] text-[var(--text-primary)] border border-[var(--border-color)] flex items-center justify-center group-hover:border-[var(--accent-blue)] transition-colors">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading font-bold text-sm text-[var(--text-primary)]">
                    GitHub Profile
                  </div>
                  <div className="text-xs font-mono text-[var(--text-secondary)]">
                    @shreyashmane-dev // 44 Repos
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono text-[var(--accent-blue)] group-hover:translate-x-1 transition-transform">
                VISIT &rarr;
              </span>
            </a>

            {/* LinkedIn Card */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              className="p-5 rounded-2xl glass-card flex items-center justify-between group hover:border-[var(--accent-blue)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20 flex items-center justify-center">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading font-bold text-sm text-[var(--text-primary)]">
                    LinkedIn Network
                  </div>
                  <div className="text-xs font-mono text-[var(--text-secondary)]">
                    Shreyash Mane // Professional Link
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono text-[var(--accent-blue)] group-hover:translate-x-1 transition-transform">
                CONNECT &rarr;
              </span>
            </a>

            {/* Location & Status HUD */}
            <div className="p-4 rounded-xl glass-panel text-xs font-mono text-[var(--text-secondary)] space-y-1">
              <div>LOCATION: {PERSONAL_INFO.location}</div>
              <div>TIMEZONE: IST [UTC+05:30]</div>
              <div className="text-[var(--accent-red)] flex items-center gap-1.5 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)]" />
                AVAILABLE FOR AMBITIOUS PROJECTS &amp; ROLES
              </div>
            </div>
          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl glass-panel relative overflow-hidden border border-[var(--border-color)] shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex flex-col gap-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                <span className="text-xs font-mono text-[var(--text-secondary)]">
                  TRANSMISSION TERMINAL // 送信端末
                </span>
                <span className="text-[10px] font-mono text-[var(--accent-red)]">
                  ENCRYPTED CHANNEL
                </span>
              </div>

              {isSuccess && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>TRANSMISSION PREPARED. DISPATCHING EMAIL CLIENT...</span>
                </div>
              )}

              {/* Name & Email inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                    YOUR NAME <span className="text-[var(--accent-red)]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Kenji Sato"
                    className={`w-full px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none transition-colors ${
                      errors.name ? 'border-red-500' : 'border-[var(--border-color)] focus:border-[var(--accent-red)]'
                    }`}
                  />
                  {errors.name && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                    YOUR EMAIL <span className="text-[var(--accent-red)]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@domain.com"
                    className={`w-full px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500' : 'border-[var(--border-color)] focus:border-[var(--accent-red)]'
                    }`}
                  />
                  {errors.email && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                  SUBJECT <span className="text-[var(--accent-red)]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Collaboration / Project / Question"
                  className={`w-full px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none transition-colors ${
                    errors.subject ? 'border-red-500' : 'border-[var(--border-color)] focus:border-[var(--accent-red)]'
                  }`}
                />
                {errors.subject && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5">
                  MESSAGE <span className="text-[var(--accent-red)]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your idea or request..."
                  className={`w-full px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none transition-colors resize-none ${
                    errors.message ? 'border-red-500' : 'border-[var(--border-color)] focus:border-[var(--accent-red)]'
                  }`}
                />
                {errors.message && <p className="text-[10px] text-red-400 mt-1 font-mono">{errors.message}</p>}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={playHover}
                className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[var(--accent-red)] text-white font-mono text-xs font-bold tracking-wider hover:opacity-95 shadow-[0_0_20px_var(--border-glow)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>TRANSMITTING MESSAGE...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>LET&apos;S CREATE SOMETHING IMPOSSIBLE.</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
