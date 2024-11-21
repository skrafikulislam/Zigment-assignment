import React, { useState } from "react";
import FormGenerator from "./components/FormGenerator";
import JSONEditor from "./components/JSONEditor";
import { JSONSchema } from "./types/schemaTypes";

const App: React.FC = () => {
  const [schema, setSchema] = useState<JSONSchema>({
    formTitle: "Project Requirements Survey",
    formDescription: "Please fill out this survey about your project needs",
    fields: [],
  });

  const handleSchemaChange = (updatedSchema: JSONSchema) => {
    setSchema(updatedSchema);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="flex-1 p-4 border-r border-gray-300">
        <h2 className="text-xl font-semibold mb-4">JSON Editor</h2>
        <JSONEditor schema={schema} onSchemaChange={handleSchemaChange} />
      </div>

      <div className="flex-1 p-4">
        <h2 className="text-xl font-semibold mb-4">Form Preview</h2>
        <FormGenerator schema={schema} />
      </div>
    </div>
  );
};

export default App;
