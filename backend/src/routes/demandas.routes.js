import { Router } from "express";
import {
  listarDemandas,
  criarDemanda,
} from "../controllers/demandas.controller.js";

const router = Router();

router.get("/", listarDemandas);
router.post("/", criarDemanda);

export default router;
