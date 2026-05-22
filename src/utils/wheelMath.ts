import { randomFloat, randomInt } from './random';

/** Segment count and index → final rotation (deg) for a smooth extra spin. */
export function computeTargetRotation(
  currentRotation: number,
  selectedIndex: number,
  segmentCount: number,
): number {
  if (segmentCount <= 0) return currentRotation;

  const segmentAngle = 360 / segmentCount;
  const currentMod = ((currentRotation % 360) + 360) % 360;

  const jitter = (randomFloat() - 0.5) * segmentAngle * 0.85;
  const targetMod =
    (360 - (selectedIndex + 0.5) * segmentAngle + jitter + 360) % 360;

  let delta = targetMod - currentMod;
  if (delta <= 0) delta += 360;

  const fullSpins = 4 + randomInt(4);
  return currentRotation + 360 * fullSpins + delta;
}
