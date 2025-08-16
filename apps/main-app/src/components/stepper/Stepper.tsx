"use client";

import { useMemo, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import StepHeader from "./StepHeader";
import type { FormData, StepDefinition } from "@/lib/types";
import { rootSchema } from "@/lib/schemas";
import { cn, scrollToError } from "@/lib/utils";

type Props = { steps: StepDefinition<FormData>[] };

export default function Stepper({ steps }: Props) {
  const methods = useForm<FormData>({
    resolver: zodResolver(rootSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      married: false,
      houseNumber: "",
      street: "",
      city: "",
      zip: "",
      country: "",
      brand: "",
      model: "",
      plateNumber: "",
      chassisNumber: "",
    },
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [submitted, setSubmitted] = useState<FormData | null>(null);
  const current = steps[activeIndex];

  const watched = useWatch<FormData>({
    control: methods.control,
    name: current.fields,
  });

  const isCurrentStepValid = useMemo(() => {
    const subset = current.fields.reduce<Record<string, unknown>>(
      (acc, key, i) => {
        acc[String(key)] = Array.isArray(watched) ? watched[i] : undefined;
        return acc;
      },
      {}
    );
    return current.schema.safeParse(subset).success;
  }, [watched, current]);

  const handleNext = async () => {
    const ok = await methods.trigger(current.fields, { shouldFocus: true });
    if (!ok) return scrollToError();
    setActiveIndex((i) => Math.min(i + 1, steps.length - 1));
  };
  const handleBack = () => setActiveIndex((i) => Math.max(i - 1, 0));

  const onValid = (data: FormData) => {
    console.log("Submitted payload:", data);
    setSubmitted(data);
  };
  const onInvalid = () => scrollToError();

  if (submitted) {
    return (
      <div className="rounded-lg border border-border bg-background p-4 shadow-sm">
        <h2 className="text-lg font-semibold">Success</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The full form passed validation. The merged payload is shown below.
        </p>
        <pre className="mt-4 overflow-auto rounded bg-muted p-3 text-xs text-muted-foreground">
          {JSON.stringify(submitted, null, 2)}
        </pre>
        <div className="mt-4">
          <button
            type="button"
            onClick={() => {
              setSubmitted(null);
              setActiveIndex(0);
            }}
            className="inline-flex items-center rounded-md border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Fill Again
          </button>
        </div>
      </div>
    );
  }

  const ActiveComponent = current.component;

  return (
    <FormProvider {...methods}>
      <form
        className="rounded-lg border border-border bg-background p-4 shadow-sm md:p-6"
        onSubmit={methods.handleSubmit(onValid, onInvalid)}
        noValidate
      >
        <StepHeader
          steps={steps.map((s) => ({ id: s.id, title: s.title }))}
          activeIndex={activeIndex}
          onStepClick={(index) => {
            if (index <= activeIndex) setActiveIndex(index);
          }}
        />

        <div className="mt-4 md:mt-6">
          <ActiveComponent />
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleBack}
            aria-disabled={activeIndex === 0}
            className={cn(
              "inline-flex items-center rounded-md border border-border bg-background px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              activeIndex === 0
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            Back
          </button>

          {activeIndex < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              aria-disabled={!isCurrentStepValid}
              className={cn(
                "inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                !isCurrentStepValid && "cursor-not-allowed opacity-50"
              )}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
