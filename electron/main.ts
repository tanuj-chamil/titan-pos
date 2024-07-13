import { app, BrowserWindow, ipcMain, session } from "electron";
// import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { hash, compare } from "bcryptjs";
import { Database } from "sqlite3";
import { getSqlite3 } from "./sqlite3";

// const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __filename = fileURLToPath(import.meta.url);

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    minHeight: 800,
    minWidth: 800,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  createWindow();

  let db: Database;
  getSqlite3()
    .then((database) => {
      db = database;
      // Enable foreign key support
      db.run("PRAGMA foreign_keys = ON;");

      // Create users table
      db.run(`CREATE TABLE IF NOT EXISTS users (
      username TEXT PRIMARY KEY,
      admin INTEGER NOT NULL CHECK (admin IN (0, 1)),
      passhash TEXT NOT NULL
    );`);

      // Create sessions table with foreign key constraint
      db.run(`CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sessionuuid TEXT NOT NULL,
      username TEXT NOT NULL,
      starttimestamp TEXT NOT NULL,
      endtimestamp TEXT,
      active INTEGER NOT NULL CHECK (active IN (0, 1)),
      FOREIGN KEY (username) REFERENCES users(username)
    );`);
    })
    .catch((err) => {
      console.log(err);
    });

  ipcMain.handle("login-request", async (event, args: User) => {
    const sql = `SELECT * FROM users WHERE username ='${args.username}'`;
    const password = args.password;
    const username = args.username;
    let token: Token = { status: 400, session: "" };

    console.log(sql);

    try {
      const users = await new Promise<DBUser[]>((resolve, reject) => {
        db.all(sql, (err, rows: DBUser[]) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
      let isMatch = false;
      if (users.length == 0) {
        token = { status: 404, session: "" };
      } else {
        const dbuser = users[0];
        isMatch = await new Promise<boolean>((resolve, reject) => {
          compare(password, dbuser.passhash, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      }

      if (isMatch) {
        const starttimestamp = new Date().toISOString();
        const endtimestamp = null; // Session is ongoing
        const active = 1;

        // Deactivate any previous active sessions for the user
        const deactivateSql = `UPDATE sessions SET active = 0, endtimestamp = ? WHERE username = ? AND active = 1`;
        await new Promise<void>((resolve, reject) => {
          db.run(deactivateSql, [starttimestamp, username], (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });

        const uuid = crypto.randomUUID();
        const sql = `INSERT INTO sessions (username, sessionuuid, starttimestamp, endtimestamp, active) 
        VALUES (?, ?, ?, ?, ?);`;

        await new Promise<void>((resolve, reject) => {
          db.run(
            sql,
            [username, uuid, starttimestamp, endtimestamp, active],
            function (err) {
              if (err) reject(err);
              else resolve();
            }
          );
        });

        token = { status: 200, session: uuid };
      } else {
        token = { status: 401, session: "" };
      }
    } catch (err) {
      console.error(err);
    }
    console.log(token);
    return token;
  });
});
