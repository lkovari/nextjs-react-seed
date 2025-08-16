import type { z } from "zod";
import type { Path } from "react-hook-form";

/* Step domain types */
export type Person = {
    firstName: string;
    lastName: string;
    dob: string; // ISO yyyy-mm-dd
    gender?: string;
    married?: boolean;
};

export type Address = {
    houseNumber?: string;
    street?: string;
    city: string;
    zip?: string;
    country: string;
};

export type Car = {
    brand: string;
    model: string;
    plateNumber: string;
    chassisNumber: string;
};

/** Root payload across all steps */
export type FormData = Person & Address & Car;

/* Step definition contract */
export type StepComponent = React.ComponentType<Record<string, never>>;

export type StepDefinition<TForm> = {
    id: string;
    title: string;
    component: StepComponent;
    /** Exact field keys owned by this step (typed to RHF's Path<TForm>) */
    fields: ReadonlyArray<Path<TForm>>;
    /** Zod schema for only the fields in this step */
    schema: z.ZodTypeAny;
};