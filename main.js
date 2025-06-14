const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const todosPath = path.join(app.getPath('userData'), 'todos.json');

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

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  ipcMain.handle('get-todos', () => loadTodos());
  ipcMain.handle('save-todos', (_, todos) => saveTodos(todos));

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

