import React from 'react';

export default function About() {
  return (
    <div className="container">
      <h1>About</h1>
      <p>This is a simple, modern Electron + React Todo app with multi-page support.</p>
      <ul>
        <li>Built with Electron, React, and Vite</li>
        <li>Persistent todos (local file storage)</li>
        <li>Machine information page</li>
        <li>Easy to extend with more features</li>
      </ul>
    </div>
  );
}
