import React, { useState, useEffect } from "react";

function CodeEditor({ onSubmit, initialCode }) {
  const defaultCode = `#include <iostream>\nusing namespace std;\nint main(){\n    cout << "Hello, World!" << endl;\n    return 0;\n}`;
  const [code, setCode] = useState(initialCode || defaultCode);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [MonacoComponent, setMonacoComponent] = useState(null);
  const [monacoError, setMonacoError] = useState(null);
  const [editorLib, setEditorLib] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const mod = await import('@monaco-editor/react');
        if (!mounted) return;
        const Comp = mod.default || null;
        if (Comp) {
          setMonacoComponent(() => Comp);
          setEditorLib('monaco-react');
          return;
        }
      } catch (e) {}

      try {
        const mod2 = await import('react-monaco-editor');
        if (!mounted) return;
        const Comp2 = mod2.default || mod2.MonacoEditor || null;
        if (Comp2) {
          setMonacoComponent(() => Comp2);
          setEditorLib('react-monaco-editor');
          return;
        }
      } catch (err) {
        console.error('Failed to load any monaco editor package:', err);
        if (mounted) setMonacoError(err);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="code-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',           // Critical: take full height of parent
      }}
    >
      {/* ===== EDITOR: fills all remaining space ===== */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
        {MonacoComponent && !monacoError ? (
          editorLib === 'monaco-react' ? (
            <MonacoComponent
              language="cpp"
              theme="vs-dark"
              value={code}
              options={{ automaticLayout: true }}
              onChange={(val) => setCode(val ?? '')}
            />
          ) : (
            <MonacoComponent
              language="cpp"
              theme="vs-dark"
              value={code}
              options={{ automaticLayout: true }}
              onChange={setCode}
            />
          )
        ) : (
          <textarea
            style={{
              width: '100%',
              height: '100%',
              fontFamily: 'monospace',
              fontSize: 14,
              resize: 'none',
              border: 'none',
              outline: 'none',
              padding: 8,
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
            }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        )}
      </div>

      {/* ===== RUN BUTTON ===== */}
      <button
        onClick={handleRun}
        disabled={loading}
        style={{
          padding: '10px 16px',
          fontSize: 14,
          cursor: loading ? 'not-allowed' : 'pointer',
          backgroundColor: '#007acc',
          color: 'white',
          border: 'none',
        }}
      >
        {loading ? "Running…" : "Run Code"}
      </button>

      {/* ===== OUTPUT PANEL: fixed height + scroll ===== */}
      <pre
        style={{
          padding: 12,
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          fontSize: 13,
          fontFamily: 'monospace',
          height: 180,                    // Fixed height
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          margin:"0"
        }}
      >
        {output || 'Output will appear here...'}
      </pre>
    </div>
  );
}

export default CodeEditor;