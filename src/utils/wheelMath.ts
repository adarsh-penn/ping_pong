/** Segment count and index → final rotation (deg) for a smooth extra spin. */
export function computeTargetRotation(
  currentRotation: number,
  selectedIndex: number,
  segmentCount: number,
  minFullSpins = 5,
): number {
  if (segmentCount <= 0) return currentRotation;

  const segmentAngle = 360 / segmentCount;
  const currentMod = ((currentRotation % 360) + 360) % 360;
  const targetMod = (360 - (selectedIndex + 0.5) * segmentAngle) % 360;

  let delta = targetMod - currentMod;
  if (delta <= 0) delta += 360;

  return currentRotation + 360 * minFullSpins + delta;
}
