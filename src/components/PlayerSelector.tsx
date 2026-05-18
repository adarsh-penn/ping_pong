import type { PlayerCount } from '../types/game';
import { PLAYER_COUNTS } from '../types/game';

interface PlayerSelectorProps {
  value: PlayerCount;
  onChange: (count: PlayerCount) => void;
  disabled?: boolean;
}

export function PlayerSelector({ value, onChange, disabled }: PlayerSelectorProps) {
  return (
    <div className="player-selector" role="group" aria-label="Number of players">
      <span className="player-selector__label">How many players?</span>
      <div className="player-selector__options">
        {PLAYER_COUNTS.map((count) => (
          <button
            key={count}
            type="button"
            className={`player-selector__btn${value === count ? ' player-selector__btn--active' : ''}`}
            onClick={() => onChange(count)}
            disabled={disabled}
            aria-pressed={value === count}
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  );
}
