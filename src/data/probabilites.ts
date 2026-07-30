// Single source of truth for the coin-flip binomial probability cluster.
// Matrix: n = total flips (1..10), k = number of heads (0..n).
// Every value is COMPUTED from the binomial law, never hardcoded.
// Only entries flagged `publish: true` get a route + sitemap entry.

export const LAST_UPDATED = "2026-07-30";

export type Priority = "high" | "low";

export interface Probabilite {
  n: number;
  k: number;
  slug: string; // "5-lancers/3-piles"
  probability: number; // C(n,k) * 0.5^n
  percentage: string; // "31,25 %" — French formatting, comma decimal
  fraction: string; // "10/32" (unsimplified: C(n,k) / 2^n)
  publish: boolean;
  priority: Priority;
}

const N_MAX = 10;

// Exact integer binomial coefficient (n <= 10, no float error).
export function binomial(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  k = Math.min(k, n - k);
  let c = 1;
  for (let i = 0; i < k; i++) c = (c * (n - i)) / (i + 1);
  return Math.round(c);
}

// C(n,k) * 0.5^n. 0.5^n is an exact power of two in IEEE-754, so this is exact.
export function probabilityOf(n: number, k: number): number {
  return binomial(n, k) * Math.pow(0.5, n);
}

// French percentage: 2 decimals, trailing zeros trimmed, comma decimal separator.
export function formatPercent(probability: number): string {
  const pct = Math.round(probability * 100 * 100) / 100;
  return `${String(pct).replace(".", ",")} %`;
}

export const slugFor = (n: number, k: number) => `${n}-lancers/${k}-piles`;
export const pathFor = (n: number, k: number) =>
  `/probabilite-pile-ou-face/${slugFor(n, k)}`;

// Pairs validated by keyword research; everything else stays unpublished until flagged.
// Demand clusters: streaks ("X piles de suite", k=n) and exact-half ("k sur 2k").
const PUBLISHED = new Set([
  // majority / mixed
  "3-2",
  "4-2",
  "5-3",
  // exact half (k sur 2k)
  "2-2", // 2 sur 2 is also the first streak; counted once
  "6-3",
  "10-5",
  // streaks (k = n, "X piles de suite")
  "3-3",
  "4-4",
  "5-5",
  "6-6",
  "7-7",
  "10-10",
]);

function buildMatrix(): Probabilite[] {
  const rows: Probabilite[] = [];
  for (let n = 1; n <= N_MAX; n++) {
    for (let k = 0; k <= n; k++) {
      const probability = probabilityOf(n, k);
      const publish = PUBLISHED.has(`${n}-${k}`);
      rows.push({
        n,
        k,
        slug: slugFor(n, k),
        probability,
        percentage: formatPercent(probability),
        fraction: `${binomial(n, k)}/${Math.pow(2, n)}`,
        publish,
        priority: publish ? "high" : "low",
      });
    }
  }
  return rows;
}

export const probabilites: Probabilite[] = buildMatrix();

export const publishedProbabilites: Probabilite[] = probabilites.filter(
  (p) => p.publish,
);

export function getProbabilite(n: number, k: number): Probabilite | undefined {
  return probabilites.find((p) => p.n === n && p.k === k);
}

// All k rows for one n (0..n), for distribution charts and sibling blocks.
export function rowsForN(n: number): Probabilite[] {
  return probabilites.filter((p) => p.n === n);
}

export const N_VALUES = Array.from({ length: N_MAX }, (_, i) => i + 1);
