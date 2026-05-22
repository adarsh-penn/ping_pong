/** Unbiased integer in [0, maxExclusive) using crypto when available. */
export function randomInt(maxExclusive: number): number {
  if (maxExclusive <= 0) return 0;
  if (maxExclusive === 1) return 0;

  const cryptoObj = globalThis.crypto;
  if (cryptoObj?.getRandomValues) {
    const range = maxExclusive;
    const maxUint32 = 0xffffffff;
    const limit = maxUint32 - (maxUint32 % range);
    const buf = new Uint32Array(1);
    do {
      cryptoObj.getRandomValues(buf);
    } while (buf[0] >= limit);
    return buf[0] % range;
  }

  return Math.floor(Math.random() * maxExclusive);
}

/** Float in [0, 1). */
export function randomFloat(): number {
  const cryptoObj = globalThis.crypto;
  if (cryptoObj?.getRandomValues) {
    const buf = new Uint32Array(1);
    cryptoObj.getRandomValues(buf);
    return buf[0] / (0xffffffff + 1);
  }
  return Math.random();
}

/** Fisher–Yates shuffle (new array). */
export function shuffleArray<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    const tmp = arr[i];
    arr[i] = arr[j]!;
    arr[j] = tmp!;
  }
  return arr;
}
