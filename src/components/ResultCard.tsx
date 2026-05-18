import type { GameVariant, PlayerCount } from '../types/game';

interface ResultCardProps {
  game: GameVariant;
  playerCount: PlayerCount;
  visible: boolean;
}

export function ResultCard({ game, playerCount, visible }: ResultCardProps) {
  if (!visible) return null;

  return (
    <article
      className="result-card result-card--visible"
      aria-live="polite"
    >
      <p className="result-card__eyebrow">Current Variants Rules</p>
      <h2 className="result-card__title">{game.name}</h2>
      <p className="result-card__tagline">{game.tagline}</p>
      <p className="result-card__meta">{playerCount} players</p>
      <h3 className="result-card__rules-heading">Rules</h3>
      <ul className="result-card__rules">
        {game.rules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
    </article>
  );
}
