import React, { useState } from 'react';

export default function Settings() {
  const [theme, setTheme] = useState('light');

  return (
    <div className="container">
      <h1>Settings</h1>
      <div>
        <label>
          <input
            type="radio"
            name="theme"
            value="light"
            checked={theme === 'light'}
            onChange={() => setTheme('light')}
          />
          Light Theme
        </label>
        <label style={{ marginLeft: 16 }}>
          <input
            type="radio"
            name="theme"
            value="dark"
            checked={theme === 'dark'}
            onChange={() => setTheme('dark')}
          />
          Dark Theme
        </label>
      </div>
      <p style={{ marginTop: 16 }}>Current theme: <b>{theme}</b></p>
      {/* You can add more settings here */}
    </div>
  );
}
