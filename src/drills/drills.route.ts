import { Router } from "express";
import {
  criarDrillController,
  listarDrillsController,
} from "./drills.controller";

const router = Router();

router.post("/drills", criarDrillController);
router.get("/drills", listarDrillsController);

export { router };
