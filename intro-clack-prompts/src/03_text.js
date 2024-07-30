import * as p from "@clack/prompts";

async function main() {
  p.intro("Olá desconhecido");

  const name = await p.text({
    message: "Informe seu nome:",
    placeholder: "usuario1",
    defaultValue: "indefinido",
    initialValue: "Sr. ",
    validate: (value) => value === "ric" && "ric não!",
  });

  p.outro(`Seja bem vindo ${name}`);
}

main();
