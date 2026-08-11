import { Router } from "express";
import {
  criarSparringController,
  listarSparringController,
  atualizarSparringController,
  buscarSparringPorIdController,
  deletarSparringPorIdController,
} from "./sparring.controller";
import {
  criarSparringSchema,
  atualizarSparringSchema,
} from "./sparring.schema";
import { validate } from "../shared/validate.middleware";

const router = Router();

router.post(
  "/sparring",
  validate(criarSparringSchema),
  criarSparringController,
);
router.get("/sparring", listarSparringController);
router.get("/sparring/:id", buscarSparringPorIdController);
router.patch(
  "/sparring/:id",
  validate(atualizarSparringSchema),
  atualizarSparringController,
);
router.delete("/sparring/:id", deletarSparringPorIdController);

export { router };
