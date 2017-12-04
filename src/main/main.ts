import { app, BrowserWindow } from 'electron';
import { startBackend } from './backend';

const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
  });

  const url = isDevelopment ? `http://localhost:8000` : `file://${__dirname}/index.html`

  mainWindow.loadURL(url);

  startBackend();
});

app.on('window-all-closed', () => {
  app.quit();
});
