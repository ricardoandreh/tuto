import sqlite3 from "sqlite3";

export default async function initDatabase() {
  const db = new sqlite3.Database("users.db");

  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS Role (
        type CHAR(1) PRIMARY KEY,
        title TEXT,
        num INTEGER UNIQUE
      );
    `);

    db.run(`
      INSERT OR IGNORE INTO Role VALUES
      ('P', "Principal", 1),
      ('T', "Teacher", 2),
      ('S', "Student", 3);
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS User (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INT CHECK(age >= 15),
        role TEXT NOT NULL,
        FOREIGN KEY(role) REFERENCES Role(type)
      );
    `);
  });

  return db;
}
