import React, { useState, useEffect } from 'react';

export default function Settings() {
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    window.api.getSettings().then(settings => {
      setTheme(settings.theme || 'light');
      setLoading(false);
    });
  }, []);

  const saveSettings = async (theme) => {
    setTheme(theme);
    await window.api.saveSettings({ theme });
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  if (loading) return <div className="container"><h1>Settings</h1><p>Loading...</p></div>;

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
            onChange={() => saveSettings('light')}
          />
          Light Theme
        </label>
        <label style={{ marginLeft: 16 }}>
          <input
            type="radio"
            name="theme"
            value="dark"
            checked={theme === 'dark'}
            onChange={() => saveSettings('dark')}
          />
          Dark Theme
        </label>
      </div>
      <p style={{ marginTop: 16 }}>Current theme: <b>{theme}</b> {saved && <span style={{ color: 'green', marginLeft: 12 }}>Saved!</span>}</p>
      {/* You can add more settings here */}
    </div>
  );
}
