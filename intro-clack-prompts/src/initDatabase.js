import sqlite3 from "sqlite3";

export default async function initDatabase() {
  const db = new sqlite3.Database("users.db");

  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS Rules (
        type CHAR(1) PRIMARY KEY,
        title TEXT,
        num INTEGER UNIQUE
      );
    `);

    db.run(`
      INSERT OR IGNORE INTO Rules VALUES
      ('P', "Principal", 1),
      ('T', "Teacher", 2),
      ('S', "Student", 3);
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        rule TEXT NOT NULL,
        FOREIGN KEY(rule) REFERENCES Rules(type)
      );
    `);
  });

  return db
}
