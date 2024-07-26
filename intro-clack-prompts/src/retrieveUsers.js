import sqlite3 from "sqlite3";

const db = new sqlite3.Database(
  "users.db",
  sqlite3.OPEN_READONLY,
  (err) => err && console.error(err.message)
);
const query =
  "SELECT u.name, r.title FROM Users u JOIN Rules r ON u.rule = r.type ORDER BY title, name;";

db.all(query, (err, rows) => {
  if (err) {
    console.error(err.message);
    return;
  }

  if (!rows.length) {
    console.warn("Não há cadastro");
    return;
  }

  console.info("Listagem dos usuários:");
  rows.forEach((row) => {
    const { name, title } = row;

    console.info(`- ${name} tem o cargo de "${title}"`);
  });
});
