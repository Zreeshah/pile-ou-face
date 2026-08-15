const UINT32_RANGE = 0x1_0000_0000;

/**
 * Return a uniformly distributed integer in [0, maxExclusive).
 * Rejection sampling avoids the modulo bias introduced when the requested
 * range does not divide the 32-bit source range exactly.
 */
export function secureRandomInt(maxExclusive: number): number {
  if (!Number.isSafeInteger(maxExclusive) || maxExclusive < 1 || maxExclusive > UINT32_RANGE) {
    throw new RangeError("maxExclusive must be an integer between 1 and 2^32");
  }

  const cryptoApi = globalThis.crypto;
  if (!cryptoApi?.getRandomValues) {
    throw new Error("Secure random values are unavailable in this browser");
  }

  const rejectionLimit = UINT32_RANGE - (UINT32_RANGE % maxExclusive);
  const sample = new Uint32Array(1);
  do {
    cryptoApi.getRandomValues(sample);
  } while (sample[0] >= rejectionLimit);

  return sample[0] % maxExclusive;
}

export const secureCoinFlip = () => secureRandomInt(2) === 0;
