import { Router } from "express"; // Importa a função Router do Express para gerenciar o roteamento
import { // Importa os controladores do módulo estatístico
  passagensPorGuardaController, // Controller para obter a quantidade de passagens por tipo de guarda
  historicoContraParceiroController, // Controller para obter o histórico contra um parceiro específico
  contarDrillsPorPeriodoController, // Controller para contar drills realizados em um intervalo de datas
} from "./stats.controller"; // Módulo de origem dos controllers estatísticos

const router = Router(); // Instancia um novo roteador do Express

router.get("/passagens-por-guarda", passagensPorGuardaController); // Rota GET '/passagens-por-guarda' mapeada para o controller passagensPorGuardaController
router.get("/historico-de-parceiro/:id", historicoContraParceiroController); // Rota GET '/historico-de-parceiro/:id' mapeada para o controller historicoContraParceiroController
router.get("/drills", contarDrillsPorPeriodoController); // Rota GET '/drills' mapeada para o controller contarDrillsPorPeriodoController

export { router }; // Exporta o roteador estatístico para inclusão no app Express

