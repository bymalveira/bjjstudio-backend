import { Router } from "express";
import {
  criarParceiroController,
  listarParceirosController,
  atualizarParceiroController,
  buscarParceiroPorIdController,
  deletarParceiroPorIdController,
} from "./partners.controller";
import { validate } from "../shared/validate.middleware";
import {
  criarParceiroSchema,
  atualizarParceiroSchema,
} from "./partners.schema";

const router = Router();

router.post(
  "/partners",
  validate(criarParceiroSchema),
  criarParceiroController,
);
router.get("/partners", listarParceirosController);
router.get("/partners/:id", buscarParceiroPorIdController);
router.patch(
  "/partners/:id",
  validate(atualizarParceiroSchema),
  atualizarParceiroController,
);
router.delete("/partners/:id", deletarParceiroPorIdController);

export { router };
