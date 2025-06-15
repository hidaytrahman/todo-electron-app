const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getTodos: () => ipcRenderer.invoke('get-todos'),
  saveTodos: (todos) => ipcRenderer.invoke('save-todos', todos),
  getProfile: () => ipcRenderer.invoke('get-profile'),
  saveProfile: (profile) => ipcRenderer.invoke('save-profile', profile),
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
  getNotifications: () => ipcRenderer.invoke('get-notifications'),
  saveNotifications: (notifications) => ipcRenderer.invoke('save-notifications', notifications),
});

