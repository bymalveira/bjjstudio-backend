import express, { // Importa o framework Express
  type Request, // Importa a interface do tipo Request do Express para tipar requisições HTTP
  type Response, // Importa a interface do tipo Response do Express para tipar respostas HTTP
  type NextFunction, // Importa a interface do tipo NextFunction do Express para controlar o fluxo de middlewares
} from "express"; // Define o pacote de origem da importação (express)
import cors from "cors"; // Importa o middleware CORS para permitir requisições de outras origens/domínios
import helmet from "helmet"; // Importa o Helmet para aumentar a segurança HTTP adicionando headers de proteção
import morgan from "morgan"; // Importa o Morgan para registrar logs das requisições HTTP no terminal
import { router as sessionsRoutes } from "./sessions/sessions.routes"; // Importa as rotas de sessões de treino com o alias sessionsRoutes
import { router as partnersRouter } from "./partners/partners.routes"; // Importa as rotas de parceiros de treino com o alias partnersRouter
import { router as sparringRouter } from "./sparring/sparring.routes"; // Importa as rotas de sparring com o alias sparringRouter
import { router as drillsRouter } from "./drills/drills.routes"; // Importa as rotas de drills com o alias drillsRouter
import { router as specificTrainingRouter } from "./specific-training/specific-training.routes"; // Importa as rotas de treino específico com o alias specificTrainingRouter
import { router as statsRouter } from "./stats/stats.routes"; // Importa as rotas de estatísticas com o alias statsRouter

const app = express(); // Inicializa a aplicação Express e armazena na constante app

app.use(morgan("tiny")); // Registra o middleware Morgan no formato de log sucinto ("tiny")

app.use(cors()); // Aplica o middleware CORS com configurações padrão na aplicação

app.use(helmet()); // Aplica o middleware Helmet para configurar headers de segurança HTTP

app.use(express.json()); // Configura o middleware para analisar o corpo das requisições em formato JSON

app.use("/api", sessionsRoutes); // Registra o roteador de sessões de treino sob o prefixo /api
app.use("/api", partnersRouter); // Registra o roteador de parceiros de treino sob o prefixo /api
app.use("/api", sparringRouter); // Registra o roteador de sparrings sob o prefixo /api
app.use("/api", drillsRouter); // Registra o roteador de drills sob o prefixo /api
app.use("/api", specificTrainingRouter); // Registra o roteador de treino específico sob o prefixo /api
app.use("/api/stats", statsRouter); // Registra o roteador de estatísticas sob o prefixo /api/stats

app.use((error: Error, req: Request, res: Response, next: NextFunction) => { // Define o middleware global para tratamento de erros não capturados
  res.status(500).send(error.message); // Envia o código HTTP 500 (Internal Server Error) com a mensagem do erro
}); // Encerra a declaração do middleware de tratamento de erro

export default app; // Exporta a aplicação Express configurada como exportação padrão

