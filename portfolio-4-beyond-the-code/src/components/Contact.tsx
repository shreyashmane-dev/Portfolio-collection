import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Github, Linkedin, Mail, Send, Check, AlertTriangle } from 'lucide-react'
import { identity } from '../config/content'
import SectionHeader from './fx/SectionHeader'
import Reveal from './fx/Reveal'
import Magnetic from './fx/Magnetic'
import Rain from './fx/Rain'
import { blip } from '../lib/audio'

type FormState = 'idle' | 'sending' | 'sent' | 'prepared' | 'error'
type Fields = { name: string; email: string; subject: string; message: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(f: Fields) {
  const e: Partial<Fields> = {}
  if (f.name.trim().length < 2) e.name = 'NAME REQUIRED — MIN 2 CHARACTERS'
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'VALID EMAIL REQUIRED'
  if (f.subject.trim().length < 2) e.subject = 'SUBJECT REQUIRED'
  if (f.message.trim().length < 10) e.message = 'MESSAGE REQUIRED — MIN 10 CHARACTERS'
  return e
}

const CHANNELS = [
  { label: 'EMAIL', value: identity.email, href: `mailto:${identity.email}`, icon: Mail },
  { label: 'GITHUB', value: 'shreyashmane-dev', href: identity.github, icon: Github },
  { label: 'LINKEDIN', value: 'Shreyash Mane', href: identity.linkedin, icon: Linkedin },
]

export default function Contact() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Partial<Fields>>({})
  const [state, setState] = useState<FormState>('idle')

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(fields)
    setErrors(errs)
    if (Object.keys(errs).length) {
      blip('click')
      return
    }
    setState('sending')
    blip('transition')
    const formId = import.meta.env.VITE_FORMSPREE_ID
    if (formId) {
      try {
        const res = await fetch(`https://formspree.io/f/${formId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: fields.name,
            email: fields.email,
            subject: fields.subject,
            message: fields.message,
          }),
        })
        if (!res.ok) throw new Error('submission failed')
        setState('sent')
        setFields({ name: '', email: '', subject: '', message: '' })
      } catch {
        setState('error')
      }
    } else {
      // No server configured: hand the validated message to the user's mail client.
      const body = `${fields.message}\n\n— ${fields.name} (${fields.email})`
      window.location.href = `mailto:${identity.email}?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(body)}`
      setState('prepared')
    }
  }

  const inputCls = (key: keyof Fields) =>
    `w-full border bg-glass px-4 py-3.5 text-sm text-ink placeholder:text-ink2/50 outline-none transition-colors focus:border-blue ${
      errors[key] ? 'border-red' : 'border-line'
    }`

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-36">
      {/* cinematic night city backdrop */}
      <div aria-hidden className="absolute inset-0">
        <img src="/assets/contact-city.svg" alt="" className="art-invert h-full w-full object-cover" />
        <div className="absolute inset-0 bg-bg/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
      </div>
      <Rain density={40} className="opacity-50" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader index="07" jp="接続" title="START A CONNECTION" />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <h3 className="font-display text-[clamp(2rem,5vw,3.8rem)] uppercase leading-[1.02]">
                Every great idea
                <br />
                starts somewhere<span className="text-red">.</span>
              </h3>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-ink2 md:text-base">
                Have an interesting idea? Let&apos;s build something extraordinary.
              </p>
            </Reveal>

            <div className="mt-10 space-y-3">
              {CHANNELS.map((ch, i) => (
                <Reveal key={ch.label} delay={0.15 + i * 0.08}>
                  <Magnetic strength={0.2}>
                    <a
                      href={ch.href}
                      target={ch.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      onMouseEnter={() => blip('hover')}
                      className="glass group flex w-full items-center gap-4 rounded-sm px-5 py-4 transition-colors hover:border-red/50 sm:w-auto sm:min-w-[340px]"
                    >
                      <span className="flex h-10 w-10 items-center justify-center border border-line text-ink2 transition-colors group-hover:border-red group-hover:text-red">
                        <ch.icon size={16} />
                      </span>
                      <span>
                        <span className="block font-mono text-[9px] tracking-[0.35em] text-ink2">{ch.label}</span>
                        <span className="mt-0.5 block text-sm text-ink">{ch.value}</span>
                      </span>
                      <span className="ml-auto font-mono text-xs text-ink2 transition-all group-hover:translate-x-1 group-hover:text-red">→</span>
                    </a>
                  </Magnetic>
                </Reveal>
              ))}
            </div>
          </div>

          {/* form */}
          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} noValidate className="glass border-energy relative rounded-sm p-6 md:p-8">
              <p className="mb-6 font-mono text-[9px] tracking-[0.4em] text-ink2">
                TRANSMISSION FORM <span className="text-red">//</span> 送信
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="mb-1.5 block font-mono text-[9px] tracking-[0.3em] text-ink2">NAME</label>
                  <input id="c-name" type="text" autoComplete="name" value={fields.name} onChange={set('name')} placeholder="Your name" className={inputCls('name')} aria-invalid={!!errors.name} />
                  {errors.name && <p className="mt-1.5 font-mono text-[8px] tracking-wider text-red">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-1.5 block font-mono text-[9px] tracking-[0.3em] text-ink2">EMAIL</label>
                  <input id="c-email" type="email" autoComplete="email" value={fields.email} onChange={set('email')} placeholder="you@domain.com" className={inputCls('email')} aria-invalid={!!errors.email} />
                  {errors.email && <p className="mt-1.5 font-mono text-[8px] tracking-wider text-red">{errors.email}</p>}
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="c-subject" className="mb-1.5 block font-mono text-[9px] tracking-[0.3em] text-ink2">SUBJECT</label>
                <input id="c-subject" type="text" value={fields.subject} onChange={set('subject')} placeholder="What shall we build?" className={inputCls('subject')} aria-invalid={!!errors.subject} />
                {errors.subject && <p className="mt-1.5 font-mono text-[8px] tracking-wider text-red">{errors.subject}</p>}
              </div>
              <div className="mt-4">
                <label htmlFor="c-message" className="mb-1.5 block font-mono text-[9px] tracking-[0.3em] text-ink2">MESSAGE</label>
                <textarea id="c-message" rows={5} value={fields.message} onChange={set('message')} placeholder="Transmit your idea..." className={`${inputCls('message')} resize-none`} aria-invalid={!!errors.message} />
                {errors.message && <p className="mt-1.5 font-mono text-[8px] tracking-wider text-red">{errors.message}</p>}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <button
                    type="submit"
                    disabled={state === 'sending'}
                    className="flex items-center gap-3 bg-red px-7 py-3.5 font-mono text-[10px] font-bold tracking-[0.3em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {state === 'sending' ? 'TRANSMITTING…' : 'SEND TRANSMISSION'}
                    <Send size={13} />
                  </button>
                </Magnetic>
                <AnimatePresence mode="wait">
                  {state === 'sent' && (
                    <motion.p key="sent" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-blue">
                      <Check size={13} /> TRANSMISSION RECEIVED
                    </motion.p>
                  )}
                  {state === 'prepared' && (
                    <motion.p key="prepared" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-[240px] font-mono text-[9px] leading-relaxed tracking-[0.15em] text-blue">
                      <Check size={13} className="mb-0.5 inline" /> MAIL APP OPENED — PRESS SEND THERE TO COMPLETE
                    </motion.p>
                  )}
                  {state === 'error' && (
                    <motion.p key="err" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-red">
                      <AlertTriangle size={13} /> SIGNAL LOST — TRY AGAIN OR EMAIL DIRECTLY
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>

        <Reveal className="mt-24 text-center md:mt-32">
          <p className="font-display text-[clamp(1.8rem,5.6vw,4.4rem)] uppercase leading-tight">
            Let&apos;s create something <span className="text-red">impossible</span><span className="text-blue">.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}