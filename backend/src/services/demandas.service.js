import { prisma } from "../prisma/client.js";

export class DemandasService {
  listar() {
    return prisma.demanda.findMany({
      orderBy: { createdAt: "asc" },
    });
  }

  criar({ titulo, descricao, tipo }) {
    return prisma.demanda.create({
      data: {
        titulo,
        descricao,
        tipo,
        status: "TODO",
      },
    });
  }
}
