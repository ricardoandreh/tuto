import * as clack from "@clack/prompts";
import initDatabase from "../services/initDatabase.js";
import getUsers from "./getUsers.js";
import { setTimeout as sleep } from "node:timers/promises";
import p from "picocolors";

const oneSecond = 1000;
const welcomeMessage = " 🛠️  Atualize seus usuários! ";

const performUpdateUserName = ({ id: userId }, newValue) => {
  db.run(`
    UPDATE User 
      SET name = "${newValue}" 
      WHERE id = ${userId};
  `);
};

const performUpdateUserAge = ({ id: userId }, newValue) => {
  if (isNaN(+newValue)) {
    db.run("ROLLBACK;");
    clack.cancel("O valor informado não é um número inteiro!");
    return process.exit(0);
  }

  db.run(
    `
      UPDATE User
       SET age = ${newValue} 
       WHERE id = ${userId};
    `,
    (err) => {
      if (err) {
        db.run("ROLLBACK;");
        clack.cancel(err);
        return process.exit(0);
      }
    }
  );
};

async function main() {
  clack.intro(p.bgBlue(p.bold(welcomeMessage)));

  const selectedUser = await clack.select({
    message: "Qual usuário você deseja modificar?",
    options: users.map((user) => {
      return { value: user, label: user.name };
    }),
  });

  if (clack.isCancel(selectedUser)) {
    clack.cancel("Operação cancelada");
    return process.exit(0);
  }

  let fieldOptions = [];
  Object.keys(users[0]).forEach(
    (field) =>
      field !== "id" && fieldOptions.push({ value: field, label: field })
  );

  const fieldsToUpdate = await clack.multiselect({
    message: "Quais informações você deseja alterar?",
    options: fieldOptions,
  });

  if (clack.isCancel(fieldsToUpdate)) {
    clack.cancel("Operação cancelada");
    return process.exit(0);
  }

  let newValue;
  db.run("BEGIN TRANSACTION;");

  for (const field of fieldsToUpdate) {
    newValue = await clack.text({
      message: `Digite o novo valor de "${field}":`,
      validate: (value) =>
        (field === "name" && value.length < 3 && "Nome curto demais") ||
        (field === "age" && value < 15 && "Usuário muito novinho"),
    });

    if (clack.isCancel(newValue)) {
      db.run("ROLLBACK;");
      clack.cancel("Operação cancelada");
      return process.exit(0);
    }

    switch (field) {
      case "name":
        performUpdateUserName(selectedUser, newValue);
        selectedUser.name = newValue;
        break;
      case "age":
        performUpdateUserAge(selectedUser, newValue);
        break;
      default:
        break;
    }
  }

  const shouldUpdate = await clack.confirm({
    message: "Deseja realmente editá-lo?",
    active: "Sim",
    inactive: "Não",
    initialValue: false,
  });

  if (clack.isCancel(shouldUpdate) || !shouldUpdate) {
    db.run("ROLLBACK;");
    clack.cancel("Operação cancelada");
    return process.exit(0);
  }

  const s = clack.spinner();
  s.start("Perfomando a atualização");

  db.run("COMMIT;");
  await sleep(oneSecond * 2);

  s.stop("Usuário atualizado!");

  clack.outro(`Tá de cara nova hein ${selectedUser.name} 😉`);

  db.close();
  await sleep(oneSecond);
}

const db = await initDatabase().catch(console.error);
let users;

try {
  users = await getUsers();

  users && main().catch(console.error);
} catch (err) {
  console.error("Nenhum usuário para atualizar");
}
