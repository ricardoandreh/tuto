import * as p from "@clack/prompts";

async function main() {
  p.intro("Faça a confirmação");

  const hasAccepted = await p.confirm({
    message: "Você deseja aceitar?",
    active: "Claro",
    inactive: "Melhor não",
    initialValue: false,
  });

  p.outro(`Pedido ${options ? "aceito" : "recusado"}`);
}

main();
