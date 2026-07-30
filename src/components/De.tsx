import { geometryFor, Geometry } from "@/data/des";

// Flat inline-SVG emblem of each real-world die shape. The 3D feel comes from the
// CSS tumble on the wrapper (see index.css .de-solid), the same technique as the coin.
// Colours reuse the gold family so the die belongs to the coin's visual family.

const FILL = "hsl(43 74% 90%)";
const FILL2 = "hsl(43 74% 80%)";
const STROKE = "hsl(38 80% 38%)";
const FACET = "hsla(38, 80%, 45%, 0.35)";
const INK = "hsl(222 47% 15%)";

type Pt = [number, number];
const poly = (cx: number, cy: number, r: number, n: number, rotDeg = -90): Pt[] =>
  Array.from({ length: n }, (_, i) => {
    const a = (rotDeg + (360 / n) * i) * (Math.PI / 180);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as Pt;
  });
const pts = (p: Pt[]) => p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

const Numeral = ({ x, y, v, size = 34 }: { x: number; y: number; v: number; size?: number }) => (
  <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontFamily="Playfair Display, Georgia, serif"
    fontWeight={700} fontSize={size} fill={INK} className="de-value">
    {v}
  </text>
);

// d6 pip layout (which of the 9 grid slots are filled).
const PIPS: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
};

function shape(geometry: Geometry, faces: number, v: number) {
  switch (geometry) {
    case "coin":
      return (
        <g>
          <circle cx={60} cy={60} r={52} fill={FILL} stroke={STROKE} strokeWidth={3} />
          <circle cx={60} cy={60} r={44} fill="none" stroke={FACET} strokeWidth={2} />
          <Numeral x={60} y={62} v={v} />
        </g>
      );
    case "tetraedre": {
      const [a, b, c] = [[60, 12], [12, 104], [108, 104]] as Pt[];
      const cen: Pt = [60, 74];
      return (
        <g>
          <polygon points={pts([a, b, c])} fill={FILL} stroke={STROKE} strokeWidth={3} strokeLinejoin="round" />
          <polyline points={pts([a, cen])} fill="none" stroke={FACET} strokeWidth={2} />
          <polyline points={pts([b, cen])} fill="none" stroke={FACET} strokeWidth={2} />
          <polyline points={pts([c, cen])} fill="none" stroke={FACET} strokeWidth={2} />
          <Numeral x={60} y={50} v={v} size={30} />
        </g>
      );
    }
    case "cube": {
      const cell = (r: number, c: number) => <circle key={`${r}-${c}`} cx={30 + c * 30} cy={30 + r * 30} r={7.5} fill={INK} />;
      return (
        <g>
          <rect x={12} y={12} width={96} height={96} rx={18} fill={FILL} stroke={STROKE} strokeWidth={3} />
          <g className="de-value">{(PIPS[v] ?? []).map(([r, c]) => cell(r, c))}</g>
        </g>
      );
    }
    case "octaedre": {
      const o = [[60, 8], [112, 60], [60, 112], [8, 60]] as Pt[];
      return (
        <g>
          <polygon points={pts(o)} fill={FILL} stroke={STROKE} strokeWidth={3} strokeLinejoin="round" />
          <line x1={8} y1={60} x2={112} y2={60} stroke={FACET} strokeWidth={2} />
          <line x1={60} y1={8} x2={60} y2={112} stroke={FACET} strokeWidth={2} />
          <Numeral x={60} y={44} v={v} size={26} />
        </g>
      );
    }
    case "dodecaedre": {
      const outer = poly(60, 62, 52, 5, -90);
      const inner = poly(60, 62, 24, 5, 90);
      return (
        <g>
          <polygon points={pts(outer)} fill={FILL} stroke={STROKE} strokeWidth={3} strokeLinejoin="round" />
          <polygon points={pts(inner)} fill={FILL2} stroke={FACET} strokeWidth={2} />
          {outer.map((p, i) => (
            <line key={i} x1={p[0]} y1={p[1]} x2={inner[i][0]} y2={inner[i][1]} stroke={FACET} strokeWidth={1.5} />
          ))}
          <Numeral x={60} y={64} v={v} size={26} />
        </g>
      );
    }
    case "icosaedre": {
      const hex = poly(60, 60, 54, 6, -90);
      const up = [[60, 30], [30, 82], [90, 82]] as Pt[];
      return (
        <g>
          <polygon points={pts(hex)} fill={FILL} stroke={STROKE} strokeWidth={3} strokeLinejoin="round" />
          <polygon points={pts(up)} fill={FILL2} stroke={FACET} strokeWidth={1.5} />
          {[hex[0], hex[2], hex[4]].map((p, i) => (
            <line key={i} x1={p[0]} y1={p[1]} x2={up[i][0]} y2={up[i][1]} stroke={FACET} strokeWidth={1.5} />
          ))}
          <Numeral x={60} y={66} v={v} size={26} />
        </g>
      );
    }
    case "trapezoedre": {
      const kite = [[60, 8], [104, 42], [96, 76], [60, 112], [24, 76], [16, 42]] as Pt[];
      return (
        <g>
          <polygon points={pts(kite)} fill={FILL} stroke={STROKE} strokeWidth={3} strokeLinejoin="round" />
          <polyline points={pts([[16, 42], [40, 56], [60, 44], [80, 56], [104, 42]] as Pt[])} fill="none" stroke={FACET} strokeWidth={2} />
          <line x1={60} y1={44} x2={60} y2={112} stroke={FACET} strokeWidth={1.5} />
          <Numeral x={60} y={62} v={v} size={26} />
        </g>
      );
    }
    // Prisms (3, 5, 7, 9): honest extruded prism, value on the end-cap whose side count = the shape.
    default: {
      const sides = geometry === "prisme-3" ? 3 : geometry === "prisme-5" ? 3 : geometry === "prisme-7" ? 5 : 9;
      const rounded = geometry === "prisme-3";
      const front = poly(44, 64, 30, sides, -90);
      const dx = 40;
      const dy = -10;
      const back: Pt[] = front.map(([x, y]) => [x + dx, y + dy]);
      return (
        <g strokeLinejoin={rounded ? "round" : "miter"}>
          <polygon points={pts(back)} fill={FILL2} stroke={STROKE} strokeWidth={2.5} />
          {front.map((p, i) => {
            const j = (i + 1) % front.length;
            return <polygon key={i} points={pts([p, front[j], back[j], back[i]])} fill={FILL} stroke={FACET} strokeWidth={1.5} />;
          })}
          <polygon points={pts(front)} fill={FILL} stroke={STROKE} strokeWidth={3} />
          <Numeral x={44} y={66} v={v} size={26} />
        </g>
      );
    }
  }
}

export interface DeProps {
  faces: number;
  valeur: number;
  rolling?: boolean;
  index?: number; // stagger position on multi-dice pages
  size?: number;
}

export const De = ({ faces, valeur, rolling = false, index = 0, size = 132 }: DeProps) => {
  // d100 is physically two d10s: tens + units.
  if (faces === 100) {
    const tens = valeur % 100 === 0 ? "00" : String(Math.floor((valeur % 100) / 10) * 10).padStart(2, "0");
    const units = String(valeur % 10);
    return (
      <div className="de-scene" style={{ gap: 6 }}>
        <D10 label={tens} rolling={rolling} index={index} size={size * 0.72} />
        <D10 label={units} rolling={rolling} index={index + 1} size={size * 0.72} />
      </div>
    );
  }
  const g = geometryFor(faces);
  return (
    <div className="de-scene">
      <div
        className={`de-solid ${rolling ? "rolling" : ""}`}
        style={{ width: size, height: size, animationDelay: `${index * 70}ms` }}
      >
        <svg viewBox="0 0 120 120" width={size} height={size} role="presentation" aria-hidden="true">
          {shape(g, faces, valeur)}
        </svg>
      </div>
    </div>
  );
};

// A single d10 kite showing an arbitrary label (used by d100 for tens/units).
const D10 = ({ label, rolling, index, size }: { label: string; rolling: boolean; index: number; size: number }) => {
  const kite = [[60, 8], [104, 42], [96, 76], [60, 112], [24, 76], [16, 42]] as Pt[];
  return (
    <div className={`de-solid ${rolling ? "rolling" : ""}`} style={{ width: size, height: size, animationDelay: `${index * 70}ms` }}>
      <svg viewBox="0 0 120 120" width={size} height={size} role="presentation" aria-hidden="true">
        <polygon points={pts(kite)} fill={FILL} stroke={STROKE} strokeWidth={3} strokeLinejoin="round" />
        <polyline points={pts([[16, 42], [40, 56], [60, 44], [80, 56], [104, 42]] as Pt[])} fill="none" stroke={FACET} strokeWidth={2} />
        <text x={60} y={64} textAnchor="middle" dominantBaseline="central" fontFamily="Playfair Display, Georgia, serif"
          fontWeight={700} fontSize={26} fill={INK} className="de-value">{label}</text>
      </svg>
    </div>
  );
};
