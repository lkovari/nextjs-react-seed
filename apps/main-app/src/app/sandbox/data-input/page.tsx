"use client";
import { useState } from "react";

// Validation constants
const MIN_USERNAME_LENGTH = 4;
const MIN_PASSWORD_LENGTH = 8;

type FieldState = {
  value: string;
  touched: boolean;
  error: string;
  isValid: boolean;
};

type FormState = {
  [key: string]: FieldState;
};

const initialFieldState: FieldState = {
  value: "",
  touched: false,
  error: "",
  isValid: false,
};

const fieldNames = ["username", "password"] as const;

function computeValidation(name: string, value: string, touched: boolean) {
  const trimmed = value.trim();

  let isValid = true;
  let error = "";

  if (trimmed === "") {
    isValid = false;
    if (touched) error = "The field is required";
  } else {
    if (name === "username" && trimmed.length < MIN_USERNAME_LENGTH) {
      isValid = false;
      if (touched) {
        error = `Username must be at least ${MIN_USERNAME_LENGTH} characters`;
      }
    }
    if (name === "password" && trimmed.length < MIN_PASSWORD_LENGTH) {
      isValid = false;
      if (touched) {
        error = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
      }
    }
  }

  return { isValid, error };
}

export default function DataInputFormsPage() {
  const [formState, setFormState] = useState<FormState>(() =>
    fieldNames.reduce((acc, field) => {
      acc[field] = { ...initialFieldState };
      return acc;
    }, {} as FormState)
  );

  const handleChange = (name: string, value: string) => {
    setFormState((prev) => {
      const curr = prev[name];
      const { isValid, error } = computeValidation(name, value, curr.touched);
      return {
        ...prev,
        [name]: { ...curr, value, isValid, error },
      };
    });
  };

  const handleBlur = (name: string) => {
    setFormState((prev) => {
      const curr = prev[name];
      const { isValid, error } = computeValidation(name, curr.value, true);
      return {
        ...prev,
        [name]: { ...curr, touched: true, isValid, error },
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formValues = Object.fromEntries(
      Object.entries(formState).map(([key, val]) => [key, val.value])
    );
    alert(`Submited value: ${JSON.stringify(formValues, null, 2)}`);
  };

  const isFormValid = Object.values(formState).every((f) => f.isValid);
  const isFieldNotEmpty = Object.values(formState).every(
    (field) => field?.value?.trim() !== ""
  );

  const handleClear = () => {
    const clearedState = fieldNames.reduce((acc, field) => {
      acc[field] = { ...initialFieldState };
      return acc;
    }, {} as FormState);
    setFormState(clearedState);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-2 text-center">
        Data Input Form with Validation
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto mt-10 space-y-4"
      >
        {fieldNames.map((fieldName) => (
          <div key={fieldName}>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {fieldName}
            </label>
            <input
              type={fieldName === "password" ? "password" : "text"}
              value={formState[fieldName].value}
              onChange={(e) => handleChange(fieldName, e.target.value)}
              onBlur={() => handleBlur(fieldName)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            {formState[fieldName].error && (
              <p className="text-red-500 text-sm mt-1">
                {formState[fieldName].error}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-2 px-4 rounded-md text-white ${
            isFormValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleClear}
          disabled={!isFieldNotEmpty}
          className={`w-full py-2 px-4 rounded-md text-white ${
            isFieldNotEmpty
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Clear
        </button>
      </form>
    </>
  );
}
