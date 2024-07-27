import sqlite3 from "sqlite3";

export default async function getUsers() {
  const db = new sqlite3.Database(
    "users.db",
    sqlite3.OPEN_READONLY,
    (err) => err && console.error(err.message)
  );

  return new Promise((resolve, reject) =>
    db.all("SELECT id, name, age FROM User;", (err, rows) => {
      if (err) return reject(err.message);

      if (!rows.length) {
        console.warn("Não há cadastro");
        return reject(rows);
      }

      return resolve(rows);
    })
  );
}
