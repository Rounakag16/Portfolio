/*
 * Flat, top-down illustrations for the Workshop desk.
 * Palette tokens only (plus a stone grey for metal and a coffee brown), 3px charcoal outlines,
 * matching the site's hard-shadow button style. All decorative: the buttons around them carry the names.
 */

const ink = "#1c1917";
const inkSoft = "#44403c";
const orange = "#f97316";
const orangeDeep = "#c2410c";
const orangeLight = "#fed7aa";
const cream = "#fff7ed";
const creamDeep = "#ffedd5";
const teal = "#14b8a6";
const tealDeep = "#0f766e";
const tealLight = "#ccfbf1";
const metal = "#e7e5e4";

type ArtProps = { className?: string };
const svgProps = { "aria-hidden": true, focusable: false } as const;

export function LaptopArt({ className }: ArtProps) {
  // [indent, width, colour] for each line of "code" on screen
  const code: [number, number, string][] = [
    [0, 70, orange], [0, 120, cream], [16, 90, teal], [16, 140, cream], [32, 60, orangeLight],
    [16, 100, teal], [0, 40, cream], [0, 84, orange], [16, 128, cream],
  ];
  return (
    <svg viewBox="0 0 320 272" className={className} {...svgProps}>
      <rect x="12" y="4" width="296" height="164" rx="14" fill={ink} />
      <rect x="24" y="16" width="272" height="138" rx="5" fill="#292524" />
      <circle cx="36" cy="26" r="3.5" fill={orange} />
      <circle cx="48" cy="26" r="3.5" fill={orangeLight} />
      <circle cx="60" cy="26" r="3.5" fill={teal} />
      <rect x="24" y="34" width="62" height="120" fill="#1f1c1a" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="32" y={44 + i * 14} width={i === 1 ? 44 : 34} height="6" rx="3" fill={i === 1 ? orange : inkSoft} />
      ))}
      {code.map(([indent, w, c], i) => (
        <rect key={i} x={96 + indent} y={42 + i * 12} width={w} height="6" rx="3" fill={c} opacity={c === cream ? 0.55 : 1} />
      ))}
      <rect x="2" y="168" width="316" height="100" rx="14" fill={metal} stroke={ink} strokeWidth="3" />
      <rect x="2" y="164" width="316" height="8" rx="3" fill={inkSoft} />
      {[0, 1, 2, 3].map((r) =>
        Array.from({ length: 12 }, (_, c) => (
          <rect key={`${r}-${c}`} x={22 + c * 23.3 + (r % 2) * 5} y={182 + r * 14} width="18" height="10" rx="2.5" fill="#fff" stroke={ink} strokeWidth="1.5" />
        )),
      )}
      <rect x="118" y="240" width="84" height="20" rx="5" fill="#fff" stroke={ink} strokeWidth="2" />
    </svg>
  );
}

export function SketchbookArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 220 262" className={className} {...svgProps}>
      <rect x="6" y="14" width="208" height="242" rx="8" fill="#fff" stroke={ink} strokeWidth="3" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <circle key={i} cx={28 + i * 23.5} cy="14" r="6" fill={creamDeep} stroke={ink} strokeWidth="2.5" />
      ))}
      {/* a tiny architecture sketch: client -> api -> database */}
      <g stroke={ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <rect x="26" y="48" width="64" height="40" rx="6" fill={orangeLight} />
        <rect x="130" y="48" width="64" height="40" rx="6" fill={tealLight} />
        <path d="M90 68h36m-8-7 8 7-8 7" />
        <path d="M162 88v34m-7-8 7 8 7-8" />
        <ellipse cx="162" cy="132" rx="30" ry="9" fill={creamDeep} />
        <path d="M132 132v26c0 5 13 9 30 9s30-4 30-9v-26" fill={creamDeep} />
        <path d="M30 196c14-8 24 8 38 0s24 8 38 0 24 8 38 0" stroke={inkSoft} strokeWidth="2" />
        <path d="M30 220c14-8 24 8 38 0s20 8 30 0" stroke={inkSoft} strokeWidth="2" />
      </g>
      <g fontFamily="ui-monospace, monospace" fontSize="13" fontWeight="700" fill={ink} textAnchor="middle">
        <text x="58" y="73">UI</text>
        <text x="162" y="73">API</text>
      </g>
      {/* pencil lying across the page */}
      <g transform="rotate(-32 120 200)">
        <rect x="40" y="210" width="150" height="14" rx="2" fill={orange} stroke={ink} strokeWidth="2.5" />
        <rect x="40" y="210" width="16" height="14" fill={orangeLight} stroke={ink} strokeWidth="2.5" />
        <path d="M190 210l22 7-22 7z" fill={creamDeep} stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M206 215.2l6 1.8-6 1.8z" fill={ink} />
      </g>
    </svg>
  );
}

export function ToolboxArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 264 196" className={className} {...svgProps}>
      <rect x="6" y="24" width="252" height="166" rx="14" fill={orange} stroke={ink} strokeWidth="3" />
      <rect x="22" y="40" width="220" height="134" rx="7" fill={orangeDeep} stroke={ink} strokeWidth="2.5" />
      <rect x="128" y="40" width="10" height="134" fill={orange} stroke={ink} strokeWidth="2.5" />
      <rect x="98" y="4" width="68" height="26" rx="10" fill="none" stroke={ink} strokeWidth="6" />
      {/* wrench */}
      <g transform="rotate(-38 76 108)">
        <rect x="34" y="101" width="84" height="14" rx="7" fill={metal} stroke={ink} strokeWidth="2.5" />
        <path d="M30 90a18 18 0 1 0 0 36l6-10h-10v-16h10z" fill={metal} stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      </g>
      {/* screwdriver */}
      <g transform="rotate(30 80 120)">
        <rect x="36" y="116" width="44" height="18" rx="8" fill={teal} stroke={ink} strokeWidth="2.5" />
        <rect x="80" y="121" width="50" height="8" fill={metal} stroke={ink} strokeWidth="2" />
      </g>
      {/* little labelled parts trays, like skill tags */}
      {[
        [150, 54, 40, cream], [196, 54, 34, tealLight], [150, 80, 30, tealLight], [186, 80, 44, cream],
        [150, 106, 52, orangeLight], [208, 106, 22, cream], [150, 132, 28, cream], [184, 132, 46, tealLight],
      ].map(([x, y, w, fill], i) => (
        <rect key={i} x={x as number} y={y as number} width={w as number} height="18" rx="5" fill={fill as string} stroke={ink} strokeWidth="2" />
      ))}
    </svg>
  );
}

export function CertificatesArt({ className }: ArtProps) {
  const frame = (mat: string) => (
    <>
      <rect width="150" height="112" rx="5" fill={ink} />
      <rect x="11" y="11" width="128" height="90" fill={mat} />
      <rect x="18" y="18" width="114" height="76" fill="#fff" stroke={ink} strokeWidth="1.5" />
      <rect x="42" y="30" width="66" height="7" rx="3.5" fill={ink} />
      <rect x="32" y="46" width="86" height="4" rx="2" fill={inkSoft} opacity="0.5" />
      <rect x="40" y="56" width="70" height="4" rx="2" fill={inkSoft} opacity="0.5" />
      <path d="M100 74l-5 18 7-4 5 6 2-18z" fill={teal} stroke={ink} strokeWidth="1.5" />
      <circle cx="104" cy="74" r="10" fill={orange} stroke={ink} strokeWidth="2" />
    </>
  );
  return (
    <svg viewBox="0 0 250 220" className={className} {...svgProps}>
      <g transform="translate(8 14) rotate(-7 75 56)">{frame(creamDeep)}</g>
      <g transform="translate(88 96) rotate(5 75 56)">{frame(tealLight)}</g>
    </svg>
  );
}

export function ResumeArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 176 214" className={className} {...svgProps}>
      <rect x="22" y="26" width="132" height="172" rx="4" fill={creamDeep} stroke={ink} strokeWidth="2.5" transform="rotate(7 88 112)" />
      <rect x="22" y="26" width="132" height="172" rx="4" fill="#fff" stroke={ink} strokeWidth="2.5" transform="rotate(-4 88 112)" />
      <rect x="22" y="22" width="132" height="174" rx="4" fill="#fff" stroke={ink} strokeWidth="3" />
      <circle cx="46" cy="50" r="12" fill={orange} stroke={ink} strokeWidth="2" />
      <rect x="66" y="42" width="70" height="8" rx="4" fill={ink} />
      <rect x="66" y="56" width="48" height="5" rx="2.5" fill={inkSoft} opacity="0.6" />
      {[80, 92, 104, 124, 136, 148, 168].map((y, i) => (
        <rect key={y} x="36" y={y} width={[100, 86, 94, 60, 100, 78, 90][i]} height="5" rx="2.5" fill={i === 3 ? teal : inkSoft} opacity={i === 3 ? 1 : 0.45} />
      ))}
      <rect x="112" y="166" width="34" height="20" rx="4" fill={orange} stroke={ink} strokeWidth="2" />
      <text x="129" y="180.5" textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontSize="11" fontWeight="800" fill={ink}>PDF</text>
      {/* paper clip */}
      <path d="M120 8v34a8 8 0 0 0 16 0V14a5 5 0 0 0-10 0v26" fill="none" stroke={tealDeep} strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

export function PhoneArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 92 172" className={className} {...svgProps}>
      <rect x="3" y="3" width="86" height="166" rx="17" fill={ink} />
      <rect x="10" y="16" width="72" height="140" rx="9" fill={cream} />
      <rect x="34" y="8" width="24" height="5" rx="2.5" fill={inkSoft} />
      <rect x="16" y="28" width="44" height="16" rx="8" fill="#fff" stroke={ink} strokeWidth="1.5" />
      <rect x="34" y="52" width="42" height="16" rx="8" fill={orange} stroke={ink} strokeWidth="1.5" />
      <rect x="16" y="76" width="52" height="16" rx="8" fill="#fff" stroke={ink} strokeWidth="1.5" />
      <rect x="40" y="100" width="36" height="16" rx="8" fill={orange} stroke={ink} strokeWidth="1.5" />
      <rect x="16" y="136" width="60" height="12" rx="6" fill="#fff" stroke={ink} strokeWidth="1.5" />
    </svg>
  );
}

export function MugArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 156 134" className={className} {...svgProps}>
      <rect x="96" y="46" width="52" height="40" rx="18" fill="none" stroke={ink} strokeWidth="13" />
      <rect x="96" y="46" width="52" height="40" rx="18" fill="none" stroke={orange} strokeWidth="7" />
      <circle cx="66" cy="66" r="60" fill={orange} stroke={ink} strokeWidth="3" />
      <circle cx="66" cy="66" r="47" fill={cream} stroke={ink} strokeWidth="2.5" />
      <circle cx="66" cy="66" r="40" fill="#78350f" />
      <path d="M50 58c8-10 24-10 30 0s-4 18-14 16-10-10-4-12" fill="none" stroke={orangeLight} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function PlantArt({ className }: ArtProps) {
  const leaves = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg viewBox="0 0 130 130" className={className} {...svgProps}>
      {leaves.map((a, i) => (
        <ellipse key={a} cx="65" cy="30" rx="15" ry="30" transform={`rotate(${a + (i % 2) * 12} 65 65)`} fill={i % 2 ? tealDeep : teal} stroke={ink} strokeWidth="2.5" />
      ))}
      <circle cx="65" cy="65" r="22" fill={orangeDeep} stroke={ink} strokeWidth="3" />
      <circle cx="65" cy="65" r="15" fill="#78350f" />
    </svg>
  );
}

export function PenArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 160 22" className={className} {...svgProps}>
      <rect x="2" y="4" width="128" height="14" rx="7" fill={ink} />
      <rect x="20" y="1" width="40" height="5" rx="2.5" fill={metal} stroke={ink} strokeWidth="1.5" />
      <path d="M130 4l26 7-26 7z" fill={metal} stroke={ink} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function GradCapArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 200 180" className={className} {...svgProps}>
      {/* rolled diploma under the cap */}
      <g transform="rotate(-14 100 130)">
        <rect x="22" y="112" width="156" height="38" rx="19" fill={cream} stroke={ink} strokeWidth="3" />
        <ellipse cx="160" cy="131" rx="10" ry="19" fill={creamDeep} stroke={ink} strokeWidth="2.5" />
        <rect x="86" y="110" width="18" height="42" fill={orange} stroke={ink} strokeWidth="2.5" />
      </g>
      {/* mortarboard, seen from above */}
      <path d="M100 8l78 44-78 44-78-44z" fill={ink} />
      <path d="M100 18l62 34-62 34-62-34z" fill="#292524" />
      <path d="M100 52l58 26" stroke={teal} strokeWidth="4" strokeLinecap="round" />
      <rect x="152" y="74" width="12" height="30" rx="4" fill={teal} stroke={ink} strokeWidth="2" />
      <circle cx="100" cy="52" r="7" fill={orange} stroke={ink} strokeWidth="2" />
    </svg>
  );
}

export function PatentArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 210 220" className={className} {...svgProps}>
      {/* folder */}
      <path d="M8 40h62l12 14h120v158H8z" fill={orangeLight} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      {/* filings fanned out of the folder */}
      <rect x="40" y="18" width="128" height="170" rx="4" fill={creamDeep} stroke={ink} strokeWidth="2.5" transform="rotate(8 104 103)" />
      <rect x="34" y="14" width="128" height="172" rx="4" fill="#fff" stroke={ink} strokeWidth="3" transform="rotate(-3 98 100)" />
      <g transform="rotate(-3 98 100)">
        <rect x="34" y="14" width="128" height="26" rx="4" fill={tealDeep} stroke={ink} strokeWidth="3" />
        <text x="98" y="32" textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontSize="12" fontWeight="800" letterSpacing="2" fill="#fff">PATENT</text>
        {[52, 63, 74, 85].map((y, i) => (
          <rect key={y} x="48" y={y} width={[96, 80, 88, 56][i]} height="5" rx="2.5" fill={inkSoft} opacity="0.45" />
        ))}
        {/* seal and ribbons */}
        <path d="M120 116l-8 30 11-6 8 9 3-30z" fill={orange} stroke={ink} strokeWidth="2" />
        <path d="M136 116l8 30-11-6-8 9-3-30z" fill={orangeDeep} stroke={ink} strokeWidth="2" />
        <circle cx="128" cy="114" r="17" fill={orange} stroke={ink} strokeWidth="2.5" />
        <circle cx="128" cy="114" r="10" fill="none" stroke={ink} strokeWidth="1.5" strokeDasharray="3 2.5" />
      </g>
      {/* folder front flap */}
      <path d="M8 150h194v62H8z" fill={orange} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      <rect x="22" y="164" width="70" height="20" rx="3" fill="#fff" stroke={ink} strokeWidth="2" />
      <rect x="30" y="171" width="44" height="5" rx="2.5" fill={ink} />
    </svg>
  );
}
