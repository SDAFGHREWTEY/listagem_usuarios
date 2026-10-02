import UserCardComponent from "./UserCardComponent";

function UserListComponent({
    usuarios,
    onSelecionarUsuario,
    onExcluirUsuario,
    usuarioExcluindo
}) {
    return (
        <ul className="lista-usuarios">

            {usuarios.map((usuario) => (
                <UserCardComponent
                    key={usuario.id}
                    usuario={usuario}
                    onSelecionarUsuario={onSelecionarUsuario}
                    onExcluirUsuario={onExcluirUsuario}
                    excluindo={usuarioExcluindo === usuario.id}
                />
            ))}

        </ul>
    );
}

export default UserListComponent;