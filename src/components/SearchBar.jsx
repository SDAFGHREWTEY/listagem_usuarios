export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="todo-form">
      <div className="input-row">
        <div className="input-wrapper">
          <input
            className="todo-input"
            type="text"
            value={value}
            placeholder="Filtrar usuário..."
            onChange={(event) => onChange(event.target.value)}
          />
        </div>
      </div>

      <div className="options-row">
        <span>Resultados:</span>
        <strong>{value ? "Filtrando" : "Todos"}</strong>
        <button type="button" className="btn-clear" onClick={onClear}>
          Limpar
        </button>
      </div>
    </div>
  );
}
