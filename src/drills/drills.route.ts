import { Router } from "express";
import {
  criarDrillController,
  listarDrillsController,
} from "./drills.controller";
import { criarDrillSchema } from "./drills.schema";
import { validate } from "../shared/validate.middleware";

const router = Router();

router.post("/drills", validate(criarDrillSchema), criarDrillController);
router.get("/drills", listarDrillsController);

export { router };
