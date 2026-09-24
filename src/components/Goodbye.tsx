import bgCity from "../assets/img/bg-city.jpg";
import robotBiru from "../assets/img/robot-biru.png";
import { sfx } from "../lib/sound";

interface Props {
  onBack: () => void;
}

export default function Goodbye({ onBack }: Props) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <img src={bgCity} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#04122e]/45 via-transparent to-[#04122e]/70" />

      <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-8 py-4 sm:py-6">
        <div className="flex-1 grid md:grid-cols-2 items-center gap-4">
          <div className="hidden md:flex items-end justify-start">
            <img src={robotBiru} alt="Robot Biru" className="w-72 lg:w-80 anim-float drop-shadow-[0_16px_22px_rgba(0,0,0,.5)]" />
          </div>

          <div className="w-full max-w-md mx-auto md:ml-auto anim-pop">
            {/* Papan kayu */}
            <div
              className="relative rounded-2xl p-1 sm:p-1.5"
              style={{
                background: "linear-gradient(180deg,#a16207,#78350f 60%,#451a03)",
                boxShadow: "0 18px 30px rgba(0,0,0,.45), inset 0 2px 0 rgba(255,255,255,.25)",
              }}
            >
              <div
                className="rounded-xl px-6 py-7 sm:px-8 sm:py-9 text-center"
                style={{
                  background: "linear-gradient(180deg,#fde68a,#fbbf24 60%,#d97706)",
                  boxShadow: "inset 0 3px 10px rgba(120,53,15,.35)",
                }}
              >
                <div className="font-display font-extrabold text-amber-900 text-xl sm:text-2xl leading-snug">
                  Bersama robot,
                  <br />
                  kita belajar, kita berlatih,
                  <br />
                  kita jadi lebih hebat!
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-gradient-to-b from-green-500 to-green-700 border-2 border-green-200 px-5 py-3 text-center font-display font-extrabold text-white shadow-[0_0_22px_rgba(34,197,94,.6)]">
              Disiplin Berlatih,
              <br />
              Sukses di Masa Depan!
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => {
                  sfx.click();
                  onBack();
                }}
                className="btn btn-yellow text-lg sm:text-xl px-8"
              >
                KEMBALI KE DASHBOARD
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
