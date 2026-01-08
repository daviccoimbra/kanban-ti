import prisma  from "../prisma/client.js";

// Listar demandas
export async function listarDemandas() {
  return prisma.demanda.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
}

// Criar demanda
export async function criarDemanda({ titulo, descricao, tipo }) {
  return prisma.demanda.create({
    data: {
      titulo,
      descricao,
      tipo,
      status: "TODO",
    },
  });
}

// Atualizar status da demanda
export async function atualizarStatus(id, status) {
  return prisma.demanda.update({
    where: { id },
    data: { status },
  });
}
