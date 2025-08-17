import { z } from "zod";

export const personSchema = z.object({
    firstName: z
        .string()
        .min(1, "First name is required")
        .min(3, "First name must be at least 3 characters"),
    lastName: z
        .string()
        .min(1, "Last name is required")
        .min(3, "Last name must be at least 3 characters"),
    dob: z.string().min(1, "Date of birth is required"),
    // Keep "" so the Select can show a placeholder when nothing is chosen.
    gender: z.enum(["Female", "Male", "Other"]).optional().or(z.literal("")),
    // Default makes the OUTPUT type always boolean; INPUT may be boolean | undefined.
    married: z.boolean().default(false),
});

// Use INPUT for RHF form values, OUTPUT for parsed/validated data.
export type PersonFormInput = z.input<typeof personSchema>;
export type PersonFormOutput = z.output<typeof personSchema>;