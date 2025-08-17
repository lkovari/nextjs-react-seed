import type { StepDefinition, FormData } from "@/lib/types";
import { personSchema, addressSchema, carSchema } from "@/lib/schemas";
import PersonForm from "@/components/steps/PersonForm";
import AddressForm from "@/components/steps/AddressForm";
import CarForm from "@/components/steps/CarForm";

export const steps: StepDefinition<FormData>[] = [
    {
        id: "person",
        title: "Person",
        component: PersonForm,
        fields: ["firstName", "lastName", "dob", "gender", "married"] as const,
        schema: personSchema.pick({
            firstName: true,
            lastName: true,
            dob: true,
            gender: true,
            married: true,
        }),
    },
    {
        id: "address",
        title: "Address",
        component: AddressForm,
        fields: ["houseNumber", "street", "city", "zip", "country"] as const,
        schema: addressSchema.pick({
            houseNumber: true,
            street: true,
            city: true,
            zip: true,
            country: true,
        }),
    },
    {
        id: "car",
        title: "Car",
        component: CarForm,
        fields: ["brand", "model", "plateNumber", "chassisNumber"] as const,
        schema: carSchema.pick({
            brand: true,
            model: true,
            plateNumber: true,
            chassisNumber: true,
        }),
    },
];