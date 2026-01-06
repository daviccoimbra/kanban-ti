import { Router } from "express";
import * as controller from "../controllers/demandas.controller.js";

const router = Router();

router.get("/", controller.listar);
router.post("/", controller.criar);
router.put("/:id/assumir", controller.assumir);
router.put("/:id/finalizar", controller.finalizar);

export default router;
