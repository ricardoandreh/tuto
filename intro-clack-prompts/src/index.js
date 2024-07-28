import * as clack from "@clack/prompts";
import initDatabase from "./services/initDatabase.js";
import { setTimeout as sleep } from "node:timers/promises";
import p from "picocolors";

const oneSecond = 1000;
const welcomeMessage = " 🧒 Cadastre seus usuários! ";
const ROLES = {
  E: "Estudante",
  P: "Professor",
  D: "Diretor",
};

async function main() {
  clack.intro(p.inverse(p.cyan(p.bold(welcomeMessage))));

  const name = await clack.text({
    message: "Nome do usuário:",
    placeholder: "user...",
    validate: (value) => value.length < 3 && "Nome curto demais",
  });

  if (clack.isCancel(name)) {
    clack.cancel("Operação cancelada");
    return process.exit(0);
  }

  const role = await clack.select({
    message: "Selecione seu cargo:",
    options: [
      { value: "E", label: "Estudante" },
      { value: "P", label: "Professor" },
      { value: "D", label: "Diretor", hint: "diretoria na área hein" },
    ],
  });

  if (clack.isCancel(role)) {
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
    db.run(`INSERT INTO User (name, role) VALUES ("${name}", "${role}")`);
    db.run("COMMIT");
  });

  await sleep(oneSecond * 2);
  s.message("Finalizando");

  await sleep(oneSecond * 2);
  s.stop("Usuário criado!");

  clack.note(
    p.blue("pnpm read") +
      "    // listar usuários\n" +
      p.blue("pnpm modify") +
      "  // alterar dados\n" +
      p.blue("pnpm delete") +
      "  // remover usuário",
    p.bgYellow(p.bold(" Dica "))
  );

  await sleep(oneSecond / 2);

  clack.outro(`Seja bem vindo ${name} (${ROLES[role]}) 🤗`);

  db.close();
  await sleep(oneSecond);
}

const db = await initDatabase().catch(console.error);
main().catch(console.error);
