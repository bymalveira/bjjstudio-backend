import { Router } from "express";
import {
  criarDrillController,
  listarDrillsController,
  atualizarDrillController,
  buscarDrillPorIdController,
  deletarDrillPorIdController,
} from "./drills.controller";
import { criarDrillSchema, atualizarDrillSchema } from "./drills.schema";
import { validate } from "../shared/validate.middleware";

const router = Router();

router.post("/drills", validate(criarDrillSchema), criarDrillController);
router.get("/drills", listarDrillsController);
router.get("/drills/:id", buscarDrillPorIdController);
router.patch(
  "/drills/:id",
  validate(atualizarDrillSchema),
  atualizarDrillController,
);
router.delete("/drills/:id", deletarDrillPorIdController);

export { router };
