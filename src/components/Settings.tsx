import bgInterior from "../assets/img/bg-interior.jpg";
import { useState } from "react";
import { sfx } from "../lib/sound";
import { cn } from "../utils/cn";
import { IconMute, IconSound, ScreenBg, TopBar } from "./ui";

interface Props {
  sound: boolean;
  onToggleSound: () => void;
  onReset: () => void;
  onBack: () => void;
  onHome: () => void;
}

export default function Settings({ sound, onToggleSound, onReset, onBack, onHome }: Props) {
  const [confirming, setConfirming] = useState(false);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <ScreenBg img={bgInterior} dark={0.6} />
      <div className="relative z-10 px-3 sm:px-6 pt-3 sm:pt-5">
        <TopBar title="PENGATURAN" onBack={onBack} onHome={onHome} />
      </div>

      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto flex items-center px-4 py-4">
        <div className="w-full max-w-lg mx-auto space-y-4">
          <div className="panel-neon p-4 sm:p-6 flex items-center justify-between gap-4 anim-slide-up">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-xl bg-gradient-to-b from-sky-400 to-blue-700 border-2 border-cyan-200 flex items-center justify-center">
                {sound ? <IconSound className="w-7 h-7" /> : <IconMute className="w-7 h-7" />}
              </span>
              <div>
                <div className="font-display font-extrabold text-lg">Efek Suara</div>
                <div className="text-xs sm:text-sm text-cyan-100/85 font-semibold">
                  Suara tombol, jawaban benar, dan permainan
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                onToggleSound();
                if (!sound) setTimeout(() => sfx.click(), 30);
              }}
              className={cn(
                "relative w-20 h-10 rounded-full border-2 border-white/60 transition-colors flex-none",
                sound ? "bg-green-500 shadow-[0_0_14px_rgba(74,222,128,.7)]" : "bg-slate-600"
              )}
              aria-label="Matikan atau nyalakan suara"
            >
              <span
                className={cn(
                  "absolute top-0.5 w-8 h-8 rounded-full bg-white shadow transition-all",
                  sound ? "left-[2.6rem]" : "left-0.5"
                )}
              />
            </button>
          </div>

          <div className="panel-neon p-4 sm:p-6 anim-slide-up" style={{ animationDelay: ".08s" }}>
            <div className="font-display font-extrabold text-lg mb-2">Reset Progres</div>
            <p className="text-xs sm:text-sm text-cyan-100/85 font-semibold mb-3">
              Menghapus semua bintang, level yang terbuka, dan pilihan robot. Tindakan ini tidak
              dapat dibatalkan.
            </p>
            {confirming ? (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onReset();
                    setConfirming(false);
                  }}
                  className="btn btn-red flex-1 text-sm sm:text-base"
                >
                  Ya, hapus semua!
                </button>
                <button onClick={() => setConfirming(false)} className="btn btn-blue flex-1 text-sm sm:text-base">
                  Batal
                </button>
              </div>
            ) : (
              <button onClick={() => setConfirming(true)} className="btn btn-red w-full text-sm sm:text-base">
                RESET PROGRES
              </button>
            )}
          </div>

          <div className="panel-neon p-4 text-center anim-slide-up" style={{ animationDelay: ".16s" }}>
            <div className="font-display font-extrabold text-yellow-300">MATH ROBOT</div>
            <p className="text-xs sm:text-sm text-cyan-100/90 font-semibold mt-1">
              Petualangan Pengurangan Bilangan 1 - 100
              <br />
              Materi Matematika Kelas 2 SD
            </p>
            <p className="text-[11px] sm:text-xs italic text-cyan-200/80 mt-2">
              created by: widodo guru sd
            </p>
          </div>

          <div className="text-center pb-2">
            <button onClick={onBack} className="btn btn-yellow text-lg px-8">
              KEMBALI
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
