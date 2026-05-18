import gamesJson from './games.json';
import type { GameVariant, PlayerCount } from '../types/game';

function isPlayerCount(value: number): value is PlayerCount {
  return value === 2 || value === 4 || value === 6;
}

/** Validates and normalizes raw JSON into typed game variants. */
export function loadGames(): GameVariant[] {
  const raw = gamesJson as GameVariant[];

  return raw.map((entry) => ({
    ...entry,
    playerCounts: entry.playerCounts.filter(isPlayerCount),
    wheelSlices: entry.wheelSlices > 0 ? Math.floor(entry.wheelSlices) : 1,
  }));
}
