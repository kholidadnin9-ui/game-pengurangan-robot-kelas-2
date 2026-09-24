import bgInterior from "../assets/img/bg-interior.jpg";
import { ROBOTS, type RobotId } from "../lib/game";
import { sfx } from "../lib/sound";
import { cn } from "../utils/cn";
import { ScreenBg, TopBar } from "./ui";

interface Props {
  selected: RobotId;
  onSelect: (id: RobotId) => void;
  onBack: () => void;
  onHome: () => void;
}

export default function RobotSelect({ selected, onSelect, onBack, onHome }: Props) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <ScreenBg img={bgInterior} dark={0.6} />

      <div className="relative z-10 px-3 sm:px-6 pt-3 sm:pt-5">
        <TopBar title="PILIH ROBOT" onBack={onBack} onHome={onHome} />
        <p className="text-center mt-2 text-sm sm:text-base font-semibold text-cyan-50 drop-shadow">
          Pilih robot favoritmu sebagai teman bertualang!
        </p>
      </div>

      <div className="relative z-10 flex-1 flex items-center px-3 sm:px-8 py-4">
        <div className="w-full max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {ROBOTS.map((robot, i) => {
            const isSelected = robot.id === selected;
            return (
              <div
                key={robot.id}
                className={cn(
                  "anim-slide-up rounded-2xl p-2.5 sm:p-3 border-4 transition-all duration-200",
                  isSelected
                    ? "border-green-400 anim-glow-green scale-[1.03]"
                    : "border-cyan-300/70 hover:border-cyan-200 hover:scale-[1.02]"
                )}
                style={{
                  background: "linear-gradient(180deg, rgba(14,165,233,.25), rgba(30,58,138,.55))",
                  boxShadow: isSelected
                    ? "0 0 26px rgba(74,222,128,.75), inset 0 0 22px rgba(74,222,128,.18)"
                    : `0 0 20px ${robot.glow}, inset 0 0 20px rgba(56,189,248,.15)`,
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <div className={cn("rounded-xl overflow-hidden border-2", robot.ring, "bg-gradient-to-b", robot.gradient)}>
                  <img src={robot.img} alt={robot.name} className="w-full h-36 sm:h-52 lg:h-60 object-cover object-top anim-bob" />
                </div>
                <div className="text-center mt-2 sm:mt-3">
                  <div className="font-display font-extrabold text-white text-sm sm:text-lg drop-shadow leading-tight">
                    {robot.name}
                  </div>
                  <div className="text-[10px] sm:text-xs text-cyan-100/90 font-semibold mt-0.5">{robot.power}</div>
                </div>
                <button
                  onClick={() => {
                    sfx.select();
                    onSelect(robot.id);
                  }}
                  className={cn(
                    "btn w-full mt-2 sm:mt-3 text-sm sm:text-base py-1.5 sm:py-2",
                    isSelected ? "btn-green" : "btn-blue"
                  )}
                >
                  {isSelected ? "✓ DIPILIH" : "PILIH"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 px-4 pb-4 sm:pb-6">
        <div className="panel-neon max-w-2xl mx-auto text-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-cyan-50">
          Setiap robot memiliki kekuatan istimewa, tapi semua siap membantumu belajar pengurangan!
        </div>
      </div>
    </section>
  );
}
