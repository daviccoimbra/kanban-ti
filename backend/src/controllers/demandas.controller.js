import * as demandaService from "../services/demandas.service.js";

export async function listar(req, res) {
  const { status } = req.query;
  const demandas = await demandaService.listarDemandas(status);
  res.json(demandas);
}

export async function criar(req, res) {
  const demanda = await demandaService.criarDemanda(req.body);
  res.status(201).json(demanda);
}

export async function assumir(req, res) {
  try {
    const { id } = req.params;
    const { analistaId } = req.body;

    const demanda = await demandaService.assumirDemanda(
      Number(id),
      Number(analistaId)
    );

    res.json(demanda);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function finalizar(req, res) {
  try {
    const { id } = req.params;

    const demanda = await demandaService.finalizarDemanda(Number(id));
    res.json(demanda);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
