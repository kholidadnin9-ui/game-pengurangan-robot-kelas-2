import bgInterior from "../assets/img/bg-interior.jpg";
import { LEVELS } from "../lib/game";
import { ScreenBg, TopBar } from "./ui";

interface Props {
  onBack: () => void;
  onHome: () => void;
}

const STEPS = [
  "Pilih robot favoritmu sebagai teman bertualang!",
  "Buka menu MULAI, lalu pilih level yang sudah terbuka.",
  "Baca soal pengurangan di papan, contohnya 12 − 5 = ?",
  "Pilih salah satu jawaban yang benar di antara opsi A, B, atau C.",
  "Kamu punya 3 nyawa. Setiap jawaban salah akan mengurangi 1 nyawa.",
  "Jika jawabanmu benar, kamu lanjut ke soal berikutnya.",
  "Selesaikan 10 soal untuk memenangkan bintang dan membuka level berikutnya!",
];

export default function Guide({ onBack, onHome }: Props) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <ScreenBg img={bgInterior} dark={0.6} />
      <div className="relative z-10 px-3 sm:px-6 pt-3 sm:pt-5">
        <TopBar title="PANDUAN" subtitle="Yuk pahami cara bermainnya!" onBack={onBack} onHome={onHome} />
      </div>

      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto px-4 sm:px-8 py-5">
        <div className="w-full max-w-3xl mx-auto space-y-4">
          <div className="panel-neon p-4 sm:p-6">
            <h3 className="font-display font-extrabold text-yellow-300 text-lg sm:text-xl mb-3">
              🤖 Cara Bermain
            </h3>
            <ol className="space-y-2.5">
              {STEPS.map((s, i) => (
                <li key={i} className="flex items-start gap-3 anim-slide-up" style={{ animationDelay: `${i * 0.06}s` }}>
                  <span className="flex-none w-8 h-8 rounded-full bg-gradient-to-b from-yellow-300 to-amber-500 border-2 border-yellow-100 text-blue-950 font-display font-extrabold flex items-center justify-center shadow-[0_0_10px_rgba(253,224,71,.6)]">
                    {i + 1}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-cyan-50 leading-snug pt-1">{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="panel-neon p-4 sm:p-6">
            <h3 className="font-display font-extrabold text-yellow-300 text-lg sm:text-xl mb-3">
              📚 Daftar Level Pengurangan
            </h3>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {LEVELS.map((lv) => (
                <div
                  key={lv.n}
                  className={`flex items-center gap-3 rounded-xl border-2 border-white/25 bg-gradient-to-r ${lv.gradient} px-3 py-2.5`}
                >
                  <span className="flex-none w-9 h-9 rounded-lg bg-white/20 border-2 border-white/60 flex items-center justify-center font-display font-extrabold">
                    {lv.n}
                  </span>
                  <div className="leading-tight">
                    <div className="font-display font-extrabold text-sm sm:text-base">{lv.title}</div>
                    <div className="text-[11px] sm:text-xs font-semibold text-white/90">{lv.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs sm:text-sm text-cyan-100/90 font-semibold">
              💡 Tips: Kerjakan pengurangan dengan teliti, mulai dari angka satuan. Jika satuhan
              kurang, pinjam 1 dari puluhan.
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
