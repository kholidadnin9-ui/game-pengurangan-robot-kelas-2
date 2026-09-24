import type { RobotId } from "./game";

export interface Progress {
  unlocked: number; // level tertinggi yang terbuka (1 - 5)
  stars: Record<number, number>; // bintang per level (0 - 3)
  robot: RobotId;
  sound: boolean;
}

const KEY = "mathrobot-pengurangan-v1";

export const DEFAULT_PROGRESS: Progress = {
  unlocked: 1,
  stars: {},
  robot: "biru",
  sound: true,
};

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return {
      unlocked: Math.min(5, Math.max(1, parsed.unlocked ?? 1)),
      stars: parsed.stars ?? {},
      robot: parsed.robot ?? "biru",
      sound: parsed.sound ?? true,
    };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveProgress(p: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* abaikan jika penyimpanan tidak tersedia */
  }
}
