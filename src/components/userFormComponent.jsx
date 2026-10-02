import React, { useState } from "react";

function UserFormComponent({ onAdicionarUsuario, onCancelar }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    city: "",
    phone: "",
    website: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoUsuario = {
      id: Date.now(), 
      name: formData.name,
      username: formData.username || formData.name.toLowerCase().replace(/\s+/g, ""),
      email: formData.email,
      phone: formData.phone || "N/A"
    };

    onAdicionarUsuario(novoUsuario);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>Cadastrar Novo Usuário</h2>

      <input
        type="text"
        name="name"
        placeholder="Nome completo *"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="username"
        placeholder="Nome de usuário (@usuario)"
        value={formData.username}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="E-mail *"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Telefone"
        value={formData.phone}
        onChange={handleChange}
      />

      <div className="form-actions">
        <button type="submit" className="save-button">
          Salvar
        </button>
        <button type="button" className="cancel-button" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default UserFormComponent;