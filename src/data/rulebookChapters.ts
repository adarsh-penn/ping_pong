export interface RulebookSection {
  title: string;
  intro?: string;
  bullets: string[];
  subsections?: { title: string; bullets: string[] }[];
}

export interface RulebookChapter {
  id: string;
  chapter: string;
  title: string;
  intro?: string;
  sections: RulebookSection[];
}

/** Chapters and variants from the Custom Bing Bong Rulebook. */
export const RULEBOOK_CHAPTERS: RulebookChapter[] = [
  {
    id: 'chapter-1',
    chapter: 'Chapter 1',
    title: 'The Foundation (Standard Rules)',
    intro:
      'Unless explicitly overridden by a specific variant, these standard table tennis rules always apply.',
    sections: [
      {
        title: 'Standard rules',
        bullets: [
          'Players: 2 or 4.',
          'Scoring: Games are played to 11 points. You must win by 2 points. (Deuce occurs at 10–10).',
          'The let: If a serve hits the net but still lands correctly on the opponent\'s side, it is a "let" and the serve is replayed without penalty.',
          'Table boundaries: The top surface and the edges of the table are "in." The vertical sides of the table are "out."',
          'The free hand: A player may not touch the playing surface of the table with their free, non-paddle hand while the ball is in play. Doing so results in a point for the opposing team.',
          'Service toss: Unless playing a variant with a "direct serve," the ball must rest freely on the open palm of the server, be tossed at least 6 inches straight up, and struck as it falls.',
        ],
      },
    ],
  },
  {
    id: 'chapter-2',
    chapter: 'Chapter 2',
    title: 'The Variants',
    intro: 'Six custom variants that override or extend the Foundation rules.',
    sections: [
      {
        title: 'Variant 1: Volley-Pong',
        intro: 'A high-flying, cooperative variant requiring teamwork and positioning.',
        bullets: [
          'Players: 4 or 6 (2v2 or 3v3).',
          'The serve: Direct serve (no bounce on the server\'s side). Hit directly over the net to bounce on the diagonal receiver\'s side.',
          'Mandatory passing: Once the ball hits the receiver\'s side, that player cannot hit it back over the net — they must pop the ball up (pass) to a teammate.',
          'The volley: A teammate receiving a pass must hit it out of the air (no table bounce required for passes). They may pass again or strike it back over the net.',
          'Consecutive hits: A single player cannot hit the ball twice in a row.',
          'Special movement: Players may cross the imaginary extension of the net line to save an errant pass, but cannot strike the ball over the net while standing on the opponent\'s side.',
          'The "play-on" rule: If a ball is struck by a player, it is considered "in play" — even if it was clearly flying out of bounds.',
        ],
      },
      {
        title: 'Variant 2: Table-Tennis Tennis',
        intro: 'A fast-paced, aggressive variant mimicking the rules of lawn tennis.',
        bullets: [
          'Players: 2, 4, or 6.',
          'The serve: Direct serve over the net (no bounce on the server\'s side).',
          'The volley: Players may strike the ball out of the air before it bounces on their side.',
          'The bounce: If a player chooses not to volley, the ball may only bounce once on their side before they must return it.',
          'The "play-on" rule: If you touch or hit a ball out of the air, the ball is live. You cannot claim "out" if your paddle or body makes contact.',
        ],
      },
      {
        title: 'Variant 3: Synchronized Solos (Solos in Duos)',
        intro: 'Two 1v1 matches on the exact same table simultaneously.',
        bullets: [
          'Players: 4 (two simultaneous 1v1 games).',
          'Gameplay: Standard ping pong rules apply, but there are two balls in play at the same time.',
          'Faults: If your ball lands in your partner\'s zone or hits the wrong opponent\'s side of the table, your specific 1v1 match loses a point.',
        ],
        subsections: [
          {
            title: 'Boundaries (choose before the game)',
            bullets: [
              'Parallel play: Left-side players only play against left-side players; right-side players only play against right-side players.',
              'Crossfire: Players play diagonally against each other.',
            ],
          },
        ],
      },
      {
        title: 'Variant 4: The Gauntlet (Trios)',
        intro: 'A highly structured 3v3 rotation requiring ultimate focus on turn order.',
        bullets: [
          'Players: 6 (3v3). Team A: P1, P2, P3. Team B: EP1, EP2, EP3.',
          'Rotation: The ball must be struck in this exact order: P1 → EP1 → P2 → EP2 → P3 → EP3 → P1… Hitting out of turn results in an immediate point for the opposing team.',
          'Serve (standard): P1 and P2 handle all serves, alternating standard 2-serve rotations. When P2 serves to EP2, the next hit must be taken by P3 to maintain rotation.',
          'Clutch serving: When the game enters game point, deuce, or advantage, Player 3 takes over. P3 serves to EP3. EP3 must then strike to P1, resetting the rotation loop.',
        ],
      },
      {
        title: 'Variant 5: Zonal Duos (No-Move Duos)',
        intro: 'A territorial variant of standard doubles that eliminates the "alternating hit" requirement.',
        bullets: [
          'Players: 4 (2v2).',
          'Gameplay: Standard ping pong rules apply, except players do not alternate hits.',
          'Territory: Each player "owns" their half of the table (divided by the white center line). If the ball bounces on your half, you must hit it. If it bounces on your partner\'s half, they hit it.',
          'Centerline calls: If a ball hits exactly on the center dividing line, either player may strike it. Communication is key to avoid paddle collisions.',
        ],
      },
      {
        title: 'Variant 6: Sniper-Pong (Dodgeball Variant)',
        intro: 'Builds on Table-Tennis Tennis with high-stakes physical targeting.',
        bullets: [
          'Players: 2, 4, or 6.',
          'Baseline: Plays like Variant 2 (Table-Tennis Tennis). Volleys allowed; direct serves apply.',
          'Scoring (standard): Score by hitting the ball onto the table and past the enemy.',
          'Scoring (sniper): Purposefully strike the ball directly at an opponent\'s body. If it hits them anywhere before touching the ground or a wall, your team scores.',
          'Optional — no camping: In 2v2 or 3v3, the ball must hit the player who is supposed to return it.',
          'Risk/reward: If you attempt to snipe and they dodge, and the ball does not land legally on the table, your team loses the point.',
          'Defensive paddles: Block a snipe with your paddle. If it bounces back to the table, play continues. If it flies out of bounds after a block, the defending player loses the point.',
        ],
      },
    ],
  },
];
