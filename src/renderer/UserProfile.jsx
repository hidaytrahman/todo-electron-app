import React, { useState, useEffect } from 'react';

export default function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    window.api.getProfile().then(profile => {
      setName(profile.name || '');
      setEmail(profile.email || '');
      setLoading(false);
    });
  }, []);

  const saveProfile = async () => {
    await window.api.saveProfile({ name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  if (loading) return <div className="container"><h1>User Profile</h1><p>Loading...</p></div>;

  return (
    <div className="container">
      <h1>User Profile</h1>
      <form style={{ maxWidth: 400, margin: '0 auto' }} onSubmit={e => { e.preventDefault(); saveProfile(); }}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="profile-name">Name:</label>
          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="profile-email">Email:</label>
          <input
            id="profile-email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>
        <button type="submit">Save Profile</button>
        {saved && <span style={{ color: 'green', marginLeft: 12 }}>Saved!</span>}
      </form>
      <div style={{ marginTop: 24 }}>
        <b>Preview:</b>
        <div>Name: {name}</div>
        <div>Email: {email}</div>
      </div>
    </div>
  );
}
