import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// Arcade screen glow positions (left%, top%, size, flicker timing)
const screens = [
  // Left cabinet – upper screen (JOE WEK)
  {
    left: "11%",
    top: "22%",
    w: "18%",
    h: "22%",
    duration: 3.8,
    delay: 0,
    keyframes: [0, 0.45, 0.1, 0.55, 0.05, 0.4, 0.0, 0.5, 0],
    times: [0, 0.08, 0.15, 0.3, 0.38, 0.55, 0.65, 0.82, 1],
  },
  // Left cabinet – lower screen (マジック)
  {
    left: "8%",
    top: "52%",
    w: "20%",
    h: "20%",
    duration: 5.2,
    delay: 1.4,
    keyframes: [0, 0.3, 0.0, 0.4, 0.1, 0.35, 0],
    times: [0, 0.1, 0.22, 0.4, 0.55, 0.78, 1],
  },
  // Right cabinet – screen glow
  {
    left: "72%",
    top: "25%",
    w: "22%",
    h: "38%",
    duration: 4.6,
    delay: 0.7,
    keyframes: [0.1, 0.5, 0.05, 0.45, 0, 0.4, 0.1],
    times: [0, 0.12, 0.25, 0.45, 0.6, 0.8, 1],
  },
  // Top neon signs – left cluster
  {
    left: "2%",
    top: "0%",
    w: "30%",
    h: "18%",
    duration: 6.1,
    delay: 2.1,
    keyframes: [0.05, 0.3, 0, 0.25, 0.05, 0.35, 0.0, 0.2, 0.05],
    times: [0, 0.1, 0.2, 0.35, 0.45, 0.6, 0.72, 0.88, 1],
  },
  // Top neon signs – right cluster
  {
    left: "55%",
    top: "0%",
    w: "28%",
    h: "16%",
    duration: 4.9,
    delay: 3.0,
    keyframes: [0, 0.35, 0.05, 0.4, 0, 0.3, 0],
    times: [0, 0.15, 0.25, 0.42, 0.55, 0.75, 1],
  },
] as const;

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const imgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background image with parallax */}
      <motion.div
        style={
          reduceMotion
            ? undefined
            : { scale: imgScale, y: imgY, opacity: imgOpacity }
        }
        className="absolute inset-0"
      >
        <motion.img
          src="/images/hero-portrait.png"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center"
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Arcade screen glows — each pulses independently */}
        {!reduceMotion &&
          screens.map((s, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [...s.keyframes] }}
              transition={{
                duration: s.duration,
                delay: s.delay,
                repeat: Infinity,
                ease: "linear",
                times: [...s.times],
              }}
              style={{
                position: "absolute",
                left: s.left,
                top: s.top,
                width: s.w,
                height: s.h,
                background:
                  "radial-gradient(ellipse at center, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.25) 40%, transparent 75%)",
                mixBlendMode: "screen",
                pointerEvents: "none",
              }}
            />
          ))}

        {/* CRT scan line — sweeps top to bottom every ~4 seconds */}
        {!reduceMotion && (
          <motion.div
            animate={{ y: ["-2%", "102%"] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 3,
            }}
            style={{ pointerEvents: "none", mixBlendMode: "screen" }}
            className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/0 to-black/80" />
        <div className="absolute inset-0 grain-overlay opacity-[0.07] mix-blend-overlay pointer-events-none" />
      </motion.div>

      {/* Title — layered in front of the hand */}
      <motion.div
        style={reduceMotion ? undefined : { y: titleY }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pt-[8vh] px-6 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
          className="font-gothic text-white leading-[0.95] tracking-tight text-balance text-[clamp(3rem,10vw,8.5rem)]"
          style={{
            textShadow:
              "0 2px 40px rgba(0,0,0,0.7), 0 0 1px rgba(255,255,255,0.15)",
          }}
        >
          Halden
          <span className="mx-3 md:mx-5 text-white/35 font-gothic">|</span>
          The Album
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.9, ease: EASE }}
          className="mt-6 font-serif italic text-white/65 text-base md:text-lg tracking-wide"
        >
          Et album fra{" "}
          <span className="not-italic tracking-[0.32em] uppercase text-white/80 text-xs md:text-sm ml-2">
            Zkrutrekkerzidd
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.1, ease: EASE }}
          className="mt-3 text-[13px] tracking-[0.32em] uppercase text-white/65"
        >
          Slippes 15. mai
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={reduceMotion ? undefined : { opacity: cueOpacity }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/45">
          Bla ned
        </span>
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : { scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px origin-top bg-white/60"
        />
      </motion.div>
    </section>
  );
}
