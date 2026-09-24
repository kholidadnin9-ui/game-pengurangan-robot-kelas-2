import bgCity from "../assets/img/bg-city.jpg";
import { LEVELS, getRobot } from "../lib/game";
import type { Progress } from "../lib/storage";
import { sfx } from "../lib/sound";
import { cn } from "../utils/cn";
import {
  IconHome,
  IconLock,
  IconMap,
  RoundButton,
  ScreenBg,
  Stars,
  TopBar,
} from "./ui";

interface Props {
  progress: Progress;
  onPlay: (level: number) => void;
  onOpenMap: () => void;
  onBack: () => void;
  onHome: () => void;
}

export default function LevelSelect({ progress, onPlay, onOpenMap, onBack, onHome }: Props) {
  const robot = getRobot(progress.robot);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <ScreenBg img={bgCity} dark={0.55} />

      <div className="relative z-10 px-3 sm:px-6 pt-3 sm:pt-5">
        <TopBar
          title="PILIH LEVEL"
          subtitle="Selesaikan setiap level dan jadilah Master Pengurangan!"
          onBack={onBack}
          onHome={onHome}
          rightExtra={
            <div className="flex items-center gap-2">
              <RoundButton onClick={onOpenMap} label="Buka peta petualangan">
                <IconMap className="w-6 h-6" />
              </RoundButton>
              <RoundButton onClick={onHome} label="Ke dashboard">
                <IconHome className="w-6 h-6" />
              </RoundButton>
            </div>
          }
        />
      </div>

      <div className="relative z-10 flex-1 flex items-center px-4 sm:px-10 py-4">
        <div className="w-full max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-7 place-items-center">
          {LEVELS.map((lv, i) => {
            const locked = lv.n > progress.unlocked;
            const earned = progress.stars[lv.n] ?? 0;
            return (
              <button
                key={lv.n}
                disabled={locked}
                onClick={() => {
                  sfx.click();
                  onPlay(lv.n);
                }}
                className={cn(
                  "anim-slide-up relative w-full max-w-[240px] aspect-[4/3] rounded-2xl border-4 flex flex-col items-center justify-center gap-1 transition-transform",
                  locked
                    ? "border-sky-300/40 cursor-not-allowed"
                    : "cursor-pointer hover:scale-105 active:scale-95"
                )}
                style={{
                  background: locked
                    ? "linear-gradient(180deg, rgba(30,58,138,.75), rgba(8,20,52,.9))"
                    : "linear-gradient(180deg, rgba(30,58,138,.6), rgba(8,20,52,.7))",
                  boxShadow: locked
                    ? "inset 0 0 22px rgba(2,6,23,.65), 0 0 14px rgba(56,189,248,.25)"
                    : `0 0 26px ${lv.shadow}, inset 0 2px 0 rgba(255,255,255,.35)`,
                  animationDelay: `${i * 0.07}s`,
                }}
              >
                {!locked && (
                  <span className={cn("absolute inset-0 rounded-2xl bg-gradient-to-b opacity-90", lv.gradient)} />
                )}
                <span className="relative font-display font-extrabold text-white text-xl sm:text-3xl drop-shadow-[0_3px_2px_rgba(0,0,0,.45)]">
                  LEVEL {lv.n}
                </span>
                <span className="relative text-[10px] sm:text-xs font-bold text-white/95 text-center px-2 leading-tight">
                  {lv.title}
                </span>

                {locked ? (
                  <span className="relative mt-1 text-sky-100/90">
                    <IconLock className="w-8 h-8 sm:w-10 sm:h-10" />
                  </span>
                ) : (
                  <span className="relative mt-1 scale-90">
                    <Stars value={earned} size="w-7 h-7 sm:w-8 sm:h-8" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Kutipan robot */}
      <div className="relative z-10 flex items-end justify-between gap-3 px-4 sm:px-10 pb-4 sm:pb-6">
        <img
          src={robot.img}
          alt={robot.name}
          className="hidden sm:block w-24 lg:w-32 anim-float drop-shadow-[0_10px_16px_rgba(0,0,0,.5)]"
        />
        <div className="speech-bubble max-w-md text-xs sm:text-sm ml-auto">
          “Satu langkah kecil untuk menjadi ahli pengurangan!”
        </div>
      </div>
    </section>
  );
}
