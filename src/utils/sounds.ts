let audioContext: AudioContext | null = null;
let activeSpinStop: (() => void) | null = null;

function getContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

async function ensureRunning(ctx: AudioContext): Promise<void> {
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }
}

function playTick(ctx: AudioContext, volume = 0.22): void {
  const t = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(920, t);
  osc.frequency.exponentialRampToValueAtTime(380, t + 0.04);
  gain.gain.setValueAtTime(volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.06);

  const bufferSize = ctx.sampleRate * 0.02;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(volume * 0.35, t);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
  noise.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(t);
}

/**
 * Wheel-of-fortune style ticking for the full spin duration.
 * Returns a stop function (also called automatically at duration end).
 */
export function startWheelSpinSound(durationMs: number): () => void {
  stopWheelSpinSound();

  let cancelled = false;
  let tickTimeoutId: ReturnType<typeof setTimeout> | null = null;
  let endTimeoutId: ReturnType<typeof setTimeout> | null = null;
  const startTime = performance.now();

  const stop = () => {
    cancelled = true;
    if (tickTimeoutId !== null) {
      clearTimeout(tickTimeoutId);
      tickTimeoutId = null;
    }
    if (endTimeoutId !== null) {
      clearTimeout(endTimeoutId);
      endTimeoutId = null;
    }
    if (activeSpinStop === stop) {
      activeSpinStop = null;
    }
  };

  activeSpinStop = stop;

  const scheduleTick = () => {
    if (cancelled) return;

    const elapsed = performance.now() - startTime;
    if (elapsed >= durationMs) {
      stop();
      return;
    }

    try {
      const ctx = getContext();
      void ensureRunning(ctx).then(() => {
        if (!cancelled) playTick(ctx);
      });
    } catch {
      /* ignore */
    }

    const progress = Math.min(1, elapsed / durationMs);
    const interval = 55 + progress * progress * 220;
    tickTimeoutId = setTimeout(scheduleTick, interval);
  };

  try {
    const ctx = getContext();
    void ensureRunning(ctx).then(() => {
      if (!cancelled) {
        const rumble = ctx.createOscillator();
        const rumbleGain = ctx.createGain();
        rumble.type = 'sine';
        rumble.frequency.setValueAtTime(48, ctx.currentTime);
        rumbleGain.gain.setValueAtTime(0.04, ctx.currentTime);
        rumbleGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);
        rumble.connect(rumbleGain);
        rumbleGain.connect(ctx.destination);
        rumble.start();
        rumble.stop(ctx.currentTime + durationMs / 1000);
      }
    });
  } catch {
    /* ignore */
  }

  scheduleTick();
  endTimeoutId = setTimeout(stop, durationMs + 50);

  return stop;
}

export function stopWheelSpinSound(): void {
  activeSpinStop?.();
}

/** Brief win chime when the wheel stops. */
export function playWinSound(): void {
  try {
    const ctx = getContext();
    void ensureRunning(ctx).then(() => {
      const notes = [523.25, 659.25, 783.99];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const t = ctx.currentTime + i * 0.08;
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.22);
      });
    });
  } catch {
    /* ignore */
  }
}
