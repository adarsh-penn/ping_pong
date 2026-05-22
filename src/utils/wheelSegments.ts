import type { GameVariant, WheelSegment } from '../types/game';
import { randomInt, shuffleArray } from './random';

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

  return shuffleArray(segments);
}

/**
 * Picks a game uniformly, then a random slice for that game.
 * Wheel layout is shuffled on build so spins are not tied to JSON order.
 */
export function pickRandomSegment(segments: WheelSegment[]): WheelSegment | null {
  if (segments.length === 0) return null;

  const byGame = new Map<string, WheelSegment[]>();
  for (const segment of segments) {
    const list = byGame.get(segment.game.id) ?? [];
    list.push(segment);
    byGame.set(segment.game.id, list);
  }

  const gameIds = [...byGame.keys()];
  const chosenId = gameIds[randomInt(gameIds.length)];
  if (!chosenId) return null;

  const slices = byGame.get(chosenId);
  if (!slices?.length) return null;

  return slices[randomInt(slices.length)] ?? null;
}
