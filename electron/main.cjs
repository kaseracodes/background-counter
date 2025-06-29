const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const path = require('path');

let tray = null;
let mainWindow = null;
let counter = 0;
const isDev = !app.isPackaged;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    const indexPath = path.join(app.getAppPath(), 'dist', 'index.html');
    console.log('Trying to load:', indexPath);
    mainWindow.loadFile(indexPath);
  }

  // mainWindow.loadURL('http://localhost:5173');

  mainWindow.on('close', (e) => {
    e.preventDefault();
    mainWindow.hide();
  });
}

app.whenReady().then(() => {
  createWindow();

  tray = new Tray(path.join(__dirname, 'icon.png')); // Replace with a real icon
  tray.setToolTip('Counter App');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Show', click: () => mainWindow.show() },
    { label: 'Quit', click: () => app.quit() }
  ]));

  setInterval(() => {
    counter++;
    console.log('Counter electron/main.cjs:', counter);
  }, 1000);
});

ipcMain.handle('get-counter', async () => {
  return counter;
});
