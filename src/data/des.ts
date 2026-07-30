// Single source of truth for the dice cluster: single-face dice + multi-dice combos.
// Geometry is fixed per face count (see the real-world die shapes). Sum distributions
// for multi-dice are computed by convolution, never hardcoded.
import { formatPercent } from "@/data/probabilites";

export const LAST_UPDATED = "2026-07-30";

export type Geometry =
  | "coin"
  | "prisme-3"
  | "tetraedre"
  | "prisme-5"
  | "cube"
  | "prisme-7"
  | "octaedre"
  | "prisme-9"
  | "trapezoedre"
  | "dodecaedre"
  | "icosaedre"
  | "d100";

// Real-world shape for each face count.
export const GEOMETRY: Record<number, Geometry> = {
  2: "coin",
  3: "prisme-3",
  4: "tetraedre",
  5: "prisme-5",
  6: "cube",
  7: "prisme-7",
  8: "octaedre",
  9: "prisme-9",
  10: "trapezoedre",
  12: "dodecaedre",
  20: "icosaedre",
  100: "d100",
};

export const GEOMETRY_LABEL: Record<Geometry, string> = {
  coin: "pièce à deux faces",
  "prisme-3": "prisme triangulaire",
  tetraedre: "tétraèdre",
  "prisme-5": "prisme triangulaire à 5 faces",
  cube: "cube",
  "prisme-7": "prisme pentagonal",
  octaedre: "octaèdre",
  "prisme-9": "prisme à 9 faces",
  trapezoedre: "trapézoèdre pentagonal",
  dodecaedre: "dodécaèdre",
  icosaedre: "icosaèdre",
  d100: "deux dés à dix faces",
};

export const geometryFor = (faces: number): Geometry => GEOMETRY[faces] ?? "cube";

export const ALL_FACES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 20, 100];

// 6 faces already lives at /de-en-ligne, so no standalone /de-6-faces (avoid a duplicate).
const PUBLISHED_SINGLE = new Set([2, 3, 4, 5, 7, 8, 9, 10, 12, 20, 100]);

// Curated popular multi-dice combos [count, faces].
const MULTI: [number, number][] = [
  [2, 6],
  [3, 6],
  [4, 6],
  [2, 10],
  [2, 20],
  [2, 4],
];

export const singleSlug = (faces: number) => `de-${faces}-faces`;
export const singlePath = (faces: number) => `/de-en-ligne/${singleSlug(faces)}`;
export const multiSlug = (count: number, faces: number) => `${count}-des-${faces}-faces`;
export const multiPath = (count: number, faces: number) => `/de-en-ligne/${multiSlug(count, faces)}`;

export interface DeSingle {
  kind: "single";
  faces: number;
  geometry: Geometry;
  slug: string;
  path: string;
  min: number;
  max: number;
}
export interface DeMulti {
  kind: "multi";
  count: number;
  faces: number;
  slug: string;
  path: string;
  min: number;
  max: number;
}

export const singleOf = (faces: number): DeSingle => ({
  kind: "single",
  faces,
  geometry: geometryFor(faces),
  slug: singleSlug(faces),
  path: singlePath(faces),
  min: 1,
  max: faces,
});

export const multiOf = (count: number, faces: number): DeMulti => ({
  kind: "multi",
  count,
  faces,
  slug: multiSlug(count, faces),
  path: multiPath(count, faces),
  min: count,
  max: count * faces,
});

export const publishedSingles: DeSingle[] = [...PUBLISHED_SINGLE].sort((a, b) => a - b).map(singleOf);
export const publishedMulti: DeMulti[] = MULTI.map(([c, f]) => multiOf(c, f));

// Route paths the prerender + sitemap consume (threaded via entry-server).
export const publishedDeRoutes: { path: string }[] = [
  ...publishedSingles.map((d) => ({ path: d.path })),
  ...publishedMulti.map((d) => ({ path: d.path })),
];

// Parse the URL segment after /de-en-ligne/. Returns null when unpublished/invalid.
export function parseDeConfig(config?: string): DeSingle | DeMulti | null {
  const single = config?.match(/^de-(\d+)-faces$/);
  if (single) {
    const faces = Number(single[1]);
    return PUBLISHED_SINGLE.has(faces) ? singleOf(faces) : null;
  }
  const multi = config?.match(/^(\d+)-des-(\d+)-faces$/);
  if (multi) {
    const count = Number(multi[1]);
    const faces = Number(multi[2]);
    return MULTI.some(([c, f]) => c === count && f === faces) ? multiOf(count, faces) : null;
  }
  return null;
}

// One fair roll. ponytail: Math.random is fine for a game/decision die, not cryptographic.
export const rollValue = (faces: number) => 1 + Math.floor(Math.random() * faces);
export const rollMany = (count: number, faces: number) =>
  Array.from({ length: count }, () => rollValue(faces));

export interface SumRow {
  sum: number;
  probability: number;
  percentage: string;
}

// Probability of each possible sum for `count` dice of `faces` faces, by convolution.
export function sumDistribution(count: number, faces: number): SumRow[] {
  let dist = [1]; // dist[s] = P(sum = s); start at "0 dice, sum 0"
  for (let d = 0; d < count; d++) {
    const next = new Array(dist.length + faces).fill(0);
    for (let s = 0; s < dist.length; s++) {
      if (!dist[s]) continue;
      for (let f = 1; f <= faces; f++) next[s + f] += dist[s] / faces;
    }
    dist = next;
  }
  const rows: SumRow[] = [];
  for (let s = count; s <= count * faces; s++) {
    rows.push({ sum: s, probability: dist[s], percentage: formatPercent(dist[s]) });
  }
  return rows;
}
