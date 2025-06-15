const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

try {
	require('electron-reloader')(module);
} catch {}

const todosPath = path.join(app.getPath('userData'), 'todos.json');
const profilePath = path.join(app.getPath('userData'), 'profile.json');
const settingsPath = path.join(app.getPath('userData'), 'settings.json');
const notificationsPath = path.join(app.getPath('userData'), 'notifications.json');

function loadTodos() {
  try {
    return JSON.parse(fs.readFileSync(todosPath, 'utf8'));
  } catch {
    return [];
  }
}

function saveTodos(todos) {
  fs.writeFileSync(todosPath, JSON.stringify(todos, null, 2));
}

function loadJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function createWindow() {
  const isDev = process.env.NODE_ENV === 'development';
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: !isDev // Disable webSecurity in development only
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, 'src/renderer/index.html'));
  }
}

app.whenReady().then(() => {
  ipcMain.handle('get-todos', () => loadTodos());
  ipcMain.handle('save-todos', (_, todos) => saveTodos(todos));
  ipcMain.handle('get-profile', () => loadJson(profilePath, { name: '', email: '' }));
  ipcMain.handle('save-profile', (_, profile) => saveJson(profilePath, profile));
  ipcMain.handle('get-settings', () => loadJson(settingsPath, { theme: 'light' }));
  ipcMain.handle('save-settings', (_, settings) => saveJson(settingsPath, settings));
  ipcMain.handle('get-notifications', () => loadJson(notificationsPath, []));
  ipcMain.handle('save-notifications', (_, notifications) => saveJson(notificationsPath, notifications));

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

