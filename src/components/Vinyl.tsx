import { motion } from "framer-motion";

type Props = {
  spinning?: boolean;
  className?: string;
};

export default function Vinyl({ spinning = true, className }: Props) {
  return (
    <motion.div
      animate={spinning ? { rotate: 360 } : undefined}
      transition={
        spinning
          ? { duration: 7, repeat: Infinity, ease: "linear" }
          : undefined
      }
      className={className}
    >
      <svg
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full h-full select-none"
        aria-hidden
      >
        <defs>
          {/* Off-white cream disc */}
          <radialGradient id="disc" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8e2d6" />
            <stop offset="45%" stopColor="#d9d3c5" />
            <stop offset="100%" stopColor="#c8c1b0" />
          </radialGradient>
          {/* Subtle warm sheen */}
          <radialGradient id="sheen" cx="32%" cy="28%" r="60%">
            <stop offset="0%" stopColor="rgba(255,252,245,0.35)" />
            <stop offset="50%" stopColor="rgba(255,252,245,0.08)" />
            <stop offset="100%" stopColor="rgba(255,252,245,0)" />
          </radialGradient>
          {/* Dark center label */}
          <radialGradient id="label" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1c1a16" />
            <stop offset="100%" stopColor="#0e0d0a" />
          </radialGradient>
        </defs>

        {/* Disc base */}
        <circle cx="300" cy="300" r="298" fill="url(#disc)" />

        {/* Grooves — warm dark rings on cream */}
        {Array.from({ length: 60 }).map((_, i) => (
          <circle
            key={i}
            cx="300"
            cy="300"
            r={120 + i * 3}
            fill="none"
            stroke="rgba(80,70,55,0.18)"
            strokeWidth={i % 5 === 0 ? 0.7 : 0.35}
          />
        ))}

        {/* Sheen highlight */}
        <circle cx="300" cy="300" r="298" fill="url(#sheen)" />

        {/* Outer edge shadow ring */}
        <circle
          cx="300"
          cy="300"
          r="296"
          fill="none"
          stroke="rgba(80,70,55,0.3)"
          strokeWidth="3"
        />

        {/* Center label */}
        <circle cx="300" cy="300" r="110" fill="url(#label)" />
        <circle
          cx="300"
          cy="300"
          r="110"
          fill="none"
          stroke="rgba(200,190,170,0.2)"
          strokeWidth="1"
        />

        {/* Label text */}
        <text
          x="300"
          y="275"
          textAnchor="middle"
          fontFamily="UnifrakturCook, serif"
          fontSize="32"
          fill="#d4ccba"
          letterSpacing="2"
        >
          Halden
        </text>
        <line
          x1="225"
          y1="294"
          x2="375"
          y2="294"
          stroke="#d4ccba"
          strokeOpacity="0.3"
          strokeWidth="0.8"
        />
        <text
          x="300"
          y="318"
          textAnchor="middle"
          fontFamily="Instrument Serif, serif"
          fontStyle="italic"
          fontSize="13"
          fill="#d4ccba"
          letterSpacing="3"
        >
          The Album
        </text>
        <text
          x="300"
          y="346"
          textAnchor="middle"
          fontFamily="Instrument Serif, serif"
          fontSize="7.5"
          fill="#d4ccba"
          fillOpacity="0.45"
          letterSpacing="4"
        >
          ZKRUTREKKERZIDD · MMXXVI
        </text>

        {/* Spindle hole */}
        <circle cx="300" cy="300" r="7" fill="#0e0d0a" />
        <circle cx="300" cy="300" r="2.5" fill="#c8c1b0" />
      </svg>
    </motion.div>
  );
}
