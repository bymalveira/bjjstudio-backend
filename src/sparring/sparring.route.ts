import { Router } from "express";
import {
  criarSparringController,
  listarSparringController,
} from "./sparring.controller";

const router = Router();

router.post("/sparring", criarSparringController);
router.get("/sparring", listarSparringController);

export { router };
