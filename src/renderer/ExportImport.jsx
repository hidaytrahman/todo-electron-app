import React, { useRef, useState, useEffect } from 'react';

export default function ExportImport() {
  const fileInput = useRef();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    window.api.getTodos().then(setTodos);
    const handler = (e) => setTodos(e.detail);
    window.addEventListener('import-todos', handler);
    return () => window.removeEventListener('import-todos', handler);
  }, []);

  const handleExport = () => {
    const dataStr = JSON.stringify(todos, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'todos-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          window.api.saveTodos(imported).then(() => {
            window.dispatchEvent(new CustomEvent('import-todos', { detail: imported }));
          });
        } else {
          alert('Invalid file format.');
        }
      } catch {
        alert('Failed to parse file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="container">
      <h1>Export / Import Todos</h1>
      <button onClick={handleExport} disabled={todos.length === 0}>Export Todos</button>
      <input
        type="file"
        accept="application/json"
        ref={fileInput}
        style={{ display: 'none' }}
        onChange={handleImport}
      />
      <button onClick={() => fileInput.current.click()} style={{ marginLeft: 16 }}>
        Import Todos
      </button>
      <p style={{ marginTop: 16, color: '#888' }}>
        Export downloads your todos as a JSON file. Import loads todos from a JSON file.<br/>
        Imported todos will replace your current list.
      </p>
    </div>
  );
}
