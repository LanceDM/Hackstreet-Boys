import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";

function CodeEditor({ onSubmit, initialCode }) {
  const defaultCode = `#include <iostream>\nusing namespace std;\nint main(){\n    cout << "Hello, World!" << endl;\n    return 0;\n}`;
  const [code, setCode] = useState(initialCode || defaultCode);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    try {
      const result = await onSubmit({ code, input });
      setOutput(result.output || result.stdout || "");
    } catch (err) {
      setOutput("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <MonacoEditor
        height="300px"
        language="cpp"
        theme="vs-dark"
        value={code}
        options={{ automaticLayout: true }}
        onChange={(newCode) => setCode(newCode)}
      />

      <textarea
        placeholder="Standard Input"
        style={{ marginTop: "10px", height: "60px" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleRun}
        disabled={loading}
        style={{ marginTop: "10px", padding: "8px 12px" }}
      >
        { loading ? "Running…" : "Run Code" }
      </button>

      <pre
        style={{
          marginTop: "10px",
          backgroundColor: "#1e1e1e",
          color: "#fff",
          padding: "12px",
          height: "120px",
          overflowY: "auto"
        }}
      >
        { output }
      </pre>
    </div>
  );
}

export default CodeEditor;
