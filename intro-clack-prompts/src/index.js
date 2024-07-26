import * as clack from "@clack/prompts";
import initDatabase from "./initDatabase.js";
import { setTimeout as sleep } from "node:timers/promises";
import p from "picocolors";

const oneSecond = 1000;
const welcomeMessage = " 🧒 Cadastre seus usuários! ";
const RULES = {
  S: "Estudante",
  T: "Professor",
  P: "Diretor",
};

async function main() {
  clack.intro(p.inverse(p.cyan(p.bold(welcomeMessage))));

  const name = await clack.text({
    message: "Nome do usuário:",
    placeholder: "user...",
  });

  if (clack.isCancel(name)) {
    clack.cancel("Operação cancelada");
    return process.exit(0);
  }

  const rule = await clack.select({
    message: "Selecione seu cargo:",
    options: [
      { value: "S", label: "Estudante" },
      { value: "T", label: "Professor" },
      { value: "P", label: "Diretor", hint: "diretoria na área hein" },
    ],
  });

  if (clack.isCancel(rule)) {
    clack.cancel("Operação cancelada");
    return process.exit(0);
  }

  const shouldCreate = await clack.confirm({
    message: "Deseja realmente criá-lo?",
    active: "Sim",
    inactive: "Não",
    initialValue: false,
  });

  if (clack.isCancel(shouldCreate) || !shouldCreate) {
    clack.cancel("Operação cancelada");
    return process.exit(0);
  }

  const s = clack.spinner();
  s.start("Perfomando a criação");

  db.serialize(() => {
    db.run("BEGIN TRANSACTION");
    db.run(`INSERT INTO Users (name, rule) VALUES ("${name}", "${rule}")`);
    db.run("COMMIT");
  });

  await sleep(oneSecond * 2);

  s.stop("Usuário criado!");

  clack.outro(`Seja bem vindo ${name} (${RULES[rule]}) 🤗`);

  db.close();
  await sleep(oneSecond);
}

const db = await initDatabase().catch(console.error);
main().catch(console.error);
