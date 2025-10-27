import React, { useState, useEffect } from "react";

function CodeEditor({ onSubmit, initialCode }) {
  const defaultCode = `#include <iostream>\nusing namespace std;\nint main(){\n    cout << "Hello, World!" << endl;\n    return 0;\n}`;
  const [code, setCode] = useState(initialCode || defaultCode);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [MonacoComponent, setMonacoComponent] = useState(null);
  const [monacoError, setMonacoError] = useState(null);
  const [editorLib, setEditorLib] = useState(null); // 'monaco-react' | 'react-monaco-editor'

  useEffect(() => {
    let mounted = true;
    // Try the modern maintained package first, then fall back to the older one.
    // If neither is available we'll keep monacoError set and render the textarea fallback.
    (async () => {
      try {
        const mod = await import('@monaco-editor/react');
        if (!mounted) return;
        const Comp = mod && (mod.default || null);
        if (Comp) {
          setMonacoComponent(() => Comp);
          setEditorLib('monaco-react');
          return;
        }
      } catch (e) {
        // ignore and try the older package
      }

      try {
        const mod2 = await import('react-monaco-editor');
        if (!mounted) return;
        const Comp2 = mod2 && (mod2.default || mod2.MonacoEditor || null);
        if (Comp2) {
          setMonacoComponent(() => Comp2);
          setEditorLib('react-monaco-editor');
          return;
        }
      } catch (err) {
        console.error('Failed to load any monaco editor package:', err);
        if (!mounted) return;
        setMonacoError(err);
      }
    })();

    return () => { mounted = false; };
  }, []);

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
      {MonacoComponent && !monacoError ? (
        // Two libraries expose slightly different props/signatures. Handle both.
        editorLib === 'monaco-react' ? (
          <MonacoComponent
            height="300px"
            language="cpp"
            theme="vs-dark"
            value={code}
            options={{ automaticLayout: true }}
            onChange={(val) => setCode(val || '')}
          />
        ) : (
          <MonacoComponent
            height="300px"
            language="cpp"
            theme="vs-dark"
            value={code}
            options={{ automaticLayout: true }}
            onChange={(newCode) => setCode(newCode)}
          />
        )
      ) : (
        // Fallback simple textarea editor when Monaco isn't available
        <textarea
          style={{ height: "300px", fontFamily: "monospace", fontSize: 14 }}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      )}

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
