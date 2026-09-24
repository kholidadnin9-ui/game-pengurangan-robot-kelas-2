import bgCity from "../assets/img/bg-city.jpg";
import sceneSalah from "../assets/img/scene-salah.jpg";
import type { Robot } from "../lib/game";
import { cn } from "../utils/cn";
import {
  Confetti,
  IconForward,
  IconHome,
  IconRefresh,
  IconTrophy,
  Stars,
} from "./ui";

interface Props {
  mode: "complete" | "failed";
  level: number;
  wrong: number;
  stars: number;
  isLastLevel: boolean;
  robot: Robot;
  onNext: () => void;
  onReplay: () => void;
  onHome: () => void;
}

export default function LevelEnd({
  mode,
  level,
  wrong,
  stars,
  isLastLevel,
  robot,
  onNext,
  onReplay,
  onHome,
}: Props) {
  if (mode === "failed") {
    return (
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4">
        <img src={sceneSalah} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(239,68,68,.25),rgba(30,5,5,.88))]" />
        <div className="relative z-10 w-full max-w-lg text-center anim-pop">
          <div className="rounded-3xl border-4 border-red-300 bg-red-900/70 backdrop-blur-sm px-6 py-8 shadow-[0_0_40px_rgba(239,68,68,.6)]">
            <h2 className="title-red text-5xl sm:text-6xl">ENERGI HABIS!</h2>
            <div className="my-4 flex justify-center">
              <img src={robot.img} alt={robot.name} className="w-36 sm:w-44 anim-float" />
            </div>
            <p className="font-display font-bold text-lg sm:text-xl text-red-50">
              Nyawamu habis, tapi jangan menyerah!
              <br />
              Yuk, ulangi level ini bersama robotmu.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={onReplay} className="btn btn-yellow text-lg sm:text-xl px-6">
                <IconRefresh className="w-6 h-6" />
                ULANGI LEVEL {level}
              </button>
              <button onClick={onHome} className="btn btn-blue text-lg sm:text-xl px-6">
                <IconHome className="w-6 h-6" />
                KE DASHBOARD
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const message =
    stars === 3
      ? "Luar biasa sempurna! Kamu menyelesaikan 10 soal tanpa jawaban salah!"
      : stars === 2
        ? "Bagus sekali! Kamu menyelesaikan 10 soal! Ulangi untuk meraih 3 bintang!"
        : "Kamu berhasil! Terus berlatih agar jawabanmu semakin tepat!";

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4">
      <img src={bgCity} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#04122e]/70 via-[#06301a]/55 to-[#04122e]/85" />
      <Confetti />

      <div className="relative z-20 grid md:grid-cols-[auto_1fr] items-center gap-4 w-full max-w-3xl">
        <img
          src={robot.img}
          alt={robot.name}
          className="hidden md:block w-56 lg:w-64 anim-float drop-shadow-[0_14px_20px_rgba(0,0,0,.5)]"
        />

        <div className="anim-pop rounded-3xl border-4 border-cyan-300 bg-blue-950/75 backdrop-blur-md px-6 py-7 sm:px-10 text-center shadow-[0_0_44px_rgba(56,189,248,.55)]">
          {isLastLevel ? (
            <>
              <div className="flex justify-center text-yellow-300 anim-bob">
                <IconTrophy className="w-14 h-14" />
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-yellow-300 drop-shadow-[0_3px_0_rgba(120,53,15,.8)] mt-1">
                SEMUA LEVEL SELESAI!
              </h2>
              <p className="text-cyan-100 font-bold mt-1 text-sm sm:text-base">
                Selamat! Kamu resmi menjadi Master Pengurangan!
              </p>
            </>
          ) : (
            <>
              <p className="font-display font-bold text-cyan-200 text-lg sm:text-xl">LEVEL {level}</p>
              <h2 className="title-yellow text-5xl sm:text-6xl -mt-1">SELESAI!</h2>
            </>
          )}

          <div className="my-4 flex justify-center">
            <Stars value={stars} size="w-14 h-14 sm:w-16 sm:h-16" animate />
          </div>

          <div className="rounded-2xl border-2 border-cyan-300/70 bg-blue-900/60 px-4 py-3 font-display font-bold text-sm sm:text-lg text-cyan-50 max-w-md mx-auto">
            {message}
            <br />
            <span className="text-cyan-200 text-xs sm:text-sm font-semibold">
              Jawaban salah: {wrong}
            </span>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={onHome} className="btn btn-blue text-base sm:text-lg px-5">
              <IconHome className="w-5 h-5" />
              KE DASHBOARD
            </button>
            {isLastLevel ? (
              <button onClick={onReplay} className="btn btn-green text-base sm:text-lg px-5">
                <IconRefresh className="w-5 h-5" />
                MAIN LAGI
              </button>
            ) : (
              <button onClick={onNext} className={cn("btn btn-yellow text-base sm:text-lg px-5")}>
                LANJUT LEVEL {level + 1}
                <IconForward className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
