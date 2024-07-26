export default async function getUsers(db) {
  return new Promise((resolve, reject) =>
    db.all("SELECT id, name FROM Users;", (err, rows) => {
      if (err) return reject(err.message);

      if (!rows.length) {
        console.warn("Não há cadastro");
        return reject(rows);
      }

      return resolve(rows);
    })
  );
}
