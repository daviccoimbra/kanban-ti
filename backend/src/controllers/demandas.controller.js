import { DemandasService } from "../services/demandas.service.js";

const service = new DemandasService();

export async function listarDemandas(req, res) {
  const demandas = await service.listar();
  res.json(demandas);
}

export async function criarDemanda(req, res) {
  const { titulo, descricao, tipo } = req.body;

  if (!titulo || !tipo) {
    return res.status(400).json({ erro: "Título e tipo são obrigatórios" });
  }

  const demanda = await service.criar({
    titulo,
    descricao,
    tipo,
  });

  res.status(201).json(demanda);
}
