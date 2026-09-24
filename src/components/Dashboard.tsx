import heroBiru from "../assets/img/hero-biru.jpg";
import type { Screen } from "../App";
import {
  IconBook,
  IconGear,
  IconLogout,
  IconPlay,
  IconRobot,
} from "./ui";
import { sfx } from "../lib/sound";

interface Props {
  onNavigate: (s: Screen) => void;
}

function MenuButton({
  label,
  icon,
  variant,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  variant: "yellow" | "blue";
  onClick: () => void;
}) {
  return (
    <button
      onClick={() => {
        sfx.click();
        onClick();
      }}
      className={`btn w-full ${variant === "yellow" ? "btn-yellow text-xl sm:text-2xl py-3" : "btn-blue text-lg sm:text-xl py-2.5"}`}
    >
      <span className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">{icon}</span>
      <span className="tracking-wide">{label}</span>
    </button>
  );
}

export default function Dashboard({ onNavigate }: Props) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <img src={heroBiru} alt="Robot Biru teman berhitung" className="absolute inset-0 h-full w-full object-cover object-[62%_center] sm:object-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#04122e]/40 via-transparent to-[#04122e]/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#04122e]/85 via-transparent to-[#0a2f6e]/40" />

      <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-8 py-4 sm:py-6">
        {/* Bar atas */}
        <div className="flex items-start justify-end gap-3">
          <div className="panel-neon !rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-center rotate-2 anim-bob">
            <div className="font-display font-extrabold text-yellow-300 text-xs sm:text-sm md:text-base leading-tight">
              Ayo Berhitung
            </div>
            <div className="font-display font-extrabold text-cyan-200 text-xs sm:text-sm md:text-base leading-tight">
              Jadi Hebat!
            </div>
          </div>
        </div>

        {/* Konten tengah */}
        <div className="flex-1 grid md:grid-cols-2 items-center gap-4 py-4">
          <div className="hidden md:block" />
          <div className="w-full max-w-md mx-auto md:mx-0 md:ml-auto flex flex-col items-center md:items-start anim-slide-up rounded-3xl border border-cyan-300/30 md:border-0 bg-blue-950/60 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-4 sm:p-6 md:p-0 shadow-2xl md:shadow-none">
            {/* Logo judul */}
            <div className="text-center md:text-left">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl">
                <span className="title-yellow">MATH</span>
              </h1>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl -mt-1">
                <span className="title-cyan">ROBOT</span>
              </h1>
              <div className="mt-3 inline-block rounded-lg bg-gradient-to-b from-blue-500 to-blue-800 border-2 border-cyan-300 px-4 py-1.5 shadow-[0_0_18px_rgba(56,189,248,.6)]">
                <span className="font-display font-extrabold text-white text-sm sm:text-lg tracking-wide">
                  PETUALANGAN PENGURANGAN
                </span>
              </div>
              <div className="block mt-1.5 font-display font-bold text-cyan-200 text-sm sm:text-base">
                KELAS 2 SD
              </div>
              <p className="mt-2 text-xs sm:text-sm italic text-cyan-100/90 font-medium">
                created by: widodo guru sd
              </p>
            </div>

            {/* Menu */}
            <div className="mt-5 sm:mt-7 w-full space-y-2.5 sm:space-y-3">
              <MenuButton
                label="MULAI"
                variant="yellow"
                icon={<IconPlay className="w-7 h-7 sm:w-8 sm:h-8" />}
                onClick={() => onNavigate("levels")}
              />
              <MenuButton
                label="PILIH ROBOT"
                variant="blue"
                icon={<IconRobot className="w-7 h-7" />}
                onClick={() => onNavigate("robot")}
              />
              <MenuButton
                label="PANDUAN"
                variant="blue"
                icon={<IconBook className="w-7 h-7" />}
                onClick={() => onNavigate("guide")}
              />
              <MenuButton
                label="PENGATURAN"
                variant="blue"
                icon={<IconGear className="w-7 h-7" />}
                onClick={() => onNavigate("settings")}
              />
              <MenuButton
                label="KELUAR"
                variant="blue"
                icon={<IconLogout className="w-7 h-7" />}
                onClick={() => onNavigate("goodbye")}
              />
            </div>
          </div>
        </div>

        {/* Balon ucapan */}
        <div className="relative z-10 max-w-xs sm:max-w-sm anim-float mt-auto self-start md:mb-2 hidden md:block">
          <div className="speech-bubble text-sm sm:text-base">
            Pengurangan itu mudah
            <br />
            dan menyenangkan!
          </div>
        </div>
      </div>
    </section>
  );
}
