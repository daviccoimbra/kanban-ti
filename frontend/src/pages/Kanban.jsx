import { useEffect, useState } from 'react';
import { api } from '../services/api';

function Kanban() {
  const [demandas, setDemandas] = useState([]);

  useEffect(() => {
    api.get("/demandas")
     .then(response => {
       setDemandas(response.data);
     })
     .catch(error => {
       console.error("Erro ao buscar demandas:", error);
     });
  }, []);

  return(
    <div>
      <h2>Quadro Kanban</h2>
      <ul>
        {demandas.map(demanda => (
          <li key={demanda.id}>
            <strong>{demanda.titulo}</strong> -- {demanda.status}
            </li>
        ))}
      </ul>
    </div>
  );
}
export default Kanban;
