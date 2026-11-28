import Image from "next/image";

/** Each pose is /public/avatar/<pose>.png, made by design/avatar-source/make_avatars.py. */

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
