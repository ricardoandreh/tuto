import * as p from "@clack/prompts";

const grupo = await p.group(
  {
    nome: () => p.text({ message: "Qual é seu nome?" }),
    idade: () => p.text({ message: "Qual é sua idade?" }),
    cor: ({ results }) =>
      p.multiselect({
        message: `Qual é sua cor favorita ${results.name}?`,
        options: [
          { value: "vermelho", label: "Vermelho" },
          { value: "verde", label: "Verde" },
          { value: "azul", label: "Azul" },
        ],
      }),
  },
  {
    onCancel: ({ results }) => {
      p.cancel("Operação cancelada");
      process.exit(0);
    },
  }
);

console.log(grupo.nome, grupo.idade, grupo.cor);
