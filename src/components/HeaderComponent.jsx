function HeaderComponent({ busca, setBusca }) {
    return (
        <header>
            <h1 className="titulo">
                Catálogo de Usuários
            </h1>

            <input
                className="campo-busca"
                type="text"
                placeholder="Filtrar usuário..."
                value={busca}
                onChange={(evento) => {
                    setBusca(evento.target.value)
                }}
            />
        </header>
    );
}

export default HeaderComponent;