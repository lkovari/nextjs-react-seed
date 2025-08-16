import { z } from "zod";

/* Utilities */
const requiredMsg = "This field is required";
const isoDate = z
    .string()
    .min(1, requiredMsg)
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");

/* Per-step schemas */
export const personSchema = z.object({
    firstName: z.string().min(1, requiredMsg),
    lastName: z.string().min(1, requiredMsg),
    dob: isoDate,
    gender: z.string().optional().default(""),
    married: z.boolean().optional().default(false),
});

export const addressSchema = z.object({
    houseNumber: z.string().optional().default(""),
    street: z.string().optional().default(""),
    city: z.string().min(1, requiredMsg),
    zip: z.string().optional().default(""),
    country: z.string().min(1, requiredMsg),
});

export const carSchema = z.object({
    brand: z.string().min(1, requiredMsg),
    model: z.string().min(1, requiredMsg),
    plateNumber: z.string().min(1, requiredMsg),
    chassisNumber: z.string().min(1, requiredMsg),
});

/* Root schema (all steps combined) */
export const rootSchema = personSchema.merge(addressSchema).merge(carSchema);

export type RootSchema = typeof rootSchema;