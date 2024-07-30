import * as p from "@clack/prompts";

async function main() {
  p.intro("Olá desconhecido");

  const name = await p.text({
    message: "Informe seu nome:",
  });

  p.outro(`Seja bem vindo ${name}`);
}

main();
