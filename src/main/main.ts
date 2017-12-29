import { app, BrowserWindow } from 'electron';
import { startBackend } from './backend';

console.log("Bla");

const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
  });

  const url = isDevelopment ? `http://localhost:8000` : `file://${__dirname}/index.html`;

  console.log(url);

  mainWindow.loadURL(url);

  startBackend();
});

app.on('window-all-closed', () => {
  app.quit();
});
