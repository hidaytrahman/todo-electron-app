const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getTodos: () => ipcRenderer.invoke('get-todos'),
  saveTodos: (todos) => ipcRenderer.invoke('save-todos', todos),
});

