"use client";

import React, { useCallback, useState } from "react";
import CountElapsedTimer from "../elapsed-time/CountElapsedTimer";

export default function ElapsedTime() {
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleToggle = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const handleStop = useCallback((elapsedMs: number, formatted: string) => {
    alert(`Elapsed time: ${formatted} (${elapsedMs} ms)`);
  }, []);

  return (
    <div
      role="region"
      aria-label="Timer Card"
      className="rounded-lg border shadow-lg p-4 max-w-sm space-y-4"
    >
      <header className="space-y-1">
        <h2 className="text-lg font-semibold">Interview Timer</h2>
        <p className="text-sm text-neutral-500">
          Click to start and stop the elapsed time.
        </p>
      </header>

      <CountElapsedTimer isRunning={isRunning} onStop={handleStop}>
        {(formatted) => (
          <div className="text-3xl tabular-nums font-mono text-[#E20074]" aria-live="polite">
            {formatted}
          </div>
        )}
      </CountElapsedTimer>

      <div className="pt-2">
        <button
          type="button"
          onClick={handleToggle}
          className={`inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 disabled:cursor-not-allowed ${isRunning ? "text-red-600" : "text-green-600"}`}
          aria-pressed={isRunning}
        >
          {isRunning ? "Stop Timer" : "Start Timer"}
        </button>
      </div>
    </div>
  );
}
