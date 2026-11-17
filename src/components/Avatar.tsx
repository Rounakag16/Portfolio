import Image from "next/image";

export type Pose =
  | "waving"
  | "pointing-left"
  | "pointing-right"
  | "thinking"
  | "celebrating"
  | "facepalm"
  | "laptop"
  | "thumbs-up"
  | "holding-phone"
  | "shrug"
  | "arms-crossed"
  | "presenting"
  | "head";

/**
 * Poses whose transparent PNG is in /public/avatar/<pose>.png.
 * Add a pose name here once you drop its file in; until then a vector stand-in is drawn.
 */
const READY = new Set<Pose>([]);

type Props = {
  pose: Pose;
  /** Rendered width in px; height follows the 5:6 artwork ratio. */
  width?: number;
  className?: string;
  /** Leave empty when the avatar is decorative next to text that already says the same thing. */
  alt?: string;
  priority?: boolean;
};

export function Avatar({ pose, width = 200, className, alt = "", priority }: Props) {
  const height = Math.round(width * 1.2);
  if (READY.has(pose)) {
    return (
      <Image
        src={`/avatar/${pose}.png`}
        width={width}
        height={height}
        alt={alt}
        className={className}
        priority={priority}
        sizes={`${width}px`}
      />
    );
  }
  return <AvatarSketch pose={pose} width={width} height={height} className={className} alt={alt} />;
}

/** Flat stand-in for the real avatar: orange hoodie, black tee, round glasses, light beard. */
function AvatarSketch({ pose, width, height, className, alt }: { pose: Pose; width: number; height: number; className?: string; alt: string }) {
  const skin = "#e8b48a";
  const hoodie = "#f97316";
  const hoodieShade = "#ea580c";
  const ink = "#1c1917";
  const armUp = pose === "waving" || pose === "celebrating" || pose === "presenting";
  const bothUp = pose === "celebrating";
  const handToChin = pose === "thinking" || pose === "facepalm";

  return (
    <svg
      viewBox="0 0 200 240"
      width={width}
      height={height}
      className={className}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      {/* torso */}
      <path d="M38 240 C40 168 62 130 100 128 C138 130 160 168 162 240 Z" fill={hoodie} />
      <path d="M80 132 L100 168 L120 132 Z" fill={ink} />
      <path d="M72 134 C80 150 90 156 100 168 C110 156 120 150 128 134 C118 126 82 126 72 134 Z" fill={hoodieShade} opacity="0.55" />
      <line x1="92" y1="168" x2="90" y2="200" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="108" y1="168" x2="110" y2="200" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />

      {/* left arm (viewer's left) */}
      {bothUp ? (
        <g>
          <path d="M58 156 C44 130 34 104 30 78" stroke={hoodieShade} strokeWidth="22" strokeLinecap="round" fill="none" />
          <circle cx="29" cy="70" r="11" fill={skin} />
        </g>
      ) : (
        <path d="M54 160 C44 190 44 214 48 236" stroke={hoodieShade} strokeWidth="22" strokeLinecap="round" fill="none" />
      )}

      {/* right arm */}
      {armUp ? (
        <g className={pose === "waving" ? "origin-[150px_150px] motion-safe:animate-[wave_1.6s_ease-in-out_2]" : undefined}>
          <path d="M142 156 C156 130 166 104 170 78" stroke={hoodieShade} strokeWidth="22" strokeLinecap="round" fill="none" />
          <circle cx="171" cy="70" r="11" fill={skin} />
        </g>
      ) : handToChin ? (
        <g>
          <path d="M146 160 C150 140 136 124 118 118" stroke={hoodie} strokeWidth="22" strokeLinecap="round" fill="none" />
          <circle cx="112" cy={pose === "facepalm" ? 74 : 104} r="11" fill={skin} />
        </g>
      ) : (
        <path d="M146 160 C156 190 156 214 152 236" stroke={hoodieShade} strokeWidth="22" strokeLinecap="round" fill="none" />
      )}

      {/* neck + head */}
      <rect x="90" y="104" width="20" height="22" rx="6" fill={skin} />
      <circle cx="100" cy="72" r="36" fill={skin} />
      {/* beard */}
      <path d="M66 74 C66 104 82 112 100 112 C118 112 134 104 134 74 C128 92 118 96 100 96 C82 96 72 92 66 74 Z" fill="#4a3426" opacity="0.85" />
      {/* hair */}
      <path d="M64 66 C62 38 82 26 102 28 C124 28 140 42 136 66 C130 52 118 46 100 46 C84 46 70 52 64 66 Z" fill="#2b1d16" />
      {/* glasses */}
      <g fill="none" stroke={ink} strokeWidth="3">
        <circle cx="86" cy="72" r="10" />
        <circle cx="114" cy="72" r="10" />
        <path d="M96 72 H104" />
      </g>
      <circle cx="86" cy="72" r="2.5" fill={ink} />
      <circle cx="114" cy="72" r="2.5" fill={ink} />
      {/* mouth */}
      {pose === "facepalm" || pose === "thinking" ? (
        <path d="M93 92 H107" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
      ) : (
        <path d="M91 89 C96 95 104 95 109 89" stroke={ink} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      )}
    </svg>
  );
}
