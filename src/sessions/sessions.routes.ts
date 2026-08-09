import { Router } from "express";
import {
  criarSessaoController,
  listarSessoesController,
} from "./sessions.controller";
import { criarSessaoSchema } from "./sessions.schema";
import { validate } from "../shared/validate.middleware";

const router = Router();

router.post("/sessions", validate(criarSessaoSchema), criarSessaoController);
router.get("/sessions", listarSessoesController);

export { router };
