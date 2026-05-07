import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const linesA = ["Halden er ikke bare en by.", "Det er en følelse. En lyd."];
const linesB = ["Gamle sanger vender tilbake –", "preget av gatene,", "farget av Halden."];

export default function StorySection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-black"
    >
      <motion.div
        style={reduceMotion ? undefined : { scale: bgScale, y: bgY }}
        className="absolute inset-0"
      >
        <img
          src="/images/festningen.png"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center grayscale"
          draggable={false}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        <div className="absolute inset-0 grain-overlay opacity-[0.07] mix-blend-overlay pointer-events-none" />
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease: EASE }}
          className="font-gothic text-white text-[clamp(3rem,9vw,7rem)] leading-[0.95] tracking-tight"
        >
          Snart.
        </motion.h2>

        <div className="mt-12 text-white/85 font-serif">
          <div className="space-y-3">
            {linesA.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.0, delay: 0.15 * i, ease: EASE }}
                className="text-xl md:text-2xl leading-relaxed text-balance"
              >
                {line}
              </motion.p>
            ))}
          </div>
          <div className="space-y-3 mt-8">
            {linesB.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.0, delay: 0.15 * (i + 2), ease: EASE }}
                className="text-xl md:text-2xl leading-relaxed text-balance"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.0, delay: 1.0, ease: EASE }}
          className="mt-16 flex flex-col items-center gap-6"
        >
          <a
            href="#"
            className="group inline-flex items-center gap-2 border-b border-white/30 pb-1 text-sm tracking-[0.28em] uppercase text-white/85 hover:text-white hover:border-white transition-colors"
          >
            Eksklusivt på SoundCloud
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
