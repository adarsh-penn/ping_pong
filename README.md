# Bing Bong Wheel

A playful React + TypeScript app that spins a wheel to randomly pick a **Custom Bing Bong** table tennis variant for your group size. Game data lives in JSON (parsed from the rulebook); **Foundation (Standard Rules)** appears as **two wheel slices** for double the visual (and mathematical) odds.

## Run locally

```bash
cd ping-pong-wheel
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

| Path | Purpose |
|------|---------|
| `src/data/games.json` | All variants, player counts, rules, weights |
| `src/data/loadGames.ts` | Loads and normalizes JSON |
| `src/utils/filterGames.ts` | Filters by player count (2 / 4 / 6) |
| `src/utils/wheelSegments.ts` | Expands games into slices + random pick |
| `src/utils/wheelMath.ts` | Rotation target for the selected segment |
| `src/components/SpinWheel.tsx` | SVG wheel + animation |
| `src/hooks/useWheelSpin.ts` | Spin state, sounds, confetti |

## Updating games

Edit `src/data/games.json` only — do not hardcode variants in components. Each entry:

- `playerCounts`: `[2]`, `[4]`, `[6]`, or combinations
- `wheelSlices`: `2` for Foundation, `1` for others (more slices = more wheel space & odds)

## Features

- Player count filter (2 / 4 / 6)
- Smooth wheel spin with easing
- Duplicate slices for variants that should appear more than once (e.g. Foundation)
- Result card with rules, fade-in animation
- Spin / win sounds (Web Audio)
- Confetti on win
- Mobile-friendly layout
