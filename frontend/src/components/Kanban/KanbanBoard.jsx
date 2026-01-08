import { useEffect, useState } from "react";
import { api } from "../../services/api";
import DemandaForm from "./DemandaForm";

export default function KanbanBoard() {
  const [demandas, setDemandas] = useState([]);
  const [erro, setErro] = useState(null);

  // Buscar demandas
  async function carregarDemandas() {
    try {
      const response = await api.get("/demandas");
      setDemandas(response.data);
    } catch (error) {
      setErro("Erro ao carregar demandas");
      console.error(error);
    }
  }

  // Mover demanda
  async function moverDemanda(id, novoStatus) {
    try {
      await api.patch(`/demandas/${id}/status`, {
        status: novoStatus,
      });
      carregarDemandas();
    } catch (error) {
      console.error(error);
      setErro("Erro ao mover demanda");
    }
  }

  // Executa apenas uma vez
  useEffect(() => {
    carregarDemandas();
  }, []);

  // Separação por status
  const todo = demandas.filter((d) => d.status === "TODO");
  const doing = demandas.filter((d) => d.status === "DOING");
  const done = demandas.filter((d) => d.status === "DONE");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Kanban TI</h1>

      <DemandaForm onNovaDemanda={carregarDemandas} />

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Coluna
          titulo="TODO"
          demandas={todo}
          moverDemanda={moverDemanda}
        />
        <Coluna
          titulo="DOING"
          demandas={doing}
          moverDemanda={moverDemanda}
        />
        <Coluna
          titulo="DONE"
          demandas={done}
          moverDemanda={moverDemanda}
        />
      </div>
    </div>
  );
}

function Coluna({ titulo, demandas, moverDemanda }) {
  return (
    <div style={{ width: "30%" }}>
      <h2>{titulo}</h2>

      {demandas.map((demanda) => (
        <div
          key={demanda.id}
          style={{
            border: "1px solid #999",
            borderRadius: "6px",
            padding: "8px",
            marginBottom: "8px",
          }}
        >
          <strong>{demanda.titulo}</strong>
          <p>{demanda.descricao}</p>
          <small>Tipo: {demanda.tipo}</small>

          <div style={{ marginTop: "8px" }}>
            {/* Voltar */}
            {demanda.status !== "TODO" && (
              <button
                onClick={() =>
                  moverDemanda(
                    demanda.id,
                    demanda.status === "DOING" ? "TODO" : "DOING"
                  )
                }
              >
                ◀️ Voltar
              </button>
            )}

            {/* Avançar */}
            {demanda.status !== "DONE" && (
              <button
                style={{ marginLeft: "8px" }}
                onClick={() =>
                  moverDemanda(
                    demanda.id,
                    demanda.status === "TODO" ? "DOING" : "DONE"
                  )
                }
              >
                ▶️ Avançar
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
