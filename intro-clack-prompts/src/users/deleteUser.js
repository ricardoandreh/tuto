import * as clack from "@clack/prompts";
import initDatabase from "../services/initDatabase.js";
import getUsers from "./getUsers.js";
import { setTimeout as sleep } from "node:timers/promises";
import p from "picocolors";

const oneSecond = 1000;
const welcomeMessage = " 💀 Remova seus usuários! ";

async function main() {
  clack.intro(p.bgRed(p.bold(welcomeMessage)));

  const rejectedUser = await clack.select({
    message: "Qual usuário você deseja deletar?",
    options: users.map((user) => {
      return { value: user, label: user.name };
    }),
  });

  if (clack.isCancel(rejectedUser)) {
    clack.cancel("Operação cancelada");
    return process.exit(0);
  }

  const reason = await clack.password({
    message: "Qual motivo da remoção dele? (confidencial, confia)",
    validate: (value) => value.length < 3 && "Sério, motivo fútil hein",
  });

  if (clack.isCancel(reason)) {
    clack.cancel("Operação cancelada");
    return process.exit(0);
  }

  const shouldDelete = await clack.confirm({
    message: "Deseja realmente exclui-lo?",
    active: "Sim",
    inactive: "Não",
    initialValue: false,
  });

  if (clack.isCancel(shouldDelete) || !shouldDelete) {
    clack.cancel("Operação cancelada");
    return process.exit(0);
  }

  const s = clack.spinner();
  s.start("Perfomando a remoção");

  db.serialize(() => {
    db.run("BEGIN TRANSACTION");
    db.run(`
      DELETE
       FROM User 
       WHERE id = ${rejectedUser.id}
    `);
    db.run("COMMIT");
  });

  await sleep(oneSecond * 2);

  s.stop("Usuário removido!");

  clack.outro(`Bye bye ${rejectedUser.name} 👋 Quem mandou ${reason}`);

  db.close();
  await sleep(oneSecond);
}

const db = await initDatabase().catch(console.error);
let users;

try {
  users = await getUsers();

  users && main().catch(console.error);
} catch (err) {
  console.error("Nenhum usuário para remover");
}
