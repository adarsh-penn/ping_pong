/** Removes parenthetical suffixes, e.g. "Foundation (Standard Rules)" → "Foundation". */
export function stripParenthetical(name: string): string {
  return name
    .replace(/\s*\([^)]*\)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Short label for wheel segments (no bracketed text). */
export function wheelDisplayName(name: string): string {
  return stripParenthetical(name);
}

/** Splits a display name into up to two wheel label lines. */
export function splitLabelLines(name: string): [string, string] {
  const display = wheelDisplayName(name);
  const words = display.split(/\s+/).filter(Boolean);

  if (words.length <= 1) {
    return [display, ''];
  }
  if (words.length === 2) {
    return [words[0], words[1]];
  }

  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
}

export function labelFontSize(segmentCount: number): number {
  if (segmentCount <= 4) return 14;
  if (segmentCount <= 6) return 12;
  if (segmentCount <= 8) return 11;
  return 10;
}
