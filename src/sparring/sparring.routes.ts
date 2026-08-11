import { Router } from "express"; // Importa o construtor Router do Express para criar o grupo de rotas
import { // Importa os controllers de sparring
  criarSparringController, // Controller para criar um novo sparring
  listarSparringController, // Controller para listar todos os sparrings
  atualizarSparringController, // Controller para atualizar dados de um sparring
  buscarSparringPorIdController, // Controller para consultar um sparring por ID
  deletarSparringPorIdController, // Controller para deletar um sparring por ID
} from "./sparring.controller"; // Módulo de origem dos controllers de sparring
import { // Importa os esquemas de validação do módulo de sparring
  criarSparringSchema, // Schema de validação Zod para criação
  atualizarSparringSchema, // Schema de validação Zod para atualização parcial
} from "./sparring.schema"; // Módulo de origem dos esquemas Zod
import { validate } from "../shared/validate.middleware"; // Importa o middleware de validação

const router = Router(); // Instancia a classe Router do Express

router.post( // Define a rota HTTP POST para '/sparring'
  "/sparring", // Endpoint URL para a rota POST de criação
  validate(criarSparringSchema), // Middleware para validar o corpo da requisição usando o criarSparringSchema
  criarSparringController, // Handler do controller a ser invocado se os dados forem válidos
); // Fecha a rota POST
router.get("/sparring", listarSparringController); // Define a rota HTTP GET '/sparring' para listar todos os sparrings
router.get("/sparring/:id", buscarSparringPorIdController); // Define a rota HTTP GET '/sparring/:id' para buscar sparring por ID
router.patch( // Define a rota HTTP PATCH para atualizar dados parciais do sparring
  "/sparring/:id", // Endpoint da rota com o ID dinâmico do sparring
  validate(atualizarSparringSchema), // Middleware para validar as informações recebidas contra o atualizarSparringSchema
  atualizarSparringController, // Handler do controller executado após validação bem-sucedida
); // Fecha a rota PATCH
router.delete("/sparring/:id", deletarSparringPorIdController); // Define a rota HTTP DELETE '/sparring/:id' para exclusão por ID

export { router }; // Exporta a instância do roteador para ser anexada à aplicação principal Express

