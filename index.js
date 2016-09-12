const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

const getScreenSize = require('./modules/main/get-screen-size');

let mainWindow;

app.on('ready', () => {
  createWindow();
  const buildFromTemplate = require('./modules/main/build-menu-template');
  const menu = Menu.buildFromTemplate(buildFromTemplate(mainWindow));
  Menu.setApplicationMenu(menu);
});

app.on('activate', (e) => {
  mainWindow.setIgnoreMouseEvents(false);
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

function createWindow() {
  let size = getScreenSize();
  let settings = {
    transparent: true,
    frame: false,
    //resizable: false,
    alwaysOnTop: true,
    hasShadow: false
  };

  mainWindow = new BrowserWindow(Object.assign(settings,size));
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}
