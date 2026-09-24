import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import { sfx } from "../lib/sound";

/* ---------------- IKON SVG ---------------- */
type IconProps = { className?: string };

export const IconPlay = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5Z" />
  </svg>
);

export const IconRobot = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="8" width="16" height="11" rx="3" fill="currentColor" stroke="none" opacity="0.25" />
    <rect x="4" y="8" width="16" height="11" rx="3" />
    <path d="M12 8V4" />
    <circle cx="12" cy="3.2" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="9" cy="13" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="15" cy="13" r="1.4" fill="currentColor" stroke="none" />
    <path d="M9.5 16.5h5" />
    <path d="M2 13v3M22 13v3" />
  </svg>
);

export const IconBook = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 6.5C10.5 5 8 4.5 4 4.8v13c4-.3 6.5.2 8 1.7 1.5-1.5 4-2 8-1.7v-13c-4-.3-6.5.2-8 1.7Z" />
    <path d="M12 6.5v13" />
  </svg>
);

export const IconGear = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1Z" />
  </svg>
);

export const IconLogout = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4" />
    <path d="M10 17l5-5-5-5" />
    <path d="M15 12H3" />
  </svg>
);

export const IconBack = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
);

export const IconHome = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5.5 10.5V20h13v-9.5" />
    <path d="M9.5 20v-5.5h5V20" />
  </svg>
);

export const IconForward = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);

export const IconRefresh = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12a9 9 0 1 1-2.64-6.36" />
    <path d="M21 4v5h-5" />
  </svg>
);

export const IconLock = ({ className = "w-7 h-7" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" fill="currentColor" stroke="none" opacity="0.9" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
  </svg>
);

export const IconCheck = ({ className = "w-8 h-8" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

export const IconCross = ({ className = "w-8 h-8" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconSound = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 9.5v5h4l5 4V5.5L8 9.5H4Z" fill="currentColor" stroke="none" />
    <path d="M16.5 8.5a5 5 0 0 1 0 7" />
    <path d="M19 6a8.5 8.5 0 0 1 0 12" />
  </svg>
);

export const IconMute = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 9.5v5h4l5 4V5.5L8 9.5H4Z" fill="currentColor" stroke="none" />
    <path d="M22 9.5l-5 5M17 9.5l5 5" />
  </svg>
);

export const IconMap = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
    <path d="M9 4v14M15 6v14" />
  </svg>
);

export const IconGrid = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className}>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </svg>
);

export const IconTrophy = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
    <path d="M8 5H5.5a2.5 2.5 0 0 0 2.5 4M16 5h2.5a2.5 2.5 0 0 1-2.5 4" />
    <path d="M12 13v3.5" />
    <path d="M8.5 20h7M10 16.5h4l.8 3.5H9.2l.8-3.5Z" />
  </svg>
);

/* ---------------- TOMBOL BULAT & TOP BAR ---------------- */
export function RoundButton({
  onClick,
  children,
  label,
  className,
}: {
  onClick: () => void;
  children: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={() => {
        sfx.click();
        onClick();
      }}
      className={cn("round-btn", className)}
    >
      {children}
    </button>
  );
}

export function TopBar({
  title,
  subtitle,
  onBack,
  onHome,
  rightExtra,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onHome?: () => void;
  rightExtra?: ReactNode;
}) {
  return (
    <div className="w-full flex items-center gap-2 sm:gap-3">
      {onBack ? (
        <RoundButton onClick={onBack} label="Kembali">
          <IconBack className="w-7 h-7" />
        </RoundButton>
      ) : (
        <div className="w-[3.1rem] flex-none" />
      )}
      <div className="flex-1 min-w-0 text-center">
        <div className="pill-header text-xl sm:text-2xl md:text-3xl truncate">{title}</div>
        {subtitle && <p className="mt-1 text-xs sm:text-sm font-semibold text-cyan-50/95 drop-shadow">{subtitle}</p>}
      </div>
      {rightExtra ??
        (onHome ? (
          <RoundButton onClick={onHome} label="Ke dashboard">
            <IconHome className="w-6 h-6" />
          </RoundButton>
        ) : (
          <div className="w-[3.1rem] flex-none" />
        ))}
    </div>
  );
}

/* ---------------- BINTANG & HATI ---------------- */
export function Star({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="m12 2.5 2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.6l-5.9 3.07 1.13-6.57L2.45 9.44l6.6-.96L12 2.5Z"
        fill={filled ? "#fde047" : "rgba(2,20,50,0.35)"}
        stroke={filled ? "#b45309" : "rgba(186,230,253,0.85)"}
        strokeWidth="1.6"
        strokeLinejoin="round"
        style={filled ? { filter: "drop-shadow(0 0 8px rgba(253,224,71,.9))" } : undefined}
      />
    </svg>
  );
}

export function Stars({
  value,
  size = "w-9 h-9",
  animate = false,
  className,
}: {
  value: number;
  size?: string;
  animate?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center gap-1.5", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={animate ? "anim-star" : ""}
          style={animate ? { animationDelay: `${0.35 + i * 0.35}s` } : undefined}
        >
          <Star filled={i < value} className={size} />
        </div>
      ))}
    </div>
  );
}

export function Hearts({ lives, total = 3 }: { lives: number; total?: number }) {
  return (
    <div className="flex items-center gap-1.5 pill-info !py-2 !px-3">
      {Array.from({ length: total }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={cn("w-6 h-6 sm:w-7 sm:h-7", i < lives && "anim-heartbeat")}>
          <path
            d="M12 21s-7.5-4.6-10-9.2C.4 8.6 2.3 5 5.8 5c2 0 3.3 1.1 4.2 2.4C10.9 6.1 12.2 5 14.2 5c3.5 0 5.4 3.6 3.8 6.8C19.5 16.4 12 21 12 21Z"
            fill={i < lives ? "#ef4444" : "rgba(15,23,42,.55)"}
            stroke={i < lives ? "#fecaca" : "rgba(148,163,184,.6)"}
            strokeWidth="1.4"
            style={i < lives ? { filter: "drop-shadow(0 0 6px rgba(239,68,68,.8))" } : undefined}
          />
        </svg>
      ))}
    </div>
  );
}

/* ---------------- CONFETTI ---------------- */
const CONFETTI_COLORS = ["#fde047", "#38bdf8", "#f472b6", "#4ade80", "#fb923c", "#c084fc", "#fff"];

export function Confetti({ count = 36 }: { count?: number }) {
  const pieces = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-30">
      {pieces.map((_, i) => {
        const left = (i * 97) % 100;
        const delay = ((i * 0.37) % 3.5).toFixed(2);
        const dur = (3 + ((i * 0.41) % 2.8)).toFixed(2);
        const size = 7 + ((i * 5) % 9);
        const round = i % 3 === 0;
        const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        return (
          <div
            key={i}
            className="confetti-piece"
            style={{
              left: `${left}%`,
              width: size,
              height: round ? size : size * 0.55,
              background: color,
              borderRadius: round ? "9999px" : "2px",
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------------- LATAR ---------------- */
export function ScreenBg({ img, dark = 0.55 }: { img: string; dark?: number }) {
  return (
    <div className="absolute inset-0">
      <img src={img} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#04122e]/80 via-[#061a44]/60 to-[#04122e]/85" style={{ opacity: dark / 0.85 }} />
      <div className="absolute inset-0" style={{ background: "rgba(4,18,46,0.35)" }} />
    </div>
  );
}

/* ---------------- HEXAGON BENAR/SALAH ---------------- */
export function HexBadge({ ok }: { ok: boolean }) {
  return (
    <div
      className={cn(
        "hex w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center anim-pop",
        ok ? "bg-gradient-to-b from-green-300 to-green-600" : "bg-gradient-to-b from-red-400 to-red-700"
      )}
      style={{
        boxShadow: ok
          ? "0 0 30px rgba(74,222,128,.9), inset 0 0 18px rgba(255,255,255,.4)"
          : "0 0 30px rgba(239,68,68,.9), inset 0 0 18px rgba(255,255,255,.35)",
      }}
    >
      <div className="hex w-[82%] h-[82%] bg-white/15 flex items-center justify-center">
        {ok ? <IconCheck className="w-12 h-12 sm:w-14 sm:h-14 text-white" /> : <IconCross className="w-12 h-12 sm:w-14 sm:h-14 text-white" />}
      </div>
    </div>
  );
}
