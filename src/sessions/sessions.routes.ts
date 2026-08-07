import { Router } from "express";
import {
  criarSessaoController,
  listarSessoesController,
} from "./sessions.controller";

const router = Router();

router.post("/sessions", criarSessaoController);
router.get("/sessions", listarSessoesController);

export { router };
