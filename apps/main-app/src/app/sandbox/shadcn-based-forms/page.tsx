"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PersonFormRadix from "@/components/PersonFormRadix/PersonFormRadix";
import {
  personSchema,
  type PersonFormInput,
  type PersonFormOutput,
} from "@/schemas/person";
import PersonFormShadcn from "@/components/PersonFormShadcn/PersonFormShadcn";

export default function Page() {
  // RHF should use the schema's INPUT type.
  const methods = useForm<PersonFormInput>({
    resolver: zodResolver(personSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      married: false,
    },
  });

  // Receives parsed/validated OUTPUT from the child submit.
  const handleChildSubmit = (data: PersonFormOutput) => {
    console.log("[page] received payload:", data);
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <h1
          id="radix-ui-forms-heading"
          className="text-base font-bold"
          style={{ color: "#E20074" }} // T-Mobile magenta
        >
          Shadcn based forms
        </h1>

        {/* Keep a single form element; the child triggers handleSubmit. */}
        <form onSubmit={(e) => e.preventDefault()} noValidate>
          <PersonFormShadcn />
        </form>
      </div>
    </FormProvider>
  );
}
