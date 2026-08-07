import { Router } from "express";
import {
  criarParceiroController,
  listarParceirosController,
} from "./partners.controller";

const router = Router();

router.post("/partners", criarParceiroController);
router.get("/partners", listarParceirosController);

export { router };
