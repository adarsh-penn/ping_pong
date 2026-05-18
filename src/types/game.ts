export type PlayerCount = 2 | 4 | 6;

export const PLAYER_COUNTS: PlayerCount[] = [2, 4, 6];

export interface GameVariant {
  id: string;
  name: string;
  playerCounts: PlayerCount[];
  /** How many slices this variant occupies on the wheel (e.g. 2 for Foundation). */
  wheelSlices: number;
  tagline: string;
  rules: string[];
}

export interface WheelSegment {
  key: string;
  sliceIndex: number;
  game: GameVariant;
}
