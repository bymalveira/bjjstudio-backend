import { Router } from "express"; // Importa o utilitário Router do Express para instanciação de rotas
import { // Importa os controllers referentes ao recurso de drills
  criarDrillController, // Controller para criação de drills
  listarDrillsController, // Controller para listagem de drills
  atualizarDrillController, // Controller para atualização de drills
  buscarDrillPorIdController, // Controller para busca de drill por ID
  deletarDrillPorIdController, // Controller para deleção de drill por ID
} from "./drills.controller"; // Módulo de origem dos controllers
import { criarDrillSchema, atualizarDrillSchema } from "./drills.schema"; // Importa os esquemas de validação Zod
import { validate } from "../shared/validate.middleware"; // Importa o middleware genérico de validação de esquemas

const router = Router(); // Instancia o roteador do Express para registrar as rotas de drills

router.post("/drills", validate(criarDrillSchema), criarDrillController); // Rota POST '/drills': valida com criarDrillSchema e chama criarDrillController
router.get("/drills", listarDrillsController); // Rota GET '/drills': chama o controller para listar todos os drills
router.get("/drills/:id", buscarDrillPorIdController); // Rota GET '/drills/:id': chama o controller para obter um drill específico por ID
router.patch( // Rota PATCH para atualizar parcialmente dados de um drill
  "/drills/:id", // URL da rota com o parâmetro dinâmico id
  validate(atualizarDrillSchema), // Middleware de validação para o schema de atualização
  atualizarDrillController, // Controller executado para realizar a atualização
); // Fecha a rota PATCH
router.delete("/drills/:id", deletarDrillPorIdController); // Rota DELETE '/drills/:id': chama o controller para remover o drill

export { router }; // Exporta o roteador de drills para ser montado no app Express

