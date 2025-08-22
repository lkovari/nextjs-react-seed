"use client";

import React, { useEffect, useRef, useState } from "react";

type CountElapsedTimerProps = {
  /** Whether the timer should currently be running. */
  isRunning: boolean;
  /**
   * Called when the timer transitions from running -> stopped.
   * Receives the final elapsed milliseconds for this run.
   */
  onStop?: (elapsedMs: number, formatted: string) => void;
  /** How often to update the display while running (ms). */
  tickRateMs?: number;
  /**
   * Render-prop that receives the formatted time (HH:MM:SS:MS) and raw ms.
   */
  children: (formatted: string, elapsedMs: number) => React.ReactNode;
};

/** Format milliseconds to HH:MM:SS:MS (zero-padded). */
function formatHMSms(ms: number): string {
  if (ms < 0 || !Number.isFinite(ms)) return "00:00:00:000";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const millis = ms % 1000;

  const hh = hours.toString().padStart(2, "0");
  const mm = minutes.toString().padStart(2, "0");
  const ss = seconds.toString().padStart(2, "0");
  const mmm = millis.toString().padStart(3, "0");
  return `${hh}:${mm}:${ss}:${mmm}`;
}

/**
 * CountElapsedTimer
 * - Resets to 00:00:00:000 every time it transitions to running.
 * - Tracks elapsed using Date.now().
 * - Provides formatted time to parent via a render prop.
 */
export default function CountElapsedTimer({
  isRunning,
  onStop,
  tickRateMs = 50, // faster tick for ms display
  children,
}: CountElapsedTimerProps) {
  const startRef = useRef<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState<number>(0);

  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);
  const wasRunningRef = useRef<boolean>(false);

  useEffect(() => {
    const wasRunning = wasRunningRef.current;

    if (!wasRunning && isRunning) {
      startRef.current = Date.now();
      setElapsedMs(0);
      lastTickRef.current = 0;
      loop();
    }

    if (wasRunning && !isRunning) {
      cancelLoop();
      const finalMs =
        startRef.current !== null ? Date.now() - startRef.current : elapsedMs;
      const clamped = Math.max(0, finalMs);
      setElapsedMs(clamped);
      onStop?.(clamped, formatHMSms(clamped));
      startRef.current = null;
    }

    wasRunningRef.current = isRunning;

    return () => {
      cancelLoop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  const loop = () => {
    cancelLoop();
    const step = () => {
      rafRef.current = requestAnimationFrame(step);
      const start = startRef.current;
      if (start === null) return;

      const now = Date.now();
      if (now - lastTickRef.current >= tickRateMs) {
        const ms = Math.max(0, now - start);
        setElapsedMs(ms);
        lastTickRef.current = now;
      }
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const cancelLoop = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  return <>{children(formatHMSms(elapsedMs), elapsedMs)}</>;
}
