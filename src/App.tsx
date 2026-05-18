import { useMemo, useState } from 'react';
import { PlayerSelector } from './components/PlayerSelector';
import { SpinWheel } from './components/SpinWheel';
import { SpinButton } from './components/SpinButton';
import { ResultCard } from './components/ResultCard';
import { ChaptersRulesModal } from './components/ChaptersRulesModal';
import { loadGames } from './data/loadGames';
import { filterGamesByPlayerCount } from './utils/filterGames';
import type { PlayerCount } from './types/game';
import { useWheelSpin } from './hooks/useWheelSpin';
import './App.css';

const ALL_GAMES = loadGames();

function App() {
  const [playerCount, setPlayerCount] = useState<PlayerCount>(4);
  const [rulesOpen, setRulesOpen] = useState(false);

  const eligibleGames = useMemo(
    () => filterGamesByPlayerCount(ALL_GAMES, playerCount),
    [playerCount],
  );

  const {
    segments,
    rotation,
    isSpinning,
    selectedGame,
    selectedSegmentKey,
    spin,
    resetResult,
  } = useWheelSpin({ games: eligibleGames });

  const handlePlayerChange = (count: PlayerCount) => {
    setPlayerCount(count);
    resetResult();
  };

  const canSpin = segments.length > 0 && !isSpinning;

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Bing Bong Wheel</h1>
        <p className="app__subtitle">
          Pick your crew, spin the wheel, and play a random table tennis variant.
        </p>
      </header>

      <PlayerSelector
        value={playerCount}
        onChange={handlePlayerChange}
        disabled={isSpinning}
      />

      <main className="app__main">
        <SpinWheel
          segments={segments}
          rotation={rotation}
          isSpinning={isSpinning}
          selectedSegmentKey={selectedSegmentKey}
        />

        <div className="app__actions">
          <SpinButton onClick={spin} disabled={!canSpin} />
          <button
            type="button"
            className="chapters-btn"
            onClick={() => setRulesOpen(true)}
          >
            Chapters and Rules
          </button>
        </div>

        {selectedGame && (
          <ResultCard
            game={selectedGame}
            playerCount={playerCount}
            visible={!isSpinning}
          />
        )}
      </main>

      <footer className="app__footer">
        Rules from the Custom Bing Bong Rulebook · data-driven wheel
      </footer>

      {rulesOpen ? (
        <ChaptersRulesModal onClose={() => setRulesOpen(false)} />
      ) : null}
    </div>
  );
}

export default App;
