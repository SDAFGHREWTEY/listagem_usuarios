import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import EmptyState from "./components/EmptyState";

const filtrarUsuarioPorTermo = (termo) => (usuario) => {
  const termoLower = termo.toLowerCase();

  return (
    usuario.name.toLowerCase().includes(termoLower) ||
    usuario.username.toLowerCase().includes(termoLower) ||
    usuario.email.toLowerCase().includes(termoLower)
  );
};

export default function App() {
  const url = "https://jsonplaceholder.typicode.com";
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [busca, setBusca] = useState("");

  const usuariosFiltrados = usuarios.filter(filtrarUsuarioPorTermo(busca));

  async function buscarUsuarios() {
    try {
      setCarregando(true);
      const response = await axios.get(`${url}/users`);
      setUsuarios(response.data);
    } catch (error) {
      console.log("Error when fetching user: ", error);
      setError(`Users were not loaded - ${error.message}`);
      setUsuarios([]);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="title-group">
          <span aria-hidden="true">👥</span>
          <h1 className="app-title">Catálogo de Usuários</h1>
        </div>
        <p className="subtitle">Explore e busque usuários em tempo real.</p>

        <div className="progress-container">
          <div className="progress-info">
            <span>Progresso</span>
            <span>{usuarios.length > 0 ? `${usuariosFiltrados.length}/${usuarios.length}` : "0/0"}</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${usuarios.length ? (usuariosFiltrados.length / usuarios.length) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      </header>

      <SearchBar
        value={busca}
        onChange={setBusca}
        onClear={() => setBusca("")}
      />

      {carregando && <p className="empty-state">Carregando usuários...</p>}
      {error && <p className="empty-state">{error}</p>}

      {!carregando && !error && (
        <ul className="todo-list">
          {usuariosFiltrados.length > 0 ? (
            usuariosFiltrados.map((usuario) => <UserCard key={usuario.id} user={usuario} />)
          ) : (
            <EmptyState message="Nenhum usuário encontrado." />
          )}
        </ul>
      )}
    </div>
  );
}
