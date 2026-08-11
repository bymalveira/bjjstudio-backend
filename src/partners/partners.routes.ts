import { Router } from "express"; // Importa a função Router da biblioteca Express para definição de rotas
import { // Importa todos os controllers de parceiro
  criarParceiroController, // Controller de criação de parceiros
  listarParceirosController, // Controller de listagem de parceiros
  atualizarParceiroController, // Controller de atualização de parceiros
  buscarParceiroPorIdController, // Controller de busca por ID de parceiro
  deletarParceiroPorIdController, // Controller de exclusão de parceiro por ID
} from "./partners.controller"; // Caminho do arquivo de controllers do parceiro
import { validate } from "../shared/validate.middleware"; // Importa a função middleware de validação
import { // Importa os schemas de validação Zod do módulo de parceiros
  criarParceiroSchema, // Schema de validação para criação de parceiro
  atualizarParceiroSchema, // Schema de validação para alteração parcial de parceiro
} from "./partners.schema"; // Caminho do arquivo de schemas do parceiro

const router = Router(); // Inicializa uma nova instância de roteador do Express

router.post( // Define a rota HTTP POST para '/partners'
  "/partners", // Endpoint URL para criação de um parceiro
  validate(criarParceiroSchema), // Middleware que valida os dados do body contra o criarParceiroSchema
  criarParceiroController, // Função controller final executada caso os dados sejam válidos
); // Fecha o método router.post
router.get("/partners", listarParceirosController); // Define a rota HTTP GET '/partners' vinculada ao controller de listar parceiros
router.get("/partners/:id", buscarParceiroPorIdController); // Define a rota HTTP GET '/partners/:id' para buscar um parceiro por seu parâmetro ID
router.patch( // Define a rota HTTP PATCH para atualização parcial de parceiro
  "/partners/:id", // Endpoint URL recebendo o parâmetro ID do parceiro
  validate(atualizarParceiroSchema), // Middleware que valida os dados do body contra o atualizarParceiroSchema
  atualizarParceiroController, // Controller executado para salvar a atualização
); // Fecha o método router.patch
router.delete("/partners/:id", deletarParceiroPorIdController); // Define a rota HTTP DELETE '/partners/:id' vinculada ao controller de deleção por ID

export { router }; // Exporta a instância do roteador de parceiros para ser registrada na aplicação principal

