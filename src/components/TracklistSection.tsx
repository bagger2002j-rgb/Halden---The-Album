import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Vinyl from "./Vinyl";
import Tracklist from "./Tracklist";

export default function TracklistSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Vinyl: scroll drives the EXIT (x slide + fade + scale) only.
  // Rotation is handled by a continuous CSS-style animate so it's always smooth.
  const vinylX = useTransform(
    scrollYProgress,
    [0.28, 0.52],
    ["0vw", "-130vw"],
  );
  const vinylOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.50],
    [1, 0],
  );
  const vinylScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.52],
    [0.88, 1, 0.88],
  );

  // Poster: full-bleed background, fades in 0.33→0.55.
  const posterOpacity = useTransform(
    scrollYProgress,
    [0.33, 0.55],
    [0, 1],
  );
  const posterScale = useTransform(
    scrollYProgress,
    [0.33, 0.55, 1],
    [1.06, 1, 1.02],
  );

  return (
    <section
      ref={ref}
      className="relative h-[320vh] w-full bg-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Album poster — full-bleed background, appears after vinyl exits */}
        <motion.div
          style={
            reduceMotion
              ? undefined
              : { opacity: posterOpacity, scale: posterScale }
          }
          className="absolute inset-0"
        >
          <img
            src="/images/album-clean.png"
            alt="Halden | The Album — omslag"
            className="absolute inset-0 h-full w-full object-cover object-center grayscale"
            draggable={false}
          />
          {/* Dark overlay so tracklist text is readable */}
          <div className="absolute inset-0 bg-black/45" />
          {/* Bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          <div className="absolute inset-0 grain-overlay opacity-[0.05] mix-blend-overlay pointer-events-none" />
        </motion.div>

        {/* Stage — vinyl + tracklist sit on top of the background */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Vinyl — centered, exits left. Rotation is self-contained inside Vinyl. */}
          <motion.div
            style={
              reduceMotion
                ? undefined
                : {
                    x: vinylX,
                    opacity: vinylOpacity,
                    scale: vinylScale,
                  }
            }
            className="absolute z-10 w-[90vw] md:w-[76vh] max-w-[860px] aspect-square"
          >
            <Vinyl
              spinning={!reduceMotion}
              className="h-full w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
            />
          </motion.div>

          {/* Tracklist — right side, over the full-bleed image */}
          <div className="absolute right-0 md:right-[6vw] top-[35%] md:top-1/2 md:-translate-y-1/2 w-[90vw] md:w-[42vw] max-w-[580px] px-6 md:px-0 pointer-events-auto z-20 max-h-[65vh] md:max-h-none overflow-y-auto">
            <Tracklist progress={scrollYProgress} />
          </div>
        </div>

        {/* Edge vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_60%,_rgba(0,0,0,0.55)_100%)]" />
      </div>
    </section>
  );
}
