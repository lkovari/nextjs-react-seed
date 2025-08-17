"use client";

import { useFormContext } from "react-hook-form";
import type { FormData } from "@/lib/types";

export default function AddressForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();
  const inputCls =
    "mt-1 block w-full rounded-md border border-input bg-background text-foreground shadow-sm placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring";

  return (
    <section aria-labelledby="address-heading">
      <h2 id="address-heading" className="text-base font-medium">
        Address
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="houseNumber" className="block text-sm font-medium">
            House number
          </label>
          <input
            id="houseNumber"
            type="text"
            {...register("houseNumber")}
            aria-invalid={!!errors.houseNumber}
            aria-describedby={
              errors.houseNumber ? "houseNumber-error" : undefined
            }
            className={inputCls}
            placeholder="Enter a house #"
          />
          {errors.houseNumber && (
            <p
              id="houseNumber-error"
              className="form-error mt-1 text-sm text-destructive"
            >
              {errors.houseNumber.message as string}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="street" className="block text-sm font-medium">
            Street
          </label>
          <input
            id="street"
            type="text"
            {...register("street")}
            aria-invalid={!!errors.street}
            aria-describedby={errors.street ? "street-error" : undefined}
            className={inputCls}
            placeholder="Enter a Street"
          />
          {errors.street && (
            <p
              id="street-error"
              className="form-error mt-1 text-sm text-destructive"
            >
              {errors.street.message as string}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium">
            City <span className="text-destructive">*</span>
          </label>
          <input
            id="city"
            type="text"
            {...register("city")}
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "city-error" : undefined}
            className={inputCls}
            placeholder="Enter a City"
          />
          {errors.city && (
            <p
              id="city-error"
              className="form-error mt-1 text-sm text-destructive"
            >
              {errors.city.message as string}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="zip" className="block text-sm font-medium">
            ZIP
          </label>
          <input
            id="zip"
            type="text"
            {...register("zip")}
            aria-invalid={!!errors.zip}
            aria-describedby={errors.zip ? "zip-error" : undefined}
            className={inputCls}
            placeholder="Enter a Zip"
          />
          {errors.zip && (
            <p
              id="zip-error"
              className="form-error mt-1 text-sm text-destructive"
            >
              {errors.zip.message as string}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="country" className="block text-sm font-medium">
            Country <span className="text-destructive">*</span>
          </label>
          <input
            id="country"
            type="text"
            {...register("country")}
            aria-invalid={!!errors.country}
            aria-describedby={errors.country ? "country-error" : undefined}
            className={inputCls}
            placeholder="Enter a Country"
          />
          {errors.country && (
            <p
              id="country-error"
              className="form-error mt-1 text-sm text-destructive"
            >
              {errors.country.message as string}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
