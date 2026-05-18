import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import type { GameVariant, WheelSegment } from '../types/game';
import { expandToWheelSegments, pickRandomSegment } from '../utils/wheelSegments';
import { computeTargetRotation } from '../utils/wheelMath';
import { playWinSound, startWheelSpinSound, stopWheelSpinSound } from '../utils/sounds';

const SPIN_DURATION_MS = 4500;

interface UseWheelSpinOptions {
  games: GameVariant[];
  onSpinComplete?: (game: GameVariant) => void;
}

interface UseWheelSpinResult {
  segments: WheelSegment[];
  rotation: number;
  isSpinning: boolean;
  selectedGame: GameVariant | null;
  selectedSegmentKey: string | null;
  spin: () => void;
  resetResult: () => void;
}

export function useWheelSpin({
  games,
  onSpinComplete,
}: UseWheelSpinOptions): UseWheelSpinResult {
  const segments = useMemo(() => expandToWheelSegments(games), [games]);

  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameVariant | null>(null);
  const [selectedSegmentKey, setSelectedSegmentKey] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSpinTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    stopWheelSpinSound();
  }, []);

  useEffect(() => clearSpinTimeout, [clearSpinTimeout]);

  const segmentKey = segments.map((s) => s.key).join('|');

  useEffect(() => {
    clearSpinTimeout();
    setRotation(0);
    setIsSpinning(false);
    setSelectedGame(null);
    setSelectedSegmentKey(null);
  }, [segmentKey, clearSpinTimeout]);

  const resetResult = useCallback(() => {
    setSelectedGame(null);
    setSelectedSegmentKey(null);
  }, []);

  const spin = useCallback(() => {
    if (isSpinning || segments.length === 0) return;

    const picked = pickRandomSegment(segments);
    if (!picked) return;

    const index = segments.findIndex((s) => s.key === picked.key);
    if (index < 0) return;

    clearSpinTimeout();
    setSelectedGame(null);
    setSelectedSegmentKey(null);
    setIsSpinning(true);
    startWheelSpinSound(SPIN_DURATION_MS);

    const targetRotation = computeTargetRotation(rotation, index, segments.length);
    setRotation(targetRotation);

    timeoutRef.current = setTimeout(() => {
      stopWheelSpinSound();
      setIsSpinning(false);
      setSelectedGame(picked.game);
      setSelectedSegmentKey(picked.key);
      playWinSound();
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.55 },
        colors: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a78bfa'],
      });
      onSpinComplete?.(picked.game);
    }, SPIN_DURATION_MS);
  }, [isSpinning, segments, rotation, clearSpinTimeout, onSpinComplete]);

  return {
    segments,
    rotation,
    isSpinning,
    selectedGame,
    selectedSegmentKey,
    spin,
    resetResult,
  };
}
