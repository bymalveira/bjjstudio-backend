import { Router } from "express";
import {
  criarSessaoController,
  listarSessoesController,
  atualizarSessaoController,
  buscarSessaoPorIdController,
  deletarSessaoPorIdController,
} from "./sessions.controller";
import { criarSessaoSchema, atualizarSessaoSchema } from "./sessions.schema";
import { validate } from "../shared/validate.middleware";

const router = Router();

router.post("/sessions", validate(criarSessaoSchema), criarSessaoController);
router.get("/sessions", listarSessoesController);
router.get("/sessions/:id", buscarSessaoPorIdController);
router.patch(
  "/sessions/:id",
  validate(atualizarSessaoSchema),
  atualizarSessaoController,
);
router.delete("/sessions/:id", deletarSessaoPorIdController);

export { router };
