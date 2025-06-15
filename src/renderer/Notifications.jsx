import React, { useState } from 'react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Welcome to the app!', read: false },
    { id: 2, message: 'Try the new Machine Info page!', read: false },
  ]);

  const markRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAll = () => setNotifications([]);

  return (
    <div className="container">
      <h1>Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        <ul style={{ maxWidth: 500, margin: '0 auto' }}>
          {notifications.map(n => (
            <li key={n.id} style={{ background: n.read ? '#e9ecef' : '#fff', padding: 12, borderRadius: 6, marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{n.message}</span>
              {!n.read && (
                <button onClick={() => markRead(n.id)} style={{ marginLeft: 16 }}>Mark as read</button>
              )}
            </li>
          ))}
        </ul>
      )}
      {notifications.length > 0 && (
        <button onClick={clearAll} style={{ marginTop: 16 }}>Clear All</button>
      )}
    </div>
  );
}
