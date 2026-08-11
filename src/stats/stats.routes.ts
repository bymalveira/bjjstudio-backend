import { Router } from "express";
import {
  passagensPorGuardaController,
  historicoContraParceiroController,
  contarDrillsPorPeriodoController,
} from "./stats.controller";

const router = Router();

router.get("/passagens-por-guarda", passagensPorGuardaController);
router.get("/historico-de-parceiro/:id", historicoContraParceiroController);
router.get("/drills", contarDrillsPorPeriodoController);

export { router };
