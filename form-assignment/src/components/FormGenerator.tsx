import React, { useState } from "react";
import { JSONSchema, FormField } from "../types/schemaTypes";

interface FormProps {
  schema: JSONSchema;
}

const FormGenerator: React.FC<FormProps> = ({ schema }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleValidation = (field: FormField, value: string) => {
    if (field.validation) {
      const { pattern, message } = field.validation;
      if (!new RegExp(pattern).test(value)) {
        setErrors((prev) => ({ ...prev, [field.id]: message }));
        return false;
      }
    }
    setErrors((prev) => {
      const { [field.id]: _, ...rest } = prev;
      return rest;
    });
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let isValid = true;

    schema.fields.forEach((field) => {
      const value = formData[field.id];
      if (field.required && !value) {
        setErrors((prev) => ({
          ...prev,
          [field.id]: `${field.label} is required.`,
        }));
        isValid = false;
      }

      if (value && !handleValidation(field, value)) {
        isValid = false;
      }
    });

    if (isValid) {
      alert("Form submitted successfully!");
      console.log("Form Data:", formData);
    }

    setIsSubmitting(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">{schema.formTitle}</h2>
      <p className="mb-4">{schema.formDescription}</p>
      <form onSubmit={handleSubmit}>
        {schema.fields.map((field) => (
          <div key={field.id} className="mb-4">
            <label className="block text-sm font-semibold">{field.label}</label>
            {field.type === "text" || field.type === "email" ? (
              <input
                type={field.type}
                name={field.id}
                placeholder={field.placeholder}
                required={field.required}
                value={formData[field.id] || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            ) : field.type === "textarea" ? (
              <textarea
                name={field.id}
                placeholder={field.placeholder}
                required={field.required}
                value={formData[field.id] || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            ) : field.type === "select" ? (
              <select
                name={field.id}
                required={field.required}
                onChange={handleChange}
                value={formData[field.id] || ""}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              >
                <option value="">Select an option</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : null}
            {errors[field.id] && (
              <span className="text-red-500 text-sm">{errors[field.id]}</span>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default FormGenerator;
