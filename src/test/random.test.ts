import { describe, it, expect } from "vitest";
import { parseParams, slugFor, drawNumbers } from "@/lib/random";

describe("parseParams", () => {
  it("parses a valid preset URL", () => {
    expect(parseParams("1-tirage", "minimum-1", "maximum-10")).toEqual({ draws: 1, min: 1, max: 10 });
  });
  it("accepts negative minimum", () => {
    expect(parseParams("2-tirage", "minimum--5", "maximum-5")).toEqual({ draws: 2, min: -5, max: 5 });
  });
  it("rejects min >= max, bad shape, and out-of-range draws", () => {
    expect(parseParams("1-tirage", "minimum-10", "maximum-1")).toBeNull();
    expect(parseParams("1-tirage", "minimum-5", "maximum-5")).toBeNull();
    expect(parseParams("x", "minimum-1", "maximum-10")).toBeNull();
    expect(parseParams("0-tirage", "minimum-1", "maximum-10")).toBeNull();
  });
  it("round-trips through slugFor", () => {
    const cfg = { draws: 5, min: 1, max: 49 };
    const [tirage, minimum, maximum] = slugFor(cfg).split("/").slice(2);
    expect(parseParams(tirage, minimum, maximum)).toEqual(cfg);
  });
});

describe("drawNumbers", () => {
  it("stays within inclusive bounds and returns the requested count", () => {
    for (let i = 0; i < 500; i++) {
      const out = drawNumbers({ draws: 3, min: 1, max: 6 });
      expect(out).toHaveLength(3);
      for (const n of out) expect(n >= 1 && n <= 6).toBe(true);
    }
  });
  it("can hit both bounds over many draws", () => {
    const out = drawNumbers({ draws: 2000, min: 1, max: 2 });
    expect(out).toContain(1);
    expect(out).toContain(2);
  });
});
