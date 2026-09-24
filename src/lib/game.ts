import biruImg from "../assets/img/robot-biru.png";
import merahImg from "../assets/img/robot-merah.png";
import kuningImg from "../assets/img/robot-kuning.png";
import pinkImg from "../assets/img/robot-pink.png";

export type RobotId = "biru" | "merah" | "kuning" | "pink";

export interface Robot {
  id: RobotId;
  name: string;
  power: string;
  img: string;
  gradient: string;
  ring: string;
  glow: string;
}

export const ROBOTS: Robot[] = [
  {
    id: "biru",
    name: "ROBOT BIRU",
    power: "Kekuatan Es Cerdas",
    img: biruImg,
    gradient: "from-sky-400 via-blue-600 to-blue-800",
    ring: "border-cyan-300",
    glow: "rgba(56,189,248,0.75)",
  },
  {
    id: "merah",
    name: "ROBOT MERAH",
    power: "Api Pantang Menyerah",
    img: merahImg,
    gradient: "from-red-400 via-red-600 to-rose-800",
    ring: "border-red-300",
    glow: "rgba(248,113,113,0.75)",
  },
  {
    id: "kuning",
    name: "ROBOT KUNING",
    power: "Petir Kecepatan",
    img: kuningImg,
    gradient: "from-yellow-300 via-amber-500 to-yellow-700",
    ring: "border-yellow-200",
    glow: "rgba(250,204,21,0.75)",
  },
  {
    id: "pink",
    name: "ROBOT PINK",
    power: "Cahaya Ketelitian",
    img: pinkImg,
    gradient: "from-pink-400 via-fuchsia-500 to-purple-700",
    ring: "border-pink-300",
    glow: "rgba(244,114,182,0.75)",
  },
];

export function getRobot(id: RobotId): Robot {
  return ROBOTS.find((r) => r.id === id) ?? ROBOTS[0];
}

export interface LevelInfo {
  n: number;
  title: string;
  range: string;
  desc: string;
  gradient: string;
  ring: string;
  shadow: string;
}

export const LEVELS: LevelInfo[] = [
  {
    n: 1,
    title: "Pengurangan 1 - 20",
    range: "1 - 20",
    desc: "Pengurangan dasar sampai 20",
    gradient: "from-green-400 via-emerald-500 to-emerald-700",
    ring: "border-green-200",
    shadow: "rgba(34,197,94,0.7)",
  },
  {
    n: 2,
    title: "Tanpa Pinjaman s/d 50",
    range: "1 - 50",
    desc: "Pengurangan tanpa meminjam",
    gradient: "from-sky-400 via-blue-600 to-blue-800",
    ring: "border-sky-200",
    shadow: "rgba(37,99,235,0.7)",
  },
  {
    n: 3,
    title: "Dengan Pinjaman s/d 50",
    range: "1 - 50",
    desc: "Belajar teknik meminjam",
    gradient: "from-cyan-400 via-teal-500 to-cyan-800",
    ring: "border-cyan-200",
    shadow: "rgba(6,182,212,0.7)",
  },
  {
    n: 4,
    title: "Tanpa Pinjaman s/d 100",
    range: "1 - 100",
    desc: "Bilangan besar tanpa pinjaman",
    gradient: "from-indigo-400 via-indigo-600 to-blue-900",
    ring: "border-indigo-200",
    shadow: "rgba(99,102,241,0.7)",
  },
  {
    n: 5,
    title: "Dengan Pinjaman s/d 100",
    range: "1 - 100",
    desc: "Tantangan ahli pengurangan!",
    gradient: "from-fuchsia-400 via-fuchsia-600 to-purple-800",
    ring: "border-fuchsia-200",
    shadow: "rgba(217,70,239,0.7)",
  },
];

export interface Question {
  a: number;
  b: number;
  answer: number;
  options: number[];
}

/* Deterministic RNG agar soal tiap level konsisten */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randInt(rng: () => number, min: number, max: number) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function shuffle<T>(rng: () => number, arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Membuat 10 soal pengurangan sesuai tingkat kesulitan level */
export function generateQuestions(level: number): Question[] {
  const rng = mulberry32(level * 997 + 13);
  const questions: Question[] = [];
  const used = new Set<string>();
  let guard = 0;

  while (questions.length < 10 && guard < 2000) {
    guard++;
    let a = 0;
    let b = 0;

    if (level === 1) {
      // Pengurangan dalam 1 - 20
      a = randInt(rng, 8, 20);
      b = randInt(rng, 1, Math.min(a - 1, 12));
    } else if (level === 2) {
      // Dua bilangan s/d 50 TANPA pinjaman
      a = randInt(rng, 24, 50);
      b = randInt(rng, 11, a - 5);
      if (a % 10 < b % 10) continue;
    } else if (level === 3) {
      // Dua bilangan s/d 50 DENGAN pinjaman
      a = randInt(rng, 24, 50);
      b = randInt(rng, 12, a - 5);
      if (a % 10 >= b % 10) continue;
    } else if (level === 4) {
      // Bilangan s/d 100 TANPA pinjaman
      a = randInt(rng, 42, 99);
      b = randInt(rng, 21, a - 10);
      if (a % 10 < b % 10) continue;
    } else {
      // Bilangan s/d 100 DENGAN pinjaman
      a = randInt(rng, 42, 99);
      b = randInt(rng, 23, a - 10);
      if (a % 10 >= b % 10) continue;
    }

    const answer = a - b;
    if (answer < 1 || answer > 100) continue;
    const key = `${a}-${b}`;
    if (used.has(key)) continue;
    used.add(key);

    // Pilihan jawaban (1 benar + 2 pengecoh)
    const deltas = shuffle(rng, [1, 2, 3, 4, 5, 9, 10, 11]);
    const distractors = new Set<number>();
    for (const d of deltas) {
      if (distractors.size >= 2) break;
      const sign = rng() < 0.5 ? -1 : 1;
      const v = answer + sign * d;
      if (v >= 0 && v <= 100 && v !== answer) distractors.add(v);
    }
    let extra = 1;
    while (distractors.size < 2) {
      const v = answer + extra++;
      if (v <= 100) distractors.add(v);
    }

    const options = shuffle(rng, [answer, ...distractors]);
    questions.push({ a, b, answer, options });
  }

  return questions;
}

export function starsForWrong(wrong: number): number {
  if (wrong <= 0) return 3;
  if (wrong === 1) return 2;
  return 1;
}
