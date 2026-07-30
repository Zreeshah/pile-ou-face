import { describe, it, expect } from "vitest";
import {
  sumDistribution, parseDeConfig, geometryFor, publishedDeRoutes, rollValue,
} from "@/data/des";

describe("sumDistribution", () => {
  it("2d6 matches the classic 36-outcome table", () => {
    const rows = sumDistribution(2, 6);
    expect(rows[0]).toMatchObject({ sum: 2 });
    expect(rows[rows.length - 1].sum).toBe(12);
    const p = (s: number) => rows.find((r) => r.sum === s)!.probability;
    expect(p(7)).toBeCloseTo(6 / 36, 12); // most likely sum
    expect(p(2)).toBeCloseTo(1 / 36, 12);
    expect(p(12)).toBeCloseTo(1 / 36, 12);
    expect(rows.reduce((a, r) => a + r.probability, 0)).toBeCloseTo(1, 12);
  });
  it("3d6 spans 3..18 and sums to 1", () => {
    const rows = sumDistribution(3, 6);
    expect(rows[0].sum).toBe(3);
    expect(rows[rows.length - 1].sum).toBe(18);
    expect(rows.reduce((a, r) => a + r.probability, 0)).toBeCloseTo(1, 12);
  });
});

describe("geometryFor", () => {
  it("maps face counts to the right real-world solid", () => {
    expect(geometryFor(2)).toBe("coin");
    expect(geometryFor(6)).toBe("cube");
    expect(geometryFor(4)).toBe("tetraedre");
    expect(geometryFor(20)).toBe("icosaedre");
    expect(geometryFor(100)).toBe("d100");
    expect(geometryFor(7)).toBe("prisme-7"); // NOT an icosahedron
  });
});

describe("parseDeConfig", () => {
  it("parses published single and multi configs", () => {
    expect(parseDeConfig("de-20-faces")).toMatchObject({ kind: "single", faces: 20 });
    expect(parseDeConfig("2-des-6-faces")).toMatchObject({ kind: "multi", count: 2, faces: 6 });
  });
  it("rejects unpublished / malformed configs", () => {
    expect(parseDeConfig("de-6-faces")).toBeNull(); // 6 lives at /de-en-ligne
    expect(parseDeConfig("de-13-faces")).toBeNull();
    expect(parseDeConfig("5-des-6-faces")).toBeNull(); // not a curated combo
    expect(parseDeConfig("garbage")).toBeNull();
  });
});

describe("rollValue", () => {
  it("stays within 1..faces", () => {
    for (let i = 0; i < 500; i++) {
      const v = rollValue(20);
      expect(v >= 1 && v <= 20).toBe(true);
    }
  });
});

describe("publishedDeRoutes", () => {
  it("covers 11 singles + 6 multi", () => {
    expect(publishedDeRoutes).toHaveLength(17);
  });
});
