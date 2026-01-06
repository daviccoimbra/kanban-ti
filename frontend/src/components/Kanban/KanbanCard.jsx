export default function KanbanCard({ demanda }) {
  return (
    <div
      style={{
        border: '1px solid #999',
        padding: '8px',
        marginBottom: '8px',
        backgroundColor: '#f5f5f5',
      }}
    >
      {demanda.titulo}
    </div>
  );
}
