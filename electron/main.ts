import { app, BrowserWindow, globalShortcut, ipcMain, screen } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { hash, compare } from "bcryptjs";
import { syncDatabase } from "./config/database";
import User from "./models/User";
import Session from "./models/Session";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

let win: BrowserWindow | null;

function createWindow() {
  let factor = screen.getPrimaryDisplay().scaleFactor;
  win = new BrowserWindow({
    minHeight: 800/factor,
    minWidth: 800/factor,
    center: true,
    icon: path.join(process.env.APP_ROOT, "public", "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      devTools: !app.isPackaged,
      zoomFactor: 1.0 / factor,
    },
  });

  win.maximize();
  win.menuBarVisible = false;

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(async () => {
  createWindow();
  console.log("APP_ROOT:", process.env.APP_ROOT);
  await syncDatabase();

  ipcMain.handle("login-request", async (event, args) => {
    const { username, password } = args;
    let token = { status: 400, session: "" };

    try {
      const users = await User.findAll({ where: { username } });
      if (users.length === 0) {
        token = { status: 404, session: "" };
      } else {
        const dbuser = users[0];
        const isMatch = await compare(password, dbuser.passhash);

        if (isMatch) {
          const starttimestamp = new Date().toISOString();
          const endtimestamp = null; // Session is ongoing
          const active = 1;

          // Deactivate any previous active sessions for the user
          await Session.update(
            { active: 0, endtimestamp: starttimestamp },
            { where: { username, active: 1 } }
          );

          const sessionuuid = crypto.randomUUID();
          await Session.create({
            username,
            sessionuuid,
            starttimestamp,
            endtimestamp,
            active,
          });

          token = { status: 200, session: sessionuuid };
        } else {
          token = { status: 401, session: "" };
        }
      }
    } catch (err) {
      console.error(err);
    }

    return token;
  });
});

app.on('browser-window-focus', () => {
  const chromiumShortcuts  = [
    'CommandOrControl+R', // Reload
    'CommandOrControl+Shift+R', // Hard Reload
    'CommandOrControl+Shift+I', // Toggle DevTools
    'F11',
    'F5'
  ];

  globalShortcut.registerAll(chromiumShortcuts, () => {
    console.log(`Chromium Shortcut Blocked`);
  });
})