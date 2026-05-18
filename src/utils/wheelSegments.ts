import type { GameVariant, WheelSegment } from '../types/game';

/** Expands games into wheel slices (e.g. Foundation → 2 adjacent segments). */
export function expandToWheelSegments(games: GameVariant[]): WheelSegment[] {
  const segments: WheelSegment[] = [];

  for (const game of games) {
    const count = Math.max(1, Math.floor(game.wheelSlices));
    for (let sliceIndex = 0; sliceIndex < count; sliceIndex += 1) {
      segments.push({
        key: count > 1 ? `${game.id}:${sliceIndex}` : game.id,
        sliceIndex,
        game,
      });
    }
  }

  return segments;
}

/** Uniform random slice — duplicate slices naturally double odds. */
export function pickRandomSegment(segments: WheelSegment[]): WheelSegment | null {
  if (segments.length === 0) return null;
  const index = Math.floor(Math.random() * segments.length);
  return segments[index] ?? null;
}
