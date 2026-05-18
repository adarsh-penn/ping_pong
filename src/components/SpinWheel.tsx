import { useMemo } from 'react';
import type { WheelSegment } from '../types/game';
import { labelFontSize, splitLabelLines } from '../utils/wheelLabels';

const SEGMENT_COLORS = [
  '#ff6b6b',
  '#4ecdc4',
  '#ffe66d',
  '#a78bfa',
  '#fb923c',
  '#38bdf8',
  '#f472b6',
  '#86efac',
];

interface SpinWheelProps {
  segments: WheelSegment[];
  rotation: number;
  isSpinning: boolean;
  selectedSegmentKey: string | null;
  size?: number;
}

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number,
): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
}

function SegmentLabel({
  x,
  y,
  mid,
  name,
  fontSize,
}: {
  x: number;
  y: number;
  mid: number;
  name: string;
  fontSize: number;
}) {
  const [line1, line2] = splitLabelLines(name);
  const lineHeight = fontSize * 1.15;

  return (
    <text
      x={x}
      y={y}
      fill="#0f172a"
      fontSize={fontSize}
      fontWeight={700}
      textAnchor="middle"
      dominantBaseline="middle"
      transform={`rotate(${mid}, ${x}, ${y})`}
      className="spin-wheel__label"
    >
      <tspan x={x} dy={line2 ? -lineHeight / 2 : 0}>
        {line1}
      </tspan>
      {line2 ? (
        <tspan x={x} dy={lineHeight}>
          {line2}
        </tspan>
      ) : null}
    </text>
  );
}

export function SpinWheel({
  segments,
  rotation,
  isSpinning,
  selectedSegmentKey,
  size: sizeProp,
}: SpinWheelProps) {
  const size = sizeProp ?? 320;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 8;
  const segmentAngle = segments.length > 0 ? 360 / segments.length : 360;
  const fontSize = labelFontSize(segments.length);

  const gameColorIndex = useMemo(() => {
    const map = new Map<string, number>();
    let next = 0;
    for (const { game } of segments) {
      if (!map.has(game.id)) {
        map.set(game.id, next);
        next += 1;
      }
    }
    return map;
  }, [segments]);

  const drawnSegments = useMemo(() => {
    return segments.map((segment, index) => {
      const start = index * segmentAngle;
      const end = start + segmentAngle;
      const mid = start + segmentAngle / 2;
      const labelPos = polarToCartesian(cx, cy, radius * 0.58, mid);
      const isSelected =
        !isSpinning && selectedSegmentKey === segment.key;
      const colorIndex = gameColorIndex.get(segment.game.id) ?? index;

      return {
        segment,
        path: describeArc(cx, cy, radius, start, end),
        color: SEGMENT_COLORS[colorIndex % SEGMENT_COLORS.length],
        labelPos,
        mid,
        isSelected,
      };
    });
  }, [
    segments,
    segmentAngle,
    cx,
    cy,
    radius,
    isSpinning,
    selectedSegmentKey,
    gameColorIndex,
  ]);

  if (segments.length === 0) {
    return (
      <div className="spin-wheel spin-wheel--empty">
        <p>No variants for this player count</p>
      </div>
    );
  }

  return (
    <div className="spin-wheel">
      <div className="spin-wheel__pointer" aria-hidden="true" />
      <svg
        className="spin-wheel__svg"
        viewBox={`0 0 ${size} ${size}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Game variant wheel"
      >
        <g
          className={`spin-wheel__disc${isSpinning ? ' spin-wheel__disc--spinning' : ''}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {drawnSegments.map(
            ({ segment, path, color, labelPos, mid, isSelected }) => (
              <g key={segment.key}>
                <path
                  d={path}
                  fill={color}
                  className={`spin-wheel__segment${isSelected ? ' spin-wheel__segment--selected' : ''}`}
                  stroke="rgba(15, 23, 42, 0.35)"
                  strokeWidth={2}
                />
                <SegmentLabel
                  x={labelPos.x}
                  y={labelPos.y}
                  mid={mid}
                  name={segment.game.name}
                  fontSize={fontSize}
                />
              </g>
            ),
          )}
          <circle cx={cx} cy={cy} r={28} className="spin-wheel__hub" />
        </g>
      </svg>
    </div>
  );
}
