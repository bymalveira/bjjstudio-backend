import { Router } from "express";
import {
  criarEspecificoController,
  atualizarEspecificoController,
  buscarEspecificoPorIdController,
  deletarEspecificoPorIdController,
  listarEspecificoController,
} from "./specific-training.controller";
import {
  criarEspecificoSchema,
  atualizarEspecificoSchema,
} from "./specific-training.schema";
import { validate } from "../shared/validate.middleware";

const router = Router();

router.post(
  "/specific-training",
  validate(criarEspecificoSchema),
  criarEspecificoController,
);
router.get("/specific-training", listarEspecificoController);
router.get("/specific-training/:id", buscarEspecificoPorIdController);
router.patch(
  "/specific-training/:id",
  validate(atualizarEspecificoSchema),
  atualizarEspecificoController,
);
router.delete("/specific-training/:id", deletarEspecificoPorIdController);

export { router };
