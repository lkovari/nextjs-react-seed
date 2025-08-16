"use client";

import { cn } from "@/lib/utils";

export type StepHeaderItem = { id: string; title: string };

type Props = {
  steps: StepHeaderItem[];
  activeIndex: number;
  onStepClick?: (index: number) => void;
};

export default function StepHeader({ steps, activeIndex, onStepClick }: Props) {
  const progress = ((activeIndex + 1) / steps.length) * 100;

  return (
    <div className="mb-4 md:mb-6">
      <div className="h-1 w-full overflow-hidden rounded bg-muted">
        <div
          className="h-1 bg-primary transition-[width]"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </div>

      <ol
        role="list"
        className="mt-3 flex items-center justify-between gap-2 text-xs md:text-sm"
      >
        {steps.map((s, i) => {
          const isActive = i === activeIndex;
          const isCompleted = i < activeIndex;
          const canJump = i <= activeIndex;
          return (
            <li
              key={s.id}
              role="listitem"
              aria-current={isActive ? "step" : undefined}
              className="flex min-w-0 flex-1 items-center gap-2"
            >
              <button
                type="button"
                onClick={() => canJump && onStepClick?.(i)}
                aria-disabled={!canJump}
                className={cn(
                  "inline-flex items-center gap-2 truncate rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  !canJump && "cursor-not-allowed opacity-50"
                )}
                title={s.title}
              >
                <span
                  className={cn(
                    "grid size-6 place-items-center rounded-full text-[0.7rem]",
                    isActive && "bg-primary text-primary-foreground",
                    isCompleted &&
                      !isActive &&
                      "bg-accent text-accent-foreground",
                    !isActive &&
                      !isCompleted &&
                      "bg-muted text-muted-foreground"
                  )}
                >
                  {i + 1}
                </span>
                <span className="hidden truncate md:block">{s.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
