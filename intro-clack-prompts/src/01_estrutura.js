import * as p from "@clack/prompts";

async function main() {
  p.intro("Cardápio");

  const nome = await p.text({
    message: "Digite seu nome:",
  });

  if (p.isCancel(nome)) {
    p.cancel("Operação cancelada");
    return process.exit(0);
  }

  const comidaFavorita = await p.select({
    message: "Selecione sua comida favorita:",
    options: [
      { value: "lasanha", label: "Lasanha" },
      { value: "chocolate", label: "Chocolate" },
      { value: "salada", label: "Salada", hint: "vai lá oh fit" },
    ],
  });

  if (p.isCancel(comidaFavorita)) {
    p.cancel("Operação cancelada");
    return process.exit(0);
  }

  p.outro(`${nome} ama comer ${comidaFavorita}`);
}

main();
