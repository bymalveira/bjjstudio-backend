import { Router } from "express";
import {
  criarSparringController,
  listarSparringController,
} from "./sparring.controller";
import { criarSparringSchema } from "./sparring.schema";
import { validate } from "../shared/validate.middleware";

const router = Router();

router.post(
  "/sparring",
  validate(criarSparringSchema),
  criarSparringController,
);
router.get("/sparring", listarSparringController);

export { router };
