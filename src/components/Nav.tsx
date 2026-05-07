import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const RELEASE = new Date("2026-05-15T00:00:00");

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      d: Math.floor(diff / 86_400_000),
      h: Math.floor((diff % 86_400_000) / 3_600_000),
      m: Math.floor((diff % 3_600_000) / 60_000),
      s: Math.floor((diff % 60_000) / 1_000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function Nav() {
  const { d, h, m, s } = useCountdown(RELEASE);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 inset-x-0 mx-auto z-50 w-[min(92vw,56rem)]"
    >
      <div className="liquid-glass rounded-full px-3 md:px-5 py-2 md:py-2.5 flex items-center justify-between gap-2 md:gap-4">
        {/* Logo */}
        <span className="font-serif text-[9px] md:text-[13px] tracking-[0.18em] md:tracking-[0.28em] text-white/90 uppercase shrink-0">
          Zkrutrekkerzidd
        </span>

        {/* Countdown */}
        <div className="flex items-center gap-1.5 md:gap-3 text-white/60 text-[9px] md:text-[11px] tracking-[0.08em] md:tracking-[0.14em] uppercase tabular-nums">
          <span><span className="text-white/90 font-medium">{d}</span><span className="ml-[2px]">d</span></span>
          <span className="text-white/25">·</span>
          <span><span className="text-white/90 font-medium">{pad(h)}</span><span className="ml-[2px]">t</span></span>
          <span className="text-white/25">·</span>
          <span><span className="text-white/90 font-medium">{pad(m)}</span><span className="ml-[2px]">m</span></span>
          <span className="text-white/25">·</span>
          <span><span className="text-white/90 font-medium">{pad(s)}</span><span className="ml-[2px]">s</span></span>
        </div>

        {/* SoundCloud link */}
        <a
          href="#"
          className="group inline-flex items-center gap-1 md:gap-1.5 text-[9px] md:text-[12px] tracking-[0.12em] md:tracking-[0.18em] uppercase text-white/70 hover:text-white transition-colors shrink-0"
        >
          <span className="hidden md:inline">Lytt på SoundCloud</span>
          <span className="md:hidden">Soundcloud</span>
          <ArrowUpRight
            size={12}
            className="md:hidden transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
          <ArrowUpRight
            size={14}
            className="hidden md:inline transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </motion.nav>
  );
}
