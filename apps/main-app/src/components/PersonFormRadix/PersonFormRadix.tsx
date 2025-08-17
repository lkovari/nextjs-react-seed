"use client";

import { useFormContext, Controller } from "react-hook-form";
import {
  personSchema,
  type PersonFormInput,
  type PersonFormOutput,
} from "@/schemas/person";

import * as Label from "@radix-ui/react-label";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

type PersonFormRadixProps = {
  onSubmit?: (data: PersonFormOutput) => void;
};

export default function PersonFormRadix({ onSubmit }: PersonFormRadixProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useFormContext<PersonFormInput>();

  const inputCls =
    "mt-1 block w-full rounded-md border border-input bg-background text-foreground shadow-sm placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring";

  const selectTriggerCls =
    "mt-1 flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring";

  const labelBase = "block text-sm font-medium";
  const genderOptions = ["Female", "Male", "Other"] as const;

  const handleLocalSubmit = handleSubmit((raw) => {
    const parsed = personSchema.parse(raw);

    if (typeof window !== "undefined") {
      window.alert(
        `Submitted person data:\n\n${JSON.stringify(parsed, null, 2)}`
      );
    }

    onSubmit?.(parsed);
    console.log("[PersonFormRadix] submit payload (parsed):", parsed);
  });

  const handleClear = () => {
    reset(); // resets to useForm defaultValues
  };

  return (
    <section aria-labelledby="personal-heading" className="space-y-4">
      <h2 id="personal-heading" className="text-base font-medium">
        Person
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* First Name */}
        <div>
          <Label.Root htmlFor="firstName" className={labelBase}>
            First name <span className="text-destructive">*</span>
          </Label.Root>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            {...register("firstName")}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            className={inputCls}
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p
              id="firstName-error"
              className="form-error mt-1 text-sm text-destructive"
            >
              {errors.firstName.message as string}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <Label.Root htmlFor="lastName" className={labelBase}>
            Last name <span className="text-destructive">*</span>
          </Label.Root>
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            {...register("lastName")}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            className={inputCls}
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p
              id="lastName-error"
              className="form-error mt-1 text-sm text-destructive"
            >
              {errors.lastName.message as string}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <Label.Root htmlFor="dob" className={labelBase}>
            Date of birth <span className="text-destructive">*</span>
          </Label.Root>
          <input
            id="dob"
            type="date"
            autoComplete="bday"
            {...register("dob")}
            aria-invalid={!!errors.dob}
            aria-describedby={errors.dob ? "dob-error" : undefined}
            className={inputCls}
          />
          {errors.dob && (
            <p
              id="dob-error"
              className="form-error mt-1 text-sm text-destructive"
            >
              {errors.dob.message as string}
            </p>
          )}
        </div>

        {/* Gender (Radix Select) */}
        <div>
          <Label.Root id="gender-label" className={labelBase}>
            Gender
          </Label.Root>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <Select.Root
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <Select.Trigger
                  className={selectTriggerCls}
                  aria-invalid={!!errors.gender}
                  aria-describedby={errors.gender ? "gender-error" : undefined}
                  aria-labelledby="gender-label"
                >
                  <Select.Value placeholder="Select gender" />
                  <Select.Icon>
                    <ChevronDownIcon />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content
                    position="popper"
                    className="z-50 rounded-md border border-input bg-popover text-popover-foreground shadow-md"
                  >
                    <Select.ScrollUpButton className="flex items-center justify-center py-1">
                      <ChevronUpIcon />
                    </Select.ScrollUpButton>

                    <Select.Viewport className="p-1">
                      {genderOptions.map((opt) => (
                        <Select.Item
                          key={opt}
                          value={opt}
                          className="cursor-pointer select-none rounded px-3 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[state=checked]:font-medium"
                        >
                          <Select.ItemText>{opt}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>

                    <Select.ScrollDownButton className="flex items-center justify-center py-1">
                      <ChevronDownIcon />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            )}
          />
          {errors.gender && (
            <p
              id="gender-error"
              className="form-error mt-1 text-sm text-destructive"
            >
              {errors.gender.message as string}
            </p>
          )}
        </div>

        {/* Married */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <Controller
              control={control}
              name="married"
              render={({ field }) => (
                <Checkbox.Root
                  id="married"
                  checked={!!field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(checked === true)
                  }
                  className="h-4 w-4 rounded border border-input bg-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-invalid={!!errors.married}
                  aria-describedby={
                    errors.married ? "married-error" : undefined
                  }
                >
                  <Checkbox.Indicator className="flex items-center justify-center text-white">
                    ✓
                  </Checkbox.Indicator>
                </Checkbox.Root>
              )}
            />
            <Label.Root htmlFor="married" className="text-sm font-medium">
              Married
            </Label.Root>
          </div>
          {errors.married && (
            <p
              id="married-error"
              className="form-error mt-1 text-sm text-destructive"
            >
              {errors.married.message as string}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={handleClear}
          disabled={!isDirty || isSubmitting}
          aria-disabled={!isDirty || isSubmitting}
          className="
            inline-flex items-center rounded-md px-4 py-2 text-sm font-medium
            bg-primary text-primary-foreground shadow
            focus:outline-none focus:ring-2 focus:ring-ring
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          title="Clear form"
        >
          Clear
        </button>

        <button
          type="button"
          onClick={handleLocalSubmit}
          disabled={!isValid || isSubmitting}
          aria-disabled={!isValid || isSubmitting}
          className="
            inline-flex items-center rounded-md px-4 py-2 text-sm font-medium
            bg-primary text-primary-foreground shadow
            focus:outline-none focus:ring-2 focus:ring-ring
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </section>
  );
}
