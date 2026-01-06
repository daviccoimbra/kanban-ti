import KanbanCard from './KanbanCard';

export default function KanbanColumn({ title, demandas }) {
  return (
    <div style={{ width: '250px', border: '1px solid #ccc', padding: '10px' }}>
      <h3>{title}</h3>
      {demandas.map(demanda => (
        <KanbanCard key={demanda.id} demanda={demanda} />
      ))}
    </div>
  );
}
