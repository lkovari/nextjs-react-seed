"use client";

import { steps } from "@/lib/step-config";
import Stepper from "@/components/stepper/Stepper";

export default function Page() {
  return (
    <div className="container">
      <h1 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
        Stepper / Wizard simple Proposal
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        Mobile-first, accessible, and type-safe. Uses a single global form via
        react-hook-form + Zod. (future: use schadcn and/or radix-ui)
      </p>

      <div className="mt-6">
        <Stepper steps={steps} />
      </div>
    </div>
  );
}
