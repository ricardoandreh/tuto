import * as p from "@clack/prompts";

async function main() {
  p.intro("Escolha algumas opções");

  const options = await p.multiselect({
    message: "Opções válidas:",
    options: [
      { value: "1", label: "Opção A" },
      { value: "2", label: "Opção B" },
      { value: "3", label: "Opção C", hint: "vale a pena" },
      { value: "4", label: "Opção D" },
    ],
    initialValues: "14",
    cursorAt: "2",
    required: true,
  });

  p.outro(`Opções >> "${options}"`);
}

main();
