"use client";

import { useFormContext } from "react-hook-form";
import type { FormData } from "@/lib/types";

export default function CarForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();
  const inputCls =
    "mt-1 block w-full rounded-md border border-input bg-background text-foreground shadow-sm placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring";

  return (
    <section aria-labelledby="car-heading">
      <h2 id="car-heading" className="text-base font-medium">
        Car
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="brand" className="block text-sm font-medium">
            Brand <span className="text-destructive">*</span>
          </label>
          <select
            id="brand"
            {...register("brand")}
            aria-invalid={!!errors.brand}
            aria-describedby={errors.brand ? "brand-error" : undefined}
            className={inputCls}
            defaultValue=""
          >
            <option value="" disabled>
              Select brand…
            </option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Nissan">Nissan</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Audi">Audi</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Kia">Kia</option>
            <option value="Mazda">Mazda</option>
            <option value="Subaru">Subaru</option>
            <option value="Lexus">Lexus</option>
            <option value="Tesla">Tesla</option>
            <option value="Volvo">Volvo</option>
            <option value="Porsche">Porsche</option>
            <option value="Jaguar">Jaguar</option>
            <option value="Land Rover">Land Rover</option>
            <option value="Jeep">Jeep</option>
            <option value="Chrysler">Chrysler</option>
            <option value="Dodge">Dodge</option>
            <option value="Ram">Ram</option>
            <option value="Buick">Buick</option>
            <option value="GMC">GMC</option>
            <option value="Cadillac">Cadillac</option>
            <option value="Mitsubishi">Mitsubishi</option>
            <option value="Acura">Acura</option>
            <option value="Infiniti">Infiniti</option>
            <option value="Peugeot">Peugeot</option>
            <option value="Renault">Renault</option>
            <option value="Fiat">Fiat</option>
            <option value="Alfa Romeo">Alfa Romeo</option>
            <option value="Mini">Mini</option>
            <option value="Ferrari">Ferrari</option>
            <option value="Lamborghini">Lamborghini</option>
            <option value="Maserati">Maserati</option>
            <option value="Aston Martin">Aston Martin</option>
            <option value="Bentley">Bentley</option>
            <option value="Rolls-Royce">Rolls-Royce</option>
            <option value="Bugatti">Bugatti</option>
            <option value="McLaren">McLaren</option>
            <option value="Genesis">Genesis</option>
            <option value="Citroën">Citroën</option>
            <option value="Suzuki">Suzuki</option>
            <option value="Saab">Saab</option>
            <option value="Opel">Opel</option>
            <option value="Skoda">Skoda</option>
          </select>
          {errors.brand && (
            <p
              id="brand-error"
              className="form-error mt-1 text-sm text-destructive"
            >
              {errors.brand.message as string}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="model" className="block text-sm font-medium">
            Model <span className="text-destructive">*</span>
          </label>
          <input
            id="model"
            type="text"
            {...register("model")}
            aria-invalid={!!errors.model}
            aria-describedby={errors.model ? "model-error" : undefined}
            className={inputCls}
            placeholder="Enter Model"
          />
          {errors.model && (
            <p
              id="model-error"
              className="form-error mt-1 text-sm text-destructive"
            >
              {errors.model.message as string}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="plateNumber" className="block text-sm font-medium">
            Plate number <span className="text-destructive">*</span>
          </label>
          <input
            id="plateNumber"
            type="text"
            {...register("plateNumber")}
            aria-invalid={!!errors.plateNumber}
            aria-describedby={
              errors.plateNumber ? "plateNumber-error" : undefined
            }
            className={inputCls}
            placeholder="Enter Plate#"
          />
          {errors.plateNumber && (
            <p
              id="plateNumber-error"
              className="form-error mt-1 text-sm text-destructive"
            >
              {errors.plateNumber.message as string}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="chassisNumber" className="block text-sm font-medium">
            Chassis number <span className="text-destructive">*</span>
          </label>
          <input
            id="chassisNumber"
            type="text"
            {...register("chassisNumber")}
            aria-invalid={!!errors.chassisNumber}
            aria-describedby={
              errors.chassisNumber ? "chassisNumber-error" : undefined
            }
            className={inputCls}
            placeholder="Enter VIN#"
          />
          {errors.chassisNumber && (
            <p
              id="chassisNumber-error"
              className="form-error mt-1 text-sm text-destructive"
            >
              {errors.chassisNumber.message as string}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
