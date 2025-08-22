"use client";

import React, { useEffect, useRef, useState } from "react";

type CountElapsedTimerProps = {
  /** Whether the timer should currently be running. */
  isRunning: boolean;
  /**
   * Accumulated milliseconds from previous runs.
   * While running, the displayed time is (baseMs + (now - start)).
   * While stopped, the displayed time is baseMs.
   */
  baseMs?: number;
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
 * - Shows `baseMs` when stopped.
 * - When starting, continues from `baseMs` and adds live delta.
 * - Uses rAF for smooth updates, throttled by `tickRateMs`.
 */
export default function CountElapsedTimer({
  isRunning,
  baseMs = 0,
  onStop,
  tickRateMs = 50,
  children,
}: CountElapsedTimerProps) {
  const startRef = useRef<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState<number>(baseMs);

  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);
  const wasRunningRef = useRef<boolean>(false);

  // Keep displayed time in sync with baseMs when not running or after reset.
  useEffect(() => {
    if (!isRunning) {
      setElapsedMs(Math.max(0, baseMs));
    }
  }, [baseMs, isRunning]);

  useEffect(() => {
    const wasRunning = wasRunningRef.current;

    if (!wasRunning && isRunning) {
      // Transition: Stopped -> Running
      startRef.current = Date.now();
      lastTickRef.current = 0;
      loop();
    }

    if (wasRunning && !isRunning) {
      // Transition: Running -> Stopped
      cancelLoop();
      const start = startRef.current;
      const finalMs =
        start !== null ? Math.max(0, baseMs + (Date.now() - start)) : baseMs;
      setElapsedMs(finalMs);
      onStop?.(finalMs, formatHMSms(finalMs));
      startRef.current = null;
    }

    wasRunningRef.current = isRunning;

    return () => {
      cancelLoop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, baseMs]);

  const loop = () => {
    cancelLoop();
    const step = () => {
      rafRef.current = requestAnimationFrame(step);

      const start = startRef.current;
      if (start === null) return;

      const now = Date.now();
      if (now - lastTickRef.current >= tickRateMs) {
        const ms = Math.max(0, baseMs + (now - start));
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
