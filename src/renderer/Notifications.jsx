import React, { useState, useEffect } from 'react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.api.getNotifications().then(n => {
      setNotifications(Array.isArray(n) ? n : []);
      setLoading(false);
    });
  }, []);

  const markRead = async (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    await window.api.saveNotifications(updated);
  };

  const clearAll = async () => {
    setNotifications([]);
    await window.api.saveNotifications([]);
  };

  if (loading) return <div className="container"><h1>Notifications</h1><p>Loading...</p></div>;

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
