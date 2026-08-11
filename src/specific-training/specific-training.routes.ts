import { Router } from "express"; // Importa o construtor de rotas Router do framework Express
import { // Importa os controladores referentes aos treinos específicos
  criarEspecificoController, // Controller para criar treino específico
  atualizarEspecificoController, // Controller para atualizar treino específico
  buscarEspecificoPorIdController, // Controller para buscar treino específico por ID
  deletarEspecificoPorIdController, // Controller para deletar treino específico por ID
  listarEspecificoController, // Controller para listar todos os treinos específicos
} from "./specific-training.controller"; // Módulo de origem dos controllers
import { // Importa os schemas Zod de validação
  criarEspecificoSchema, // Schema para criação de treino específico
  atualizarEspecificoSchema, // Schema para atualização de treino específico
} from "./specific-training.schema"; // Módulo de origem dos esquemas
import { validate } from "../shared/validate.middleware"; // Importa o middleware generativo de validação

const router = Router(); // Instancia o roteador do Express

router.post( // Define a rota HTTP POST para '/specific-training'
  "/specific-training", // Caminho URL da rota de criação
  validate(criarEspecificoSchema), // Aplica o middleware validando a requisição com criarEspecificoSchema
  criarEspecificoController, // Executa o controller para criar o registro se validado
); // Fecha a rota POST
router.get("/specific-training", listarEspecificoController); // Define a rota HTTP GET '/specific-training' para listagem
router.get("/specific-training/:id", buscarEspecificoPorIdController); // Define a rota HTTP GET '/specific-training/:id' para busca por ID
router.patch( // Define a rota HTTP PATCH para atualizações parciais
  "/specific-training/:id", // Caminho URL com o ID dinâmico
  validate(atualizarEspecificoSchema), // Aplica o middleware validando a requisição com atualizarEspecificoSchema
  atualizarEspecificoController, // Chama o controller responsável pela atualização
); // Fecha a rota PATCH
router.delete("/specific-training/:id", deletarEspecificoPorIdController); // Define a rota HTTP DELETE '/specific-training/:id' para exclusão por ID

export { router }; // Exporta o roteador configurado para o recurso de treino específico

