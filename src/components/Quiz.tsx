import bgInterior from "../assets/img/bg-interior.jpg";
import sceneBenar from "../assets/img/scene-benar.jpg";
import sceneSalah from "../assets/img/scene-salah.jpg";
import { LEVELS, type Question, type Robot } from "../lib/game";
import { cn } from "../utils/cn";
import {
  Hearts,
  HexBadge,
  IconForward,
  IconRefresh,
  RoundButton,
  IconBack,
} from "./ui";

export type QuizPhase = "ask" | "correct" | "wrong";

interface Props {
  level: number;
  questions: Question[];
  index: number;
  hearts: number;
  phase: QuizPhase;
  chosen: number | null;
  robot: Robot;
  onAnswer: (opt: number) => void;
  onNext: () => void;
  onRetry: () => void;
  onQuit: () => void;
}

const LETTERS = ["A", "B", "C"];
const SPARKLES = [
  { left: "12%", top: "22%", d: "0s" },
  { left: "84%", top: "18%", d: ".3s" },
  { left: "78%", top: "70%", d: ".6s" },
  { left: "18%", top: "68%", d: ".9s" },
  { left: "50%", top: "12%", d: "1.2s" },
  { left: "68%", top: "42%", d: ".45s" },
  { left: "28%", top: "40%", d: ".75s" },
];

export default function Quiz({
  level,
  questions,
  index,
  hearts,
  phase,
  chosen,
  robot,
  onAnswer,
  onNext,
  onRetry,
  onQuit,
}: Props) {
  const q = questions[index];
  const lv = LEVELS[level - 1];
  const isLast = index === questions.length - 1;

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <img src={bgInterior} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#04122e]/70 via-[#061a44]/55 to-[#04122e]/80" />

      {/* Bar status */}
      <div className="relative z-10 px-3 sm:px-6 pt-3 sm:pt-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <RoundButton onClick={onQuit} label="Keluar level">
            <IconBack className="w-7 h-7" />
          </RoundButton>
          <div className="pill-info text-xs sm:text-lg">Level {level}</div>
          <div className="pill-info flex-1 text-center text-xs sm:text-lg">
            Soal {index + 1} dari 10
          </div>
          <Hearts lives={hearts} />
        </div>
        {/* Progres */}
        <div className="mt-2.5 flex gap-1 max-w-2xl mx-auto">
          {questions.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-2 flex-1 rounded-full border border-cyan-200/40 transition-all",
                i < index ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,.8)]" : i === index ? "bg-yellow-300 shadow-[0_0_10px_rgba(253,224,71,.9)]" : "bg-blue-950/60"
              )}
            />
          ))}
        </div>
        <p className="text-center text-[11px] sm:text-xs text-cyan-100/80 font-semibold mt-1.5">{lv.title}</p>
      </div>

      {/* Papan soal */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-8 py-2" key={`q-${index}`}>
        <div className="w-full max-w-3xl mx-auto">
          <div className="question-board px-4 py-8 sm:py-12 text-center anim-pop">
            <div className="font-display font-extrabold text-5xl sm:text-7xl text-[#082f49] tracking-wide flex items-center justify-center gap-3 sm:gap-5">
              <span>{q.a}</span>
              <span className="text-sky-600">−</span>
              <span>{q.b}</span>
              <span className="text-sky-600">=</span>
              <span className="text-red-500">?</span>
            </div>
          </div>

          {/* Opsi jawaban */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-5 sm:mt-8">
            {q.options.map((opt, i) => {
              const isChosen = chosen === opt;
              let state = "idle";
              if (phase === "correct" && isChosen) state = "right";
              if (phase === "wrong" && isChosen) state = "wrong";
              const dimmed = phase !== "ask" && !isChosen;
              return (
                <button
                  key={`${index}-${i}`}
                  disabled={phase !== "ask"}
                  onClick={() => onAnswer(opt)}
                  className={cn(
                    "relative flex items-center gap-2 sm:gap-3 rounded-2xl px-2 sm:px-4 py-2.5 sm:py-3.5 transition-all duration-150",
                    "border-[3px] font-display font-extrabold text-2xl sm:text-4xl",
                    state === "right" && "border-green-300 bg-gradient-to-b from-green-400 to-green-700 anim-glow-green scale-[1.04]",
                    state === "wrong" && "border-red-300 bg-gradient-to-b from-red-400 to-red-700 anim-shake",
                    state === "idle" &&
                      phase === "ask" &&
                      "border-cyan-300 bg-gradient-to-b from-blue-600/90 to-blue-900/95 hover:scale-105 hover:border-yellow-300 active:scale-95 cursor-pointer shadow-[0_0_18px_rgba(56,189,248,.5)]",
                    dimmed && "opacity-40 saturate-50"
                  )}
                >
                  <span
                    className={cn(
                      "hex w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-2xl flex-none bg-gradient-to-b",
                      state === "right"
                        ? "from-emerald-200 to-emerald-500 text-emerald-950"
                        : state === "wrong"
                          ? "from-rose-200 to-rose-500 text-rose-950"
                          : i === 0
                            ? "from-red-400 to-red-700 text-white"
                            : "from-sky-400 to-blue-700 text-white"
                    )}
                  >
                    {LETTERS[i]}
                  </span>
                  <span className="flex-1 text-center text-white drop-shadow-[0_2px_2px_rgba(0,0,0,.5)]">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Maskot & ajakan */}
      <div className="relative z-10 flex items-end gap-3 px-4 sm:px-10 pb-4 sm:pb-6">
        <img
          src={robot.img}
          alt={robot.name}
          className="w-16 sm:w-24 anim-bob drop-shadow-[0_8px_12px_rgba(0,0,0,.5)]"
        />
        <div className="speech-bubble text-xs sm:text-base mb-3">
          Ayo pilih jawaban yang benar!
        </div>
      </div>

      {/* OVERLAY BENAR */}
      {phase === "correct" && (
        <FeedbackOverlay
          key={`benar-${index}`}
          ok
          scene={sceneBenar}
          title="BENAR!"
          message="Hebat! Kamu menjawab dengan tepat!"
          buttonLabel={isLast ? "SELESAIKAN" : "LANJUT SOAL"}
          buttonIcon={!isLast ? <IconForward className="w-6 h-6" /> : undefined}
          onClick={onNext}
        />
      )}

      {/* OVERLAY SALAH */}
      {phase === "wrong" && (
        <FeedbackOverlay
          key={`salah-${index}`}
          ok={false}
          scene={sceneSalah}
          title="SALAH"
          message="Tidak apa-apa! Ayo coba lagi! Kamu pasti bisa!"
          buttonLabel={hearts <= 0 ? "ULANGI LEVEL" : "COBA LAGI"}
          buttonIcon={<IconRefresh className="w-6 h-6" />}
          onClick={onRetry}
          sparkles={false}
        />
      )}
    </section>
  );
}

function FeedbackOverlay({
  ok,
  scene,
  title,
  message,
  buttonLabel,
  buttonIcon,
  onClick,
  sparkles = true,
}: {
  ok: boolean;
  scene: string;
  title: string;
  message: string;
  buttonLabel: string;
  buttonIcon?: React.ReactNode;
  onClick: () => void;
  sparkles?: boolean;
}) {
  return (
    <div className="absolute inset-0 z-40 anim-fade">
      <img src={scene} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div
        className="absolute inset-0"
        style={{
          background: ok
            ? "radial-gradient(circle at 50% 45%, rgba(34,197,94,.35), rgba(4,30,15,.82))"
            : "radial-gradient(circle at 50% 45%, rgba(239,68,68,.35), rgba(30,5,5,.85))",
        }}
      />
      {sparkles &&
        SPARKLES.map((s, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className="absolute w-6 h-6 sm:w-9 sm:h-9 text-yellow-300 anim-twinkle"
            style={{ left: s.left, top: s.top, animationDelay: s.d }}
          >
            <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2Z" fill="currentColor" />
          </svg>
        ))}

      <div className="relative h-full w-full flex flex-col items-center justify-center px-4 text-center">
        <h2 className={`${ok ? "title-green" : "title-red"} text-6xl sm:text-8xl anim-pop`}>{title}</h2>
        <div className="my-4 sm:my-6">
          <HexBadge ok={ok} />
        </div>
        <div
          className={cn(
            "rounded-2xl border-2 px-6 py-3 max-w-md font-display font-bold text-lg sm:text-2xl",
            ok
              ? "bg-green-600/85 border-green-300 shadow-[0_0_28px_rgba(74,222,128,.7)]"
              : "bg-red-700/85 border-red-300 shadow-[0_0_28px_rgba(248,113,113,.7)]"
          )}
        >
          {message}
        </div>
        <button onClick={onClick} className="btn btn-yellow text-xl sm:text-2xl mt-6 sm:mt-8 px-8 py-3 anim-bob">
          {buttonIcon}
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
