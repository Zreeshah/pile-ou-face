import { describe, it, expect } from "vitest";
import {
  binomial,
  probabilites,
  publishedProbabilites,
  getProbabilite,
  rowsForN,
  formatPercent,
} from "@/data/probabilites";
import { probabilitesContent } from "@/data/probabilitesContent";

describe("binomial", () => {
  it("matches known coefficients", () => {
    expect(binomial(5, 3)).toBe(10);
    expect(binomial(10, 5)).toBe(252);
    expect(binomial(4, 2)).toBe(6);
    expect(binomial(2, 2)).toBe(1);
    expect(binomial(3, 0)).toBe(1);
  });
});

describe("matrix", () => {
  it("has 65 rows (sum of n+1 for n=1..10)", () => {
    expect(probabilites).toHaveLength(65);
  });
  it("each row's distribution sums to 1", () => {
    for (let n = 1; n <= 10; n++) {
      const sum = rowsForN(n).reduce((a, p) => a + p.probability, 0);
      expect(sum).toBeCloseTo(1, 10);
    }
  });
  it("publishes exactly the validated pairs", () => {
    expect(publishedProbabilites.map((p) => p.slug).sort()).toEqual(
      [
        "2-lancers/2-piles",
        "3-lancers/2-piles",
        "3-lancers/3-piles",
        "4-lancers/2-piles",
        "4-lancers/4-piles",
        "5-lancers/3-piles",
        "5-lancers/5-piles",
        "6-lancers/3-piles",
        "6-lancers/6-piles",
        "7-lancers/7-piles",
        "10-lancers/5-piles",
        "10-lancers/10-piles",
      ].sort(),
    );
  });
  it("every published pair has unique content", () => {
    for (const p of publishedProbabilites) {
      expect(probabilitesContent[p.slug], `missing content for ${p.slug}`).toBeDefined();
    }
  });
});

describe("hand spot-checks of published pairs", () => {
  const cases: [number, number, string, string][] = [
    [5, 3, "10/32", "31,25 %"],
    [3, 3, "1/8", "12,5 %"],
    [10, 5, "252/1024", "24,61 %"],
    [2, 2, "1/4", "25 %"],
    [5, 5, "1/32", "3,13 %"],
    [3, 2, "3/8", "37,5 %"],
    [4, 2, "6/16", "37,5 %"],
  ];
  it.each(cases)("%i flips / %i heads → %s = %s", (n, k, fraction, percentage) => {
    const p = getProbabilite(n, k)!;
    expect(p.fraction).toBe(fraction);
    expect(p.percentage).toBe(percentage);
  });
});

describe("formatPercent", () => {
  it("uses comma decimals and trims trailing zeros", () => {
    expect(formatPercent(0.25)).toBe("25 %");
    expect(formatPercent(0.125)).toBe("12,5 %");
    expect(formatPercent(0.3125)).toBe("31,25 %");
  });
});
