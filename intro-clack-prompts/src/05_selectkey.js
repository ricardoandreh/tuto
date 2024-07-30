import * as p from "@clack/prompts";

async function main() {
  p.intro("Escolha a opção");

  const option = await p.selectKey({
    message: "Opções válidas:",
    options: [
      { value: "1", label: "Alternativa A" },
      { value: "2", label: "Alternativa B" },
      { value: "3", label: "Alternativa C" },
      { value: "4", label: "Alternativa D", hint: "leia com cuidado" },
    ],
    initialValue: "3",
  });

  p.outro(`Opção >> "${option}"`);
}

main();
