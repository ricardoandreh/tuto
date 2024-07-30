import * as p from "@clack/prompts";

async function main() {
  p.intro("Escolha a opção");

  const option = await p.select({
    message: "Opções válidas:",
    options: [
      { value: "1", label: "Opção 1" },
      { value: "2", label: "Opção 2" },
      { value: "3", label: "Opção 3" },
    ],
    initialValue: "2",
  });

  p.outro(`Opção >> "${option}"`);
}

main();
