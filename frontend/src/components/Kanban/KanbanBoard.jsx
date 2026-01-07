import { useEffect, useState } from "react";
import { api } from "../../services/api";
import DemandaForm from "./DemandaForm";

export default function KanbanBoard() {
  const [demandas, setDemandas] = useState([]);
  const [erro, setErro] = useState(null);

  // ✅ Função isolada para buscar demandas
  async function carregarDemandas() {
    try {
      const response = await api.get("/demandas");
      setDemandas(response.data);
    } catch (error) {
      setErro("Erro ao carregar demandas");
      console.error(error);
    }
  }

  // ✅ Executa apenas UMA vez quando o componente monta
  useEffect(() => {
    carregarDemandas();
  }, []);

  // ✅ Separação por status
  const todo = demandas.filter(d => d.status === "TODO");
  const doing = demandas.filter(d => d.status === "DOING");
  const done = demandas.filter(d => d.status === "DONE");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Kanban TI</h1>

      {/* Formulário */}
      <DemandaForm onNovaDemanda={carregarDemandas} />

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Coluna titulo="TODO" demandas={todo} />
        <Coluna titulo="DOING" demandas={doing} />
        <Coluna titulo="DONE" demandas={done} />
      </div>
    </div>
  );
}

function Coluna({ titulo, demandas }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        width: "300px",
        minHeight: "300px",
      }}
    >
      <h2>{titulo}</h2>

      {demandas.length === 0 && <p>Nenhuma demanda</p>}

      {demandas.map(demanda => (
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
        </div>
      ))}
    </div>
  );
}
