import React, { useState } from 'react';

export default function UserProfile() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');

  return (
    <div className="container">
      <h1>User Profile</h1>
      <form style={{ maxWidth: 400, margin: '0 auto' }}>
        <div style={{ marginBottom: 16 }}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>
      </form>
      <div style={{ marginTop: 24 }}>
        <b>Preview:</b>
        <div>Name: {name}</div>
        <div>Email: {email}</div>
      </div>
    </div>
  );
}
