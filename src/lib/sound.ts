/* Efek suara sederhana memakai Web Audio API (tanpa berkas audio) */
let enabled = true;
let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(
  freq: number,
  start: number,
  dur: number,
  type: OscillatorType = "triangle",
  vol = 0.1,
  slideTo?: number
) {
  const c = getCtx();
  if (!c || !enabled) return;
  const t0 = c.currentTime + start;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(40, slideTo), t0 + dur);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

export const sfx = {
  setEnabled(v: boolean) {
    enabled = v;
  },
  unlockAudio() {
    getCtx();
  },
  click() {
    tone(660, 0, 0.08, "square", 0.045);
  },
  select() {
    tone(523, 0, 0.09, "triangle", 0.09);
    tone(784, 0.07, 0.12, "triangle", 0.09);
  },
  correct() {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.17, "triangle", 0.11));
  },
  wrong() {
    tone(220, 0, 0.24, "sawtooth", 0.07, 110);
    tone(165, 0.14, 0.3, "sawtooth", 0.06, 82);
  },
  star() {
    tone(880, 0, 0.12, "triangle", 0.1);
    tone(1319, 0.09, 0.2, "triangle", 0.1);
  },
  win() {
    [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.11, 0.24, "triangle", 0.11));
  },
  fail() {
    [392, 330, 262, 196].forEach((f, i) => tone(f, i * 0.16, 0.26, "sawtooth", 0.07));
  },
  unlock() {
    [392, 523, 659, 784].forEach((f, i) => tone(f, i * 0.08, 0.16, "triangle", 0.09));
  },
};
