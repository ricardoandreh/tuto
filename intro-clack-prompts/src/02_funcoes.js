import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";

async function main() {
  p.intro("Apresentando as funções");

  p.note("Farás teste!\nnpm run test", "Dica do dia");

  p.log.message("esse é o caminho");
  p.log.info("agora é oficial!");
  p.log.success("está correto");
  p.log.step("Passo ...");
  p.log.warn("não me parece certo");
  p.log.error("Ocorreu um erro");

  const s = p.spinner();

  s.start("Iniciada a ação");
  await setTimeout(1000 * 2);

  s.message("Finalizando");
  await setTimeout(1000 * 2);
  s.message("Toques finais");
  await setTimeout(1000 * 2);

  s.stop("De volta ao normal");
  await setTimeout(1000);

  p.outro("É isso");

  p.cancel("Operação cancelada");
}

main();
