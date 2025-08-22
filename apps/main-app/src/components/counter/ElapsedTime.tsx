"use client";

import React, { useCallback, useState } from "react";
import CountElapsedTimer from "../elapsed-time/CountElapsedTimer";

export default function ElapsedTime() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [baseMs, setBaseMs] = useState<number>(0);

  const handleToggle = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const handleStop = useCallback((elapsedMs: number, formatted: string) => {
    // Persist the final elapsed value so a subsequent Start resumes from here
    setBaseMs(elapsedMs);
    console.log(`Elapsed time: ${formatted} (${elapsedMs} ms)`);
  }, []);

  const handleReset = useCallback(() => {
    // Only meaningful when stopped; zero out accumulated time
    setBaseMs(0);
  }, []);

  const resetDisabled = isRunning || baseMs === 0;

  return (
    <div
      role="region"
      aria-label="Timer Card"
      className="rounded-lg border shadow-lg p-4 max-w-sm space-y-4 mx-auto"
    >
      <div className="flex justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Elapsed Time</h2>
          <p className="text-sm text-neutral-500">
            Click to start and stop the elapsed time.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <CountElapsedTimer
          isRunning={isRunning}
          baseMs={baseMs}
          onStop={handleStop}
          tickRateMs={50}
        >
          {(formatted) => (
            <div
              className="text-3xl tabular-nums font-mono text-[#E20074]"
              aria-live="polite"
            >
              {formatted}
            </div>
          )}
        </CountElapsedTimer>
      </div>

      <div className="pt-2 flex items-center gap-2 justify-center">
        <button
          type="button"
          onClick={handleToggle}
          className={`inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed ${
            isRunning ? "text-red-600" : "text-green-600"
          }`}
          aria-pressed={isRunning}
        >
          {isRunning ? "Stop Timer" : "Start Timer"}
        </button>

        <button
          type="button"
          onClick={handleReset}
          disabled={resetDisabled}
          className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-disabled={resetDisabled}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
