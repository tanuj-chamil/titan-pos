import { Sequelize } from "sequelize";
import path from "node:path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, ".."); // Adjust as needed

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(
    process.env.APP_ROOT,
    "./electron/database/database.sqlite3"
  ),
  dialectModule: sqlite3,
  logging: false, // Set to console.log if you want to see SQL queries
});

const syncDatabase = async () => {
  console.log("APP_ROOT:", process.env.APP_ROOT);
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
    await sequelize.sync({ force: false }); // Set to true to drop and recreate the tables
    console.log("Database synchronized");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, syncDatabase };
