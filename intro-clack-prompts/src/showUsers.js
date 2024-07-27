import sqlite3 from "sqlite3";

const db = new sqlite3.Database(
  "users.db",
  sqlite3.OPEN_READONLY,
  (err) => err && console.error(err.message)
);
const query =
  "SELECT name, age, r.title FROM User u JOIN Role r ON u.role = r.type ORDER BY title, name;";

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
    const { name, title, age } = row;

    console.info(
      `- ${name} ${age ? "(" + age + " anos) " : ""}tem o cargo de "${title}"`
    );
  });
});
