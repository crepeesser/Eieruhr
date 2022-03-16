const { app, BrowserWindow } = require('electron')
const { autoUpdater } = require("electron-updater")
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
    }
  })
  
  win.removeMenu()
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  autoUpdater.checkForUpdates()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

autoUpdater.on('update-downloaded',  (ev, info) => {
  setTimeout(function()  {
    autoUpdater.quitAndInstall();  
  }, 5000)
})