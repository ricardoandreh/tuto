import * as p from "@clack/prompts";

async function main() {
  p.intro("Configure uma senha");

  const pass = await p.password({
    message: "Digite sua senha:",
    mask: "*",
    validate: (value) => value.length < 8 && "Senha curta demais",
  });

  p.outro(`Senha informada: ${pass}`);
}

main();
