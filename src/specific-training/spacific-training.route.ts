import { Router } from "express";
import {
  criarEspecificoController,
  listarEspecificoController,
} from "./spacific-training.controller";

const router = Router();

router.post("/spacific", criarEspecificoController);
router.get("/spacific", listarEspecificoController);

export { router };
