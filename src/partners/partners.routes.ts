import { Router } from "express";
import {
  criarParceiroController,
  listarParceirosController,
} from "./partners.controller";
import { validate } from "../shared/validate.middleware";
import { criarParceiroSchema } from "./partners.schema";

const router = Router();

router.post(
  "/partners",
  validate(criarParceiroSchema),
  criarParceiroController,
);
router.get("/partners", listarParceirosController);

export { router };
