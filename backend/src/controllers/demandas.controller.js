import * as demandasService from "../services/demandas.service.js";

// GET /demandas
export async function listarDemandas(req, res) {
  try {
    const demandas = await demandasService.listarDemandas();
    return res.json(demandas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao listar demandas" });
  }
}

// POST /demandas
export async function criarDemanda(req, res) {
  try {
    const { titulo, descricao, tipo } = req.body;

    if (!titulo || !descricao || !tipo) {
      return res.status(400).json({
        error: "Título, descrição e tipo são obrigatórios",
      });
    }

    const novaDemanda = await demandasService.criarDemanda({
      titulo,
      descricao,
      tipo,
    });

    return res.status(201).json(novaDemanda);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar demanda" });
  }
}

// PATCH /demandas/:id/status
export async function atualizarStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status é obrigatório" });
    }

    const statusValidos = ["TODO", "DOING", "DONE"];
    if (!statusValidos.includes(status)) {
      return res.status(400).json({ error: "Status inválido" });
    }

    const demandaAtualizada = await demandasService.atualizarStatus(
      Number(id),
      status
    );

    return res.json(demandaAtualizada);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao atualizar status" });
  }
}
