import { useState } from "react";
import { api } from "../../services/api";

export default function DemandaForm({ onNovaDemanda }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [erro, setErro] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!titulo || !descricao || !tipo) {
      setErro("Preencha todos os campos");
      return;
    }

    try {
      await api.post("/demandas", {
        titulo,
        descricao,
        tipo,
      });

      // Limpa formulário
      setTitulo("");
      setDescricao("");
      setTipo("");
      setErro(null);

      // 🔁 Recarrega demandas no Kanban
      onNovaDemanda();
    } catch (error) {
      setErro("Erro ao criar demanda");
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Nova Demanda</h3>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
      />

      <br />

      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={e => setDescricao(e.target.value)}
      />

      <br />

      <input
        type="text"
        placeholder="Tipo (Infra, Sistema...)"
        value={tipo}
        onChange={e => setTipo(e.target.value)}
      />

      <br />

      <button type="submit">Criar Demanda</button>
    </form>
  );
}
