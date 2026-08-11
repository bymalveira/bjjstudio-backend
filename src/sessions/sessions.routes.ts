import { Router } from "express"; // Importa a função Router do Express para gerenciar rotas
import { // Importa os controllers referentes às sessões de treino
  criarSessaoController, // Controller para criar uma nova sessão de treino
  listarSessoesController, // Controller para listar todas as sessões de treino
  atualizarSessaoController, // Controller para atualizar dados de uma sessão
  buscarSessaoPorIdController, // Controller para obter detalhes de uma sessão por ID
  deletarSessaoPorIdController, // Controller para excluir uma sessão por ID
} from "./sessions.controller"; // Módulo de onde são importados os controllers de sessão
import { criarSessaoSchema, atualizarSessaoSchema } from "./sessions.schema"; // Importa os schemas de validação Zod para criação e atualização
import { validate } from "../shared/validate.middleware"; // Importa a função middleware de validação de schemas

const router = Router(); // Instancia um novo objeto de rotas do Express

router.post("/sessions", validate(criarSessaoSchema), criarSessaoController); // Rota POST '/sessions': valida os dados com criarSessaoSchema e executa o criarSessaoController
router.get("/sessions", listarSessoesController); // Rota GET '/sessions': executa o controller para listar todas as sessões
router.get("/sessions/:id", buscarSessaoPorIdController); // Rota GET '/sessions/:id': executa o controller para obter os detalhes da sessão com o ID especificado
router.patch( // Rota PATCH para atualização parcial dos dados da sessão de treino
  "/sessions/:id", // URL da rota recebendo o parâmetro dinâmico id
  validate(atualizarSessaoSchema), // Executa o middleware de validação usando o atualizarSessaoSchema
  atualizarSessaoController, // Executa o controller para aplicar as alterações na sessão
); // Fecha a definição da rota PATCH
router.delete("/sessions/:id", deletarSessaoPorIdController); // Rota DELETE '/sessions/:id': invoca o controller para remover a sessão pelo ID

export { router }; // Exporta o roteador de sessões para ser incorporado no aplicativo principal Express

