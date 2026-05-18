import type { GameVariant, PlayerCount } from '../types/game';

/** Returns variants that support the selected player count. */
export function filterGamesByPlayerCount(
  games: GameVariant[],
  playerCount: PlayerCount,
): GameVariant[] {
  return games.filter((game) => game.playerCounts.includes(playerCount));
}
