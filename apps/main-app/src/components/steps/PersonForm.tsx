"use client";

import { useFormContext } from "react-hook-form";
import type { FormData } from "@/lib/types";

export default function PersonForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  const inputCls =
    "mt-1 block w-full rounded-md border border-input bg-background text-foreground shadow-sm placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring";

  return (
    <section aria-labelledby="personal-heading">
      <h2 id="personal-heading" className="text-base font-medium">
        Person
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium">
            First name <span className="text-destructive">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            {...register("firstName")}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            className={inputCls}
            placeholder="Enter First name"
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

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium">
            Last name <span className="text-destructive">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            {...register("lastName")}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            className={inputCls}
            placeholder="Enter Last name"
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

        <div>
          <label htmlFor="dob" className="block text-sm font-medium">
            Date of birth <span className="text-destructive">*</span>
          </label>
          <input
            id="dob"
            type="date"
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

        <div>
          <label htmlFor="gender" className="block text-sm font-medium">
            Gender
          </label>
          <input
            id="gender"
            type="text"
            {...register("gender")}
            aria-invalid={!!errors.gender}
            aria-describedby={errors.gender ? "gender-error" : undefined}
            className={inputCls}
            placeholder="Enter Gender (Female/Male/Other)"
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

        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <input
              id="married"
              type="checkbox"
              {...register("married")}
              aria-invalid={!!errors.married}
              aria-describedby={errors.married ? "married-error" : undefined}
              className="h-4 w-4 rounded border-input bg-background text-primary focus:ring-ring"
            />
            <label htmlFor="married" className="text-sm font-medium">
              Married
            </label>
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
    </section>
  );
}
