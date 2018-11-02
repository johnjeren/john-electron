// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const {autoUpdater} = require('electron-updater');
const isDev = require('electron-is-dev');
const path = require('path');


// Setup logger
autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';

// Setup updater events
autoUpdater.on('checking-for-update', () => {
  console.log('Checking for updates...');
});

autoUpdater.on('update-available', (info) => {
  console.log('Update available');
  console.log('Version',info.version);
  console.log('Release Date', info.releaseDate);

});

autoUpdater.on('update-not-available', (progress) => {
  console.log('Progress ${Matt.floor(progress.percent)}');
});

autoUpdater.on('update-downloaded', (info) => {
  console.log('Update downloaded');
  autoUpdater.quitAndInstall();
});

autoUpdater.on('error', (error) => {
  console.error(error);
});
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  import * as Splashscreen from "@trodi/electron-splashscreen";
const mainOpts: Electron.BrowserWindowConstructorOptions = ...
// configure the splashscreen
const config: Splashscreen.Config = {
    windowOpts: mainOpts;
    templateUrl: `${__dirname}/splash-screen.html`;
    splashScreenOpts: {
        width: 425,
        height: 325,
    },
};
// initialize the splashscreen handling
const main: BrowserWindow = Splashscreen.initSplashScreen(config);
// load your browser window per usual
main.loadURL(`file://index.html`);

  if(!isDev) {
    autoUpdater.checkForUpdatesAndNotify();
  }
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, frame:false})

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
