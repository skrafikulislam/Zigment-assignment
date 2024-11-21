import React, { useState } from "react";
import { JSONSchema } from "../types/schemaTypes";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";

interface JSONEditorProps {
  schema: JSONSchema;
  onSchemaChange: (schema: JSONSchema) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ schema, onSchemaChange }) => {
  const [jsonText, setJsonText] = useState<string>(
    JSON.stringify(schema, null, 2)
  );
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (editor: any, data: any, value: string) => {
    setJsonText(value);

    console.log(editor, data);

    try {
      const parsedSchema: JSONSchema = JSON.parse(value);

      if (parsedSchema.fields && Array.isArray(parsedSchema.fields)) {
        setErrors([]);
        onSchemaChange(parsedSchema);
      } else {
        setErrors(["Invalid schema: 'fields' must be an array"]);
      }
    } catch (error) {
      setErrors(["Invalid JSON format"]);
    }
  };

  return (
    <div className="json-editor">
      <CodeMirror
        value={jsonText}
        options={{
          mode: "javascript",
          theme: "default",
          lineNumbers: true,
          tabSize: 2,
          indentWithTabs: false,
        }}
        onBeforeChange={handleChange}
      />
      {errors.length > 0 && (
        <div className="text-red-500 mt-2">
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JSONEditor;
