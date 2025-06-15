import React from 'react';

export default function MachineInfo() {
  return (
    <div className="container">
      <h1>Machine Information</h1>
      <ul>
        <li><strong>Platform:</strong> {window.navigator.platform}</li>
        <li><strong>User Agent:</strong> {window.navigator.userAgent}</li>
        <li><strong>Language:</strong> {window.navigator.language}</li>
        {/* Add more machine info as needed */}
      </ul>
    </div>
  );
}
