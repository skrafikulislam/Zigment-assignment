export interface Option {
  value: string;
  label: string;
}

export interface FormField {
  id: string;
  type: "text" | "email" | "select" | "radio" | "textarea";
  label: string;
  required: boolean;
  placeholder?: string;
  options?: Option[];
  validation?: {
    pattern: string;
    message: string;
  };
}

export interface JSONSchema {
  formTitle: string;
  formDescription: string;
  fields: FormField[];
}
