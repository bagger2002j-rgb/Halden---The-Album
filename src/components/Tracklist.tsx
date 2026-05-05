import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";

const tracks = [
  "Du kan ta meg ut av Halden, men",
  "Rægg City",
  "Don't You Worry Halden",
  "Saigon & Hæng",
  "Hannestad minnestund",
  "Ræggens Romeo & Juliet",
  "Farvel, Tigerstaden",
];

type Props = {
  progress: MotionValue<number>;
};

function TrackRow({
  index,
  title,
  progress,
}: {
  index: number;
  title: string;
  progress: MotionValue<number>;
}) {
  const total = tracks.length;
  const start = 0.55 + (index / total) * 0.4;
  const end = start + 0.08;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const x = useTransform(progress, [start, end], [40, 0]);
  const blur = useTransform(progress, [start, end], [8, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.li
      style={{ opacity, x, filter }}
      className="group relative border-b border-white/10"
    >
      <div className="flex items-baseline gap-6 py-5 md:py-6 px-1 transition-colors duration-500 group-hover:bg-white/[0.03]">
        <span className="font-serif text-xs tracking-[0.3em] text-white/35 tabular-nums w-8">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-serif italic text-xl md:text-2xl lg:text-3xl text-white/85 leading-tight text-balance">
          {title}
        </span>
      </div>
      <span
        aria-hidden
        className="absolute left-0 bottom-0 h-px w-0 bg-white/60 transition-all duration-700 ease-out group-hover:w-full"
      />
    </motion.li>
  );
}

export default function Tracklist({ progress }: Props) {
  const headerOpacity = useTransform(progress, [0.55, 0.65], [0, 1]);
  const headerY = useTransform(progress, [0.55, 0.65], [20, 0]);

  return (
    <div className="w-full max-w-xl">
      <motion.div
        style={{ opacity: headerOpacity, y: headerY }}
        className="mb-8 md:mb-10"
      >
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-3">
          Sporliste
        </p>
        <h3 className="font-serif text-3xl md:text-4xl text-white tracking-tight">
          Et album fra <em className="font-serif italic text-white/55">Zkrutrekkerzidd</em>
        </h3>
      </motion.div>

      <ol className="border-t border-white/10">
        {tracks.map((title, i) => (
          <TrackRow key={title} index={i} title={title} progress={progress} />
        ))}
      </ol>
    </div>
  );
}
