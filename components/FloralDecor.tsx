// SVG botanical decoration components — Sakura & Aoi theme

interface SVGProps {
  className?: string;
}

// ── Petal path generators ───────────────────────────────────────────────────

/** Cherry blossom petal: notched tip (pointing up, centered at origin) */
function sakuraPetalPath(s: number): string {
  return [
    `M 0,0`,
    `C ${4.5 * s},${-3 * s} ${7 * s},${-13 * s} ${5 * s},${-20 * s}`,
    `Q ${2 * s},${-25 * s} 0,${-23 * s}`,
    `Q ${-2 * s},${-25 * s} ${-5 * s},${-20 * s}`,
    `C ${-7 * s},${-13 * s} ${-4.5 * s},${-3 * s} 0,0 Z`,
  ].join(" ");
}

/** Hollyhock / aoi petal: rounded smooth tip (pointing up, centered at origin) */
function aoiPetalPath(s: number): string {
  return [
    `M 0,0`,
    `C ${5 * s},${-4 * s} ${7.5 * s},${-13 * s} ${5 * s},${-21 * s}`,
    `Q 0,${-26 * s} ${-5 * s},${-21 * s}`,
    `C ${-7.5 * s},${-13 * s} ${-5 * s},${-4 * s} 0,0 Z`,
  ].join(" ");
}

// ── Internal flower components ──────────────────────────────────────────────

/** Cherry blossom flower (5 notched petals + stamens) */
function Sakura({
  x,
  y,
  size = 1,
  petalColor = "#E3BAC6",
  centerColor = "#FDE8E9",
  opacity = 1,
  rotate = 0,
}: {
  x: number;
  y: number;
  size?: number;
  petalColor?: string;
  centerColor?: string;
  opacity?: number;
  rotate?: number;
}) {
  const d = sakuraPetalPath(size);
  const sr = 8 * size;

  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`} opacity={opacity}>
      {[0, 72, 144, 216, 288].map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <path d={d} fill={petalColor} />
        </g>
      ))}
      {/* Stamens */}
      {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((a) => {
        const r = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={0}
            y1={0}
            x2={Math.sin(r) * sr}
            y2={-Math.cos(r) * sr}
            stroke="#BC9EC1"
            strokeWidth={0.65 * size}
            opacity={0.48}
          />
        );
      })}
      {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((a) => {
        const r = (a * Math.PI) / 180;
        return (
          <circle
            key={a}
            cx={Math.sin(r) * sr}
            cy={-Math.cos(r) * sr}
            r={1.1 * size}
            fill="#BC9EC1"
            opacity={0.62}
          />
        );
      })}
      <circle cx={0} cy={0} r={3.5 * size} fill={centerColor} />
      <circle cx={0} cy={0} r={1.8 * size} fill={petalColor} opacity={0.45} />
    </g>
  );
}

/** Hollyhock / aoi flower (5 rounded petals + pistil) */
function Aoi({
  x,
  y,
  size = 1,
  petalColor = "#D4B8D8",
  centerColor = "#FDE8E9",
  opacity = 1,
  rotate = 0,
}: {
  x: number;
  y: number;
  size?: number;
  petalColor?: string;
  centerColor?: string;
  opacity?: number;
  rotate?: number;
}) {
  const d = aoiPetalPath(size);

  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`} opacity={opacity}>
      {[0, 72, 144, 216, 288].map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <path d={d} fill={petalColor} />
        </g>
      ))}
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const r = (a * Math.PI) / 180;
        return (
          <circle
            key={a}
            cx={Math.sin(r) * 3.5 * size}
            cy={-Math.cos(r) * 3.5 * size}
            r={0.9 * size}
            fill="#BC9EC1"
            opacity={0.55}
          />
        );
      })}
      <circle cx={0} cy={0} r={3.8 * size} fill={centerColor} />
      <circle cx={0} cy={0} r={1.8 * size} fill={petalColor} opacity={0.4} />
    </g>
  );
}

/** Small branch bud */
function SakuraBud({
  x,
  y,
  size = 1,
  color = "#E3BAC6",
  opacity = 1,
}: {
  x: number;
  y: number;
  size?: number;
  color?: string;
  opacity?: number;
}) {
  const s = size;
  return (
    <g transform={`translate(${x},${y})`} opacity={opacity}>
      <ellipse cx={0} cy={-5 * s} rx={2.5 * s} ry={5.5 * s} fill={color} />
      <line
        x1={0}
        y1={0}
        x2={0}
        y2={3 * s}
        stroke="#BC9EC1"
        strokeWidth={s}
        strokeLinecap="round"
        opacity={0.45}
      />
    </g>
  );
}

// ── Exported decorative components ──────────────────────────────────────────

/**
 * Large hero illustration — 華道・香道 × Technology fusion.
 * Ikebana arrangement (suiban + kenzan) with a kōro incense burner.
 * Subtle circuit / data-node overlay blends organic and digital.
 */
export function FloralHero({ className }: SVGProps) {
  return (
    <svg
      viewBox="0 0 420 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Subtle dot-grid pattern — digital canvas */}
        <pattern id="dotgrid" x="0" y="0" width="38" height="38" patternUnits="userSpaceOnUse">
          <circle cx="19" cy="19" r="1" fill="#BC9EC1" opacity="0.09" />
        </pattern>
      </defs>

      {/* ── Background: digital dot grid ── */}
      <rect x="0" y="0" width="420" height="520" fill="url(#dotgrid)" />

      {/* ── Background: faint circuit traces ── */}
      {/* Horizontal segment — upper area */}
      <polyline
        points="55,148 105,148 105,118 148,118"
        stroke="#BC9EC1" strokeWidth="0.7" strokeDasharray="3,6"
        fill="none" opacity="0.14"
      />
      {/* Right-side L-segment */}
      <polyline
        points="358,295 390,295 390,258 405,258"
        stroke="#E3BAC6" strokeWidth="0.7" strokeDasharray="3,6"
        fill="none" opacity="0.12"
      />
      {/* Lower-left segment */}
      <polyline
        points="42,388 78,388 78,410 108,410"
        stroke="#BC9EC1" strokeWidth="0.6" strokeDasharray="2,5"
        fill="none" opacity="0.11"
      />
      {/* Circuit junction nodes */}
      <circle cx="105" cy="148" r="2.2" fill="none" stroke="#BC9EC1" strokeWidth="0.8" opacity="0.18" />
      <circle cx="105" cy="118" r="2.2" fill="none" stroke="#BC9EC1" strokeWidth="0.8" opacity="0.18" />
      <circle cx="390" cy="295" r="2" fill="none" stroke="#E3BAC6" strokeWidth="0.7" opacity="0.16" />
      <circle cx="78"  cy="388" r="2" fill="none" stroke="#BC9EC1" strokeWidth="0.7" opacity="0.14" />

      {/* ── Suiban (水盤 — flat ikebana vessel) ── */}
      {/* Drop shadow */}
      <ellipse cx="196" cy="480" rx="72" ry="7" fill="#D4B8D8" opacity="0.18" />
      {/* Outer dish rim */}
      <path
        d="M 124,464 Q 124,478 196,478 Q 268,478 268,464 L 263,456 Q 262,463 196,463 Q 130,463 130,456 Z"
        fill="#D4B8D8"
      />
      {/* Inner basin */}
      <path
        d="M 132,461 Q 132,472 196,472 Q 260,472 260,461 L 256,455 Q 255,462 196,462 Q 137,462 136,455 Z"
        fill="#EAD8EA"
      />
      {/* Water surface highlight */}
      <ellipse cx="196" cy="458" rx="57" ry="5.5" fill="#F4EAF4" />
      <ellipse cx="186" cy="457" rx="28" ry="2.5" fill="#FEFAF9" opacity="0.55" />

      {/* ── Kenzan (剣山 — pin frog inside suiban) ── */}
      <rect x="178" y="451" width="37" height="9" rx="2.5" fill="#BC9EC1" opacity="0.65" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line
          key={i}
          x1={182 + i * 4.5} y1="449"
          x2={182 + i * 4.5} y2="453"
          stroke="#9470A0"
          strokeWidth="0.9"
          opacity={0.55}
        />
      ))}

      {/* ── Kōro (香炉 — incense burner) ── */}
      {/* Legs */}
      <line x1="307" y1="463" x2="304" y2="471" stroke="#C8A8C8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="321" y1="465" x2="321" y2="473" stroke="#C8A8C8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="335" y1="463" x2="338" y2="471" stroke="#C8A8C8" strokeWidth="2.5" strokeLinecap="round" />
      {/* Body */}
      <ellipse cx="321" cy="457" rx="21" ry="9" fill="#EDD8E8" stroke="#D4B8D8" strokeWidth="1.5" />
      <ellipse cx="321" cy="451" rx="19" ry="7.5" fill="#F6EBF6" stroke="#D4B8D8" strokeWidth="1" />
      {/* Lid */}
      <ellipse cx="321" cy="445" rx="15" ry="6" fill="#E3BAC6" stroke="#BC9EC1" strokeWidth="1.2" />
      <ellipse cx="321" cy="440" rx="11" ry="4.5" fill="#EDD8E8" stroke="#BC9EC1" strokeWidth="0.9" />
      {/* Knob */}
      <ellipse cx="321" cy="436" rx="5" ry="3.8" fill="#BC9EC1" />
      {/* Decorative rim dots */}
      <circle cx="312" cy="444" r="1.3" fill="#BC9EC1" opacity="0.45" />
      <circle cx="321" cy="443" r="1"   fill="#FDE8E9" opacity="0.7" />
      <circle cx="330" cy="444" r="1.3" fill="#BC9EC1" opacity="0.45" />
      {/* Tiny smoke vents on lid */}
      <circle cx="315" cy="440" r="0.9" fill="#9470A0" opacity="0.35" />
      <circle cx="321" cy="439" r="0.9" fill="#9470A0" opacity="0.35" />
      <circle cx="327" cy="440" r="0.9" fill="#9470A0" opacity="0.35" />

      {/* ── Smoke wisps (香煙) — organic curves that merge into circuit dashes ── */}
      {/* Main wisp — S-curve */}
      <path
        d="M 319,433 C 313,418 323,406 317,392 C 311,378 322,364 315,350 C 308,336 319,322 313,308"
        stroke="#D4B8D8" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.52"
      />
      {/* Right wisp */}
      <path
        d="M 324,432 C 330,416 320,403 327,389 C 334,375 323,362 330,348"
        stroke="#D4B8D8" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.38"
      />
      {/* Thin wisp — transitions into dashes, evoking data flow */}
      <path
        d="M 321,431 C 316,415 324,402 318,388"
        stroke="#E3BAC6" strokeWidth="0.9" strokeLinecap="round" strokeDasharray="4,4"
        fill="none" opacity="0.32"
      />
      {/* Wisp dissolving into circuit — the merge of incense & data */}
      <path
        d="M 313,308 L 285,308 L 285,285"
        stroke="#D4B8D8" strokeWidth="0.7" strokeDasharray="3,5"
        fill="none" opacity="0.22"
      />
      <circle cx="285" cy="308" r="2" fill="none" stroke="#D4B8D8" strokeWidth="0.8" opacity="0.28" />

      {/* ── Main branches (天 Heaven / 地 Earth / 人 Human) ── */}
      {/* 天 — tall main branch rising from kenzan */}
      <path
        d="M 194,451 C 196,386 201,312 207,238 C 212,168 218,104 213,38"
        stroke="#B090B8" strokeWidth="3.2" strokeLinecap="round"
      />
      {/* 地 — left branch (earth, lowest, widest) */}
      <path
        d="M 201,358 C 162,336 120,318 76,308"
        stroke="#BC9EC1" strokeWidth="2.1" strokeLinecap="round"
      />
      {/* 人 — right branch (human, mid-height) */}
      <path
        d="M 207,272 C 252,248 296,228 336,212"
        stroke="#BC9EC1" strokeWidth="1.9" strokeLinecap="round"
      />
      {/* Top-left twig */}
      <path
        d="M 213,38 C 196,23 182,13 172,6"
        stroke="#E3BAC6" strokeWidth="1.5" strokeLinecap="round"
      />
      {/* Top-right twig */}
      <path
        d="M 213,38 C 228,22 242,12 254,7"
        stroke="#E3BAC6" strokeWidth="1.5" strokeLinecap="round"
      />
      {/* Right sub-twig */}
      <path
        d="M 336,212 C 352,197 364,185 374,174"
        stroke="#E3BAC6" strokeWidth="1.2" strokeLinecap="round" opacity={0.72}
      />
      {/* Left trailing twig */}
      <path
        d="M 76,308 C 58,303 42,299 32,297"
        stroke="#E3BAC6" strokeWidth="1.1" strokeLinecap="round" opacity={0.58}
      />

      {/* ── Tech nodes at branch junctions (circuits meet nature) ── */}
      <circle cx="201" cy="358" r="4" fill="none" stroke="#BC9EC1" strokeWidth="0.9" opacity="0.42" />
      <circle cx="201" cy="358" r="1.5" fill="#BC9EC1" opacity="0.2" />
      <circle cx="207" cy="272" r="4" fill="none" stroke="#BC9EC1" strokeWidth="0.9" opacity="0.42" />
      <circle cx="207" cy="272" r="1.5" fill="#BC9EC1" opacity="0.2" />
      <circle cx="213" cy="38"  r="3.5" fill="none" stroke="#E3BAC6" strokeWidth="0.8" opacity="0.38" />
      {/* Dashed data-flow line along main branch axis */}
      <line
        x1="201" y1="358" x2="207" y2="272"
        stroke="#BC9EC1" strokeWidth="0.5" strokeDasharray="2,6" opacity="0.2"
      />
      {/* Node labels (tiny squares — chip-like) */}
      <rect x="197" y="354" width="8" height="8" rx="1.5" fill="none" stroke="#BC9EC1" strokeWidth="0.7" opacity="0.22" />
      <rect x="203" y="268" width="8" height="8" rx="1.5" fill="none" stroke="#BC9EC1" strokeWidth="0.7" opacity="0.22" />

      {/* ── Flowers ── */}
      {/* Crown of main stem (天) */}
      <Sakura x={213} y={40} size={1.12} petalColor="#E3BAC6" centerColor="#FDE8E9" rotate={14} />
      {/* Top-left twig tip */}
      <Sakura x={172} y={8} size={0.88} petalColor="#F2CCCE" centerColor="#FDE8E9" rotate={-20} />
      {/* Top-right twig tip */}
      <Sakura x={254} y={9} size={0.8} petalColor="#E3BAC6" centerColor="#FDE8E9" rotate={24} opacity={0.88} />
      {/* 地 branch tip */}
      <Sakura x={76} y={306} size={0.9} petalColor="#E3BAC6" centerColor="#FDE8E9" rotate={6} />
      {/* 人 branch tip */}
      <Sakura x={336} y={210} size={0.85} petalColor="#D4B8D8" centerColor="#FDE8E9" rotate={-14} />
      {/* Sub-twig tip */}
      <Sakura x={374} y={172} size={0.62} petalColor="#BC9EC1" centerColor="#E3BAC6" rotate={20} opacity={0.82} />
      {/* Node blooms (smaller, at junctions) */}
      <Sakura x={207} y={272} size={0.52} petalColor="#E3BAC6" centerColor="#FDE8E9" rotate={30} opacity={0.72} />
      <Sakura x={201} y={358} size={0.46} petalColor="#D4B8D8" centerColor="#FDE8E9" rotate={-24} opacity={0.68} />

      {/* ── Buds ── */}
      <SakuraBud x={158} y={412} size={0.9}  color="#E3BAC6" opacity={0.6} />
      <SakuraBud x={180} y={162} size={0.68} color="#D4B8D8" opacity={0.58} />
      <SakuraBud x={250} y={140} size={0.62} color="#BC9EC1" opacity={0.52} />
      <SakuraBud x={120} y={248} size={0.55} color="#E3BAC6" opacity={0.48} />

      {/* ── Falling petals ── */}
      <g transform="translate(284,186) rotate(-38)">
        <path d={sakuraPetalPath(0.52)} fill="#E3BAC6" opacity={0.42} />
      </g>
      <g transform="translate(143,148) rotate(64)">
        <path d={sakuraPetalPath(0.48)} fill="#BC9EC1" opacity={0.34} />
      </g>
      <g transform="translate(343,234) rotate(-24)">
        <path d={sakuraPetalPath(0.46)} fill="#E3BAC6" opacity={0.3} />
      </g>
      <g transform="translate(86,208) rotate(50)">
        <path d={sakuraPetalPath(0.48)} fill="#E3BAC6" opacity={0.38} />
      </g>
      <g transform="translate(236,122) rotate(-56)">
        <path d={sakuraPetalPath(0.4)} fill="#BC9EC1" opacity={0.28} />
      </g>
      <g transform="translate(382,168) rotate(34)">
        <path d={sakuraPetalPath(0.4)} fill="#E3BAC6" opacity={0.26} />
      </g>
      <g transform="translate(186,388) rotate(-44)">
        <path d={sakuraPetalPath(0.43)} fill="#E3BAC6" opacity={0.3} />
      </g>
      {/* A petal drifting near the smoke — digital-organic blend */}
      <g transform="translate(348,382) rotate(18)">
        <path d={sakuraPetalPath(0.38)} fill="#E3BAC6" opacity={0.24} />
      </g>
      <g transform="translate(60,328) rotate(-28)">
        <path d={sakuraPetalPath(0.4)} fill="#D4B8D8" opacity={0.28} />
      </g>
    </svg>
  );
}

/** Horizontal branch divider with sakura blossoms */
export function FloralDivider({ className }: SVGProps) {
  return (
    <svg
      viewBox="0 0 600 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 0,40 Q 100,30 200,40 Q 300,50 400,38 Q 500,26 600,40"
        stroke="#E3BAC6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Sakura x={200} y={40} size={0.5} petalColor="#E3BAC6" centerColor="#FDE8E9" />
      <Aoi x={400} y={38} size={0.48} petalColor="#BC9EC1" centerColor="#FDE8E9" />
      <g transform="translate(100,33) rotate(-22)">
        <path d={sakuraPetalPath(0.35)} fill="#E3BAC6" opacity={0.48} />
      </g>
      <g transform="translate(500,29) rotate(18)">
        <path d={aoiPetalPath(0.32)} fill="#BC9EC1" opacity={0.4} />
      </g>
      <g transform="translate(300,48) rotate(-10)">
        <path d={sakuraPetalPath(0.28)} fill="#E3BAC6" opacity={0.36} />
      </g>
    </svg>
  );
}

/** Small corner decoration */
export function FloralCorner({ className }: SVGProps) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 10,150 Q 40,100 70,70 Q 100,40 150,10"
        stroke="#E3BAC6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 10,150 Q 60,120 90,90"
        stroke="#BC9EC1"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.6}
      />
      <Sakura x={70} y={68} size={0.65} petalColor="#E3BAC6" centerColor="#FDE8E9" />
      <Aoi x={150} y={10} size={0.5} petalColor="#BC9EC1" centerColor="#FDE8E9" opacity={0.8} />
      <Sakura x={14} y={146} size={0.45} petalColor="#E3BAC6" centerColor="#FDE8E9" opacity={0.7} />
      <g transform="translate(112,45) rotate(-25)">
        <path d={sakuraPetalPath(0.35)} fill="#BC9EC1" opacity={0.42} />
      </g>
      <g transform="translate(50,112) rotate(40)">
        <path d={aoiPetalPath(0.3)} fill="#E3BAC6" opacity={0.38} />
      </g>
    </svg>
  );
}

/**
 * Logo mark — 1輪の桜でYを想起 × 六角スタメンで文化計算
 *
 * 5枚の花びらのうち「左上・右上・真下」の3枚をメインカラーで強調し
 * Y字を自然に想起させる。残り2枚は控えめな色で花の形を補完。
 * 花芯は六角形配置のスタメンドットで計算・論理回路を示唆。
 */
export function FlowerMark({ size = 32 }: { size?: number }) {
  // Y字を形成する3枚（左上324°・右上36°・真下180°）
  const yAngles = [324, 36, 180];
  // 補完する2枚（右下108°・左下252°）
  const fillAngles = [108, 252];

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* 家紋風の外枠 */}
      <circle cx="20" cy="20" r="18.5" stroke="#BC9EC1" strokeWidth="1.0" opacity={0.38} />

      {/* 補完の2枚（控えめ・背面） */}
      {fillAngles.map((angle) => (
        <g key={`f-${angle}`} transform={`translate(20,20) rotate(${angle})`}>
          <path d={sakuraPetalPath(0.72)} fill="#EDD5E2" opacity={0.52} />
        </g>
      ))}

      {/* Y字を形成するメインの3枚（前面） */}
      {yAngles.map((angle) => (
        <g key={`y-${angle}`} transform={`translate(20,20) rotate(${angle})`}>
          <path d={sakuraPetalPath(0.72)} fill="#E3BAC6" opacity={0.94} />
        </g>
      ))}

      {/* 花芯：六角形スタメン配置（文化計算・回路） */}
      <circle cx="20" cy="20" r="5.2" fill="#BC9EC1" opacity={0.12} />
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <circle
            key={`s-${a}`}
            cx={20 + Math.sin(rad) * 3.4}
            cy={20 - Math.cos(rad) * 3.4}
            r="0.85"
            fill="#BC9EC1"
            opacity={0.8}
          />
        );
      })}
      {/* 花芯中央 */}
      <circle cx="20" cy="20" r="2.0" fill="#BC9EC1" />
      <circle cx="20" cy="20" r="1.0" fill="#FDE8E9" />
    </svg>
  );
}

/** Small cherry blossom icon for research area cards */
export function SakuraIcon({
  size = 24,
  color = "#E3BAC6",
}: {
  size?: number;
  color?: string;
}) {
  const d = sakuraPetalPath(0.88);
  const sr = 8;

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((a) => (
        <g key={a} transform={`translate(24,24) rotate(${a})`}>
          <path d={d} fill={color} />
        </g>
      ))}
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a) => {
        const r = (a * Math.PI) / 180;
        return (
          <circle
            key={a}
            cx={24 + Math.sin(r) * sr}
            cy={24 - Math.cos(r) * sr}
            r={1.1}
            fill="#BC9EC1"
            opacity={0.6}
          />
        );
      })}
      <circle cx="24" cy="24" r="4.5" fill="#FDE8E9" />
      <circle cx="24" cy="24" r="2" fill={color} opacity={0.4} />
    </svg>
  );
}

/** Small hollyhock / aoi icon for research area cards */
export function AoiIcon({
  size = 24,
  color = "#D4B8D8",
}: {
  size?: number;
  color?: string;
}) {
  const d = aoiPetalPath(0.85);

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((a) => (
        <g key={a} transform={`translate(24,24) rotate(${a})`}>
          <path d={d} fill={color} />
        </g>
      ))}
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const r = (a * Math.PI) / 180;
        return (
          <circle
            key={a}
            cx={24 + Math.sin(r) * 3.5}
            cy={24 - Math.cos(r) * 3.5}
            r={0.9}
            fill="#BC9EC1"
            opacity={0.58}
          />
        );
      })}
      <circle cx="24" cy="24" r="4.5" fill="#FDE8E9" />
      <circle cx="24" cy="24" r="2" fill={color} opacity={0.4} />
    </svg>
  );
}
