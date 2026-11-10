// Original synthesized audio — no external assets, no autoplay.
let ctx: AudioContext | null = null
let master: GainNode | null = null
let ambienceNodes: { stop: () => void } | null = null

function ensureCtx() {
  if (!ctx) {
    ctx = new AudioContext()
    master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

export function startAmbience() {
  const ac = ensureCtx()
  if (!master || ambienceNodes) return
  master.gain.cancelScheduledValues(ac.currentTime)
  master.gain.linearRampToValueAtTime(0.16, ac.currentTime + 2)

  const stops: (() => void)[] = []
  const bus = ac.createGain()
  bus.gain.value = 1
  bus.connect(master)

  // Deep pad: two detuned oscillators through a slowly breathing lowpass
  const filter = ac.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 320
  filter.Q.value = 0.8
  filter.connect(bus)

  const freqs = [55, 55.4, 110.3]
  freqs.forEach((f, i) => {
    const osc = ac.createOscillator()
    osc.type = i === 2 ? 'sine' : 'triangle'
    osc.frequency.value = f
    const g = ac.createGain()
    g.gain.value = i === 2 ? 0.12 : 0.2
    osc.connect(g)
    g.connect(filter)
    osc.start()
    stops.push(() => osc.stop())
  })

  const lfo = ac.createOscillator()
  lfo.frequency.value = 0.06
  const lfoGain = ac.createGain()
  lfoGain.gain.value = 140
  lfo.connect(lfoGain)
  lfoGain.connect(filter.frequency)
  lfo.start()
  stops.push(() => lfo.stop())

  // Airy wind: looped noise through a bandpass
  const len = ac.sampleRate * 3
  const buf = ac.createBuffer(1, len, ac.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * 0.4
  const noise = ac.createBufferSource()
  noise.buffer = buf
  noise.loop = true
  const bp = ac.createBiquadFilter()
  bp.type = 'bandpass'
  bp.frequency.value = 700
  bp.Q.value = 0.4
  const ng = ac.createGain()
  ng.gain.value = 0.05
  noise.connect(bp)
  bp.connect(ng)
  ng.connect(bus)
  noise.start()
  stops.push(() => noise.stop())

  ambienceNodes = {
    stop: () => {
      stops.forEach((s) => {
        try { s() } catch { /* already stopped */ }
      })
      bus.disconnect()
    },
  }
}

export function stopAmbience() {
  if (!ctx || !master) return
  master.gain.cancelScheduledValues(ctx.currentTime)
  master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6)
  const nodes = ambienceNodes
  ambienceNodes = null
  window.setTimeout(() => nodes?.stop(), 700)
}

export function blip(kind: 'hover' | 'click' | 'transition' = 'hover') {
  if (!ctx || !master || master.gain.value < 0.01) return
  const ac = ctx
  const osc = ac.createOscillator()
  const g = ac.createGain()
  osc.type = 'sine'
  const now = ac.currentTime
  if (kind === 'hover') {
    osc.frequency.setValueAtTime(1200, now)
    g.gain.setValueAtTime(0.05, now)
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.08)
    osc.start(now)
    osc.stop(now + 0.09)
  } else if (kind === 'click') {
    osc.frequency.setValueAtTime(620, now)
    osc.frequency.exponentialRampToValueAtTime(940, now + 0.07)
    g.gain.setValueAtTime(0.08, now)
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.14)
    osc.start(now)
    osc.stop(now + 0.15)
  } else {
    osc.frequency.setValueAtTime(220, now)
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.35)
    g.gain.setValueAtTime(0.06, now)
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.5)
    osc.start(now)
    osc.stop(now + 0.52)
  }
  osc.connect(g)
  g.connect(master)
}