import { Router } from "express";
import {
  criarEspecificoController,
  listarEspecificoController,
} from "./spacific-training.controller";
import { criarEspecificoSchema } from "./spacific-training.schema";
import { validate } from "../shared/validate.middleware";

const router = Router();

router.post(
  "/spacific",
  validate(criarEspecificoSchema),
  criarEspecificoController,
);
router.get("/spacific", listarEspecificoController);

export { router };
