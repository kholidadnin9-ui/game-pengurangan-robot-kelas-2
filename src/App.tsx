import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import RobotSelect from "./components/RobotSelect";
import LevelSelect from "./components/LevelSelect";
import AdventureMap from "./components/AdventureMap";
import Quiz, { type QuizPhase } from "./components/Quiz";
import LevelEnd from "./components/LevelEnd";
import Guide from "./components/Guide";
import Settings from "./components/Settings";
import Goodbye from "./components/Goodbye";
import {
  generateQuestions,
  getRobot,
  starsForWrong,
  type Question,
  type RobotId,
} from "./lib/game";
import { DEFAULT_PROGRESS, loadProgress, saveProgress, type Progress } from "./lib/storage";
import { sfx } from "./lib/sound";

export type Screen =
  | "dashboard"
  | "robot"
  | "levels"
  | "map"
  | "quiz"
  | "guide"
  | "settings"
  | "goodbye"
  | "complete"
  | "failed";

interface Session {
  level: number;
  questions: Question[];
  index: number;
  hearts: number;
  wrong: number;
  phase: QuizPhase;
  chosen: number | null;
}

interface Result {
  mode: "complete" | "failed";
  level: number;
  wrong: number;
  stars: number;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [progress, setProgress] = useState<Progress>(loadProgress);
  const [session, setSession] = useState<Session | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    saveProgress(progress);
    sfx.setEnabled(progress.sound);
  }, [progress]);

  useEffect(() => {
    const unlock = () => sfx.unlockAudio();
    window.addEventListener("pointerdown", unlock, { once: true });
    return () => window.removeEventListener("pointerdown", unlock);
  }, []);

  const startLevel = (n: number) => {
    setSession({
      level: n,
      questions: generateQuestions(n),
      index: 0,
      hearts: 3,
      wrong: 0,
      phase: "ask",
      chosen: null,
    });
    setResult(null);
    setScreen("quiz");
  };

  const answer = (opt: number) => {
    if (!session || session.phase !== "ask") return;
    const q = session.questions[session.index];
    if (opt === q.answer) {
      sfx.correct();
      setSession({ ...session, phase: "correct", chosen: opt });
    } else {
      sfx.wrong();
      setSession({
        ...session,
        phase: "wrong",
        chosen: opt,
        hearts: session.hearts - 1,
        wrong: session.wrong + 1,
      });
    }
  };

  const retryQuestion = () => {
    if (!session) return;
    if (session.hearts <= 0) {
      sfx.fail();
      setResult({ mode: "failed", level: session.level, wrong: session.wrong, stars: 0 });
      setScreen("failed");
      return;
    }
    sfx.click();
    setSession({ ...session, phase: "ask", chosen: null });
  };

  const nextQuestion = () => {
    if (!session) return;
    if (session.index < session.questions.length - 1) {
      sfx.click();
      setSession({
        ...session,
        index: session.index + 1,
        phase: "ask",
        chosen: null,
      });
      return;
    }
    // Level selesai
    const stars = starsForWrong(session.wrong);
    sfx.win();
    setProgress((prev) => ({
      ...prev,
      unlocked: Math.max(prev.unlocked, Math.min(5, session.level + 1)),
      stars: { ...prev.stars, [session.level]: Math.max(prev.stars[session.level] ?? 0, stars) },
    }));
    setResult({ mode: "complete", level: session.level, wrong: session.wrong, stars });
    setScreen("complete");
  };

  const selectRobot = (id: RobotId) => {
    setProgress((prev) => ({ ...prev, robot: id }));
  };

  const resetProgress = () => {
    sfx.fail();
    setProgress({ ...DEFAULT_PROGRESS, sound: progress.sound });
    setSession(null);
    setResult(null);
    setScreen("dashboard");
  };

  const robot = getRobot(progress.robot);

  return (
    <div className="min-h-screen w-full bg-[#04122e] text-white select-none">
      {screen === "dashboard" && <Dashboard onNavigate={setScreen} />}

      {screen === "robot" && (
        <RobotSelect
          selected={progress.robot}
          onSelect={selectRobot}
          onBack={() => setScreen("dashboard")}
          onHome={() => setScreen("dashboard")}
        />
      )}

      {screen === "levels" && (
        <LevelSelect
          progress={progress}
          onPlay={startLevel}
          onOpenMap={() => setScreen("map")}
          onBack={() => setScreen("dashboard")}
          onHome={() => setScreen("dashboard")}
        />
      )}

      {screen === "map" && (
        <AdventureMap
          progress={progress}
          onPlay={startLevel}
          onBack={() => setScreen("levels")}
          onHome={() => setScreen("dashboard")}
        />
      )}

      {screen === "quiz" && session && (
        <Quiz
          level={session.level}
          questions={session.questions}
          index={session.index}
          hearts={session.hearts}
          phase={session.phase}
          chosen={session.chosen}
          robot={robot}
          onAnswer={answer}
          onNext={nextQuestion}
          onRetry={retryQuestion}
          onQuit={() => setScreen("levels")}
        />
      )}

      {(screen === "complete" || screen === "failed") && result && (
        <LevelEnd
          mode={result.mode}
          level={result.level}
          wrong={result.wrong}
          stars={result.stars}
          isLastLevel={result.level === 5}
          robot={robot}
          onNext={() => startLevel(result.level + 1)}
          onReplay={() => startLevel(result.level)}
          onHome={() => setScreen("dashboard")}
        />
      )}

      {screen === "guide" && (
        <Guide onBack={() => setScreen("dashboard")} onHome={() => setScreen("dashboard")} />
      )}

      {screen === "settings" && (
        <Settings
          sound={progress.sound}
          onToggleSound={() =>
            setProgress((prev) => {
              sfx.setEnabled(!prev.sound);
              return { ...prev, sound: !prev.sound };
            })
          }
          onReset={resetProgress}
          onBack={() => setScreen("dashboard")}
          onHome={() => setScreen("dashboard")}
        />
      )}

      {screen === "goodbye" && <Goodbye onBack={() => setScreen("dashboard")} />}
    </div>
  );
}
