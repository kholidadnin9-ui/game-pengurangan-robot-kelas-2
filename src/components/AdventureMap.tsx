import bgMap from "../assets/img/bg-map.jpg";
import { LEVELS, getRobot } from "../lib/game";
import type { Progress } from "../lib/storage";
import { sfx } from "../lib/sound";
import { cn } from "../utils/cn";
import {
  IconGrid,
  IconHome,
  IconLock,
  RoundButton,
  ScreenBg,
  Stars,
  TopBar,
} from "./ui";

interface Props {
  progress: Progress;
  onPlay: (level: number) => void;
  onBack: () => void;
  onHome: () => void;
}

const NODES = [
  { x: 13, y: 62 },
  { x: 31, y: 38 },
  { x: 49, y: 64 },
  { x: 67, y: 36 },
  { x: 87, y: 58 },
];

export default function AdventureMap({ progress, onPlay, onBack, onHome }: Props) {
  const robot = getRobot(progress.robot);
  const pathD = NODES.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <ScreenBg img={bgMap} dark={0.25} />

      <div className="relative z-20 px-3 sm:px-6 pt-3 sm:pt-5">
        <TopBar
          title="PETA PETUALANGAN"
          subtitle="Teruslah berlatih dan buka semua level!"
          onBack={onBack}
          onHome={onHome}
          rightExtra={
            <div className="flex items-center gap-2">
              <RoundButton onClick={onBack} label="Lihat daftar level">
                <IconGrid className="w-6 h-6" />
              </RoundButton>
              <RoundButton onClick={onHome} label="Ke dashboard">
                <IconHome className="w-6 h-6" />
              </RoundButton>
            </div>
          }
        />
      </div>

      {/* Peta */}
      <div className="relative z-10 flex-1 mx-auto w-full max-w-6xl">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d={pathD} fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 2.4" className="anim-dash" />
        </svg>

        {LEVELS.map((lv, i) => {
          const p = NODES[i];
          const locked = lv.n > progress.unlocked;
          const earned = progress.stars[lv.n] ?? 0;
          const isCurrent = lv.n === progress.unlocked;
          return (
            <div
              key={lv.n}
              className="absolute flex flex-col items-center"
              style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%,-50%)" }}
            >
              <button
                disabled={locked}
                onClick={() => {
                  sfx.click();
                  onPlay(lv.n);
                }}
                className={cn(
                  "relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 flex items-center justify-center font-display font-extrabold text-2xl sm:text-3xl transition-transform",
                  locked
                    ? "bg-gradient-to-b from-slate-600 to-slate-900 border-slate-300/60 cursor-not-allowed text-slate-200"
                    : cn("bg-gradient-to-b text-white border-white/80 hover:scale-110 active:scale-95", lv.gradient),
                  isCurrent && !locked && "anim-glow-green border-green-200 scale-110"
                )}
                style={
                  !locked && !isCurrent
                    ? { boxShadow: `0 0 20px ${lv.shadow}, inset 0 2px 0 rgba(255,255,255,.4)` }
                    : undefined
                }
              >
                {locked ? <IconLock className="w-7 h-7 sm:w-8 sm:h-8 text-slate-100" /> : lv.n}
                {isCurrent && (
                  <span className="absolute -top-9 whitespace-nowrap rounded-full bg-green-500 border-2 border-green-200 px-2.5 py-0.5 text-[10px] sm:text-xs font-display font-extrabold anim-bob">
                    MAINKAN!
                  </span>
                )}
              </button>
              <div className="mt-1 scale-90 sm:scale-100">
                <Stars value={locked ? 0 : earned} size="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="mt-0.5 text-[9px] sm:text-[11px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,.9)] text-center w-20 sm:w-28">
                {lv.title}
              </span>
            </div>
          );
        })}

        {/* Maskot di node awal */}
        <img
          src={robot.img}
          alt={robot.name}
          className="absolute w-20 sm:w-28 anim-float drop-shadow-[0_10px_14px_rgba(0,0,0,.45)]"
          style={{ left: "4%", bottom: "2%" }}
        />
        <div
          className="absolute speech-bubble text-[11px] sm:text-sm max-w-[240px] sm:max-w-xs"
          style={{ left: "22%", bottom: "6%" }}
        >
          “Setiap latihan membuatmu semakin hebat!”
        </div>
      </div>
    </section>
  );
}
