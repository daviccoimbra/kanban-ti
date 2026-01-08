import { Router } from "express";
import {
  listarDemandas,
  criarDemanda,
  atualizarStatus,
} from "../controllers/demandas.controller.js";

const router = Router();

// Listar todas as demandas
router.get("/", listarDemandas);

// Criar nova demanda
router.post("/", criarDemanda);

// Atualizar status da demanda (TODO | DOING | DONE)
router.patch("/:id/status", atualizarStatus);

export default router;
