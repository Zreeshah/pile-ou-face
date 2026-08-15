import presets from "@/data/randomPresets.json";
import { secureRandomInt } from "@/lib/secureRandom";

export type RandomConfig = { draws: number; min: number; max: number };

export const DEFAULT_CONFIG: RandomConfig = { draws: 1, min: 1, max: 100 };

// ponytail: bounds keep prerendered/preset URLs sane; raise if a real use case needs bigger.
const MAX_DRAWS = 100;
const VALUE_LIMIT = 1_000_000;

export const PRESETS = presets as RandomConfig[];

// URL: /nombre-aleatoire/1-tirage/minimum-1/maximum-10
export const slugFor = ({ draws, min, max }: RandomConfig) =>
  `/nombre-aleatoire/${draws}-tirage/minimum-${min}/maximum-${max}`;

// Parse the three URL segments; returns null when anything is off so the route can 404.
export function parseParams(
  tirage?: string,
  minimum?: string,
  maximum?: string,
): RandomConfig | null {
  const draws = Number(tirage?.match(/^(\d+)-tirage$/)?.[1]);
  const min = Number(minimum?.match(/^minimum-(-?\d+)$/)?.[1]);
  const max = Number(maximum?.match(/^maximum-(-?\d+)$/)?.[1]);
  if (![draws, min, max].every(Number.isInteger)) return null;
  if (draws < 1 || draws > MAX_DRAWS) return null;
  if (min >= max) return null;
  if (Math.abs(min) > VALUE_LIMIT || Math.abs(max) > VALUE_LIMIT) return null;
  return { draws, min, max };
}

export function metaFor({ draws, min, max }: RandomConfig) {
  if (draws > 1) {
    return {
      h1: `Tirer ${draws} nombres au hasard entre ${min} et ${max}`,
      title: `${draws} nombres aléatoires entre ${min} et ${max}`,
      description: `Générez ${draws} nombres aléatoires entre ${min} et ${max} en un clic. Tirage multiple uniforme, gratuit et instantané, sans inscription.`,
    };
  }
  return {
    h1: `Tirer un nombre au hasard entre ${min} et ${max}`,
    title: `Nombre aléatoire entre ${min} et ${max}`,
    description: `Tirez un nombre au hasard entre ${min} et ${max} en un clic. Générateur de nombre aléatoire uniforme, gratuit et instantané, sans inscription.`,
  };
}

export function drawNumbers({ draws, min, max }: RandomConfig): number[] {
  return Array.from(
    { length: draws },
    () => min + secureRandomInt(max - min + 1),
  );
}
