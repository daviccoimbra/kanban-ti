import prisma from "../prisma/client.js";

export async function listarDemandas(status) {
  if (status){
    return prisma.demanda.findMany({
      where: { status },
    });
  }
  
  return prisma.demanda.findMany();
}

export async function criarDemanda(dados) {
  return prisma.demanda.create({ data: dados });
}

export async function assumirDemanda(demandaId, analistaId) {
  const analista = await prisma.analista.findUnique({
    where: { id: analistaId },
  });

  if (!analista) {
    throw new Error("Analista não encontrado");
  }

  return prisma.demanda.update({
    where: { id: demandaId },
    data: {
      analistaId,
      status: "DOING",
    },
  });
}

export async function finalizarDemanda(demandaId) {
  const demanda = await prisma.demanda.findUnique({
    where: { id: demandaId },
  });

  if (!demanda) {
    throw new Error("Demanda não encontrada");
  }

  if (demanda.status === "DONE") {
    throw new Error("Demanda já finalizada");
  }

  return prisma.demanda.update({
    where: { id: demandaId },
    data: { status: "DONE" },
  });
}
