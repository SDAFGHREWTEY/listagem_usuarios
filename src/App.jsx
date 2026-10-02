import { useEffect, useState } from "react";
import axios from "axios";

import HeaderComponent from "./components/HeaderComponent";
import LoadingComponent from "./components/LoadingComponent";
import UserListComponent from "./components/UserListComponent";

import "./App.css";
import UserDetailsComponent from "./components/UserDetailsComponent";
import UserForm from "./components/UserForm";
import NovoUsuarioComponent from "./components/NovoUsuarioComponent";
import ModalComponent from "./components/ModalComponent";


const filtrarUsuarioPorTermo = (termo) => (usuario) => {
    const termoLower = termo.toLowerCase();
    return (
        usuario.name.toLowerCase().includes(termoLower) ||
        usuario.username.toLowerCase().includes(termoLower) ||
        usuario.email.toLowerCase().includes(termoLower)
    );
};


function App() {
    const url = "https://jsonplaceholder.typicode.com";

    const [usuarios, setUsuarios] = useState([]);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [busca, setBusca] = useState("");
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null)
    const [novoUsuario, setNovoUsuario] = useState(null)
    const [modalNovoUsuarioAberto, setModalNovoUsuarioAberto] = useState(false)
    const [usuarioExcluindo, setUsuarioExcluindo] = useState(null)
    const [erroAcao, setErroAcao] = useState(null)


    const usuariosFiltrados = usuarios
        .filter(filtrarUsuarioPorTermo(busca));

    async function buscarUsuario(id) {
        try {
            const response = await axios.get(
                `${url}/users/${id}`
            )
            const data = response.data
            setUsuarioSelecionado(data)
        } catch (error) {
            console.log("Erro ao buscar usuário: ", error)
        }
    }


    async function buscarUsuarios() {
        try {
            setCarregando(true);
            const response = await axios.get(
                `${url}/users`
            );

            const data = response.data;

            setUsuarios(data);
        } catch (error) {
            console.log(
                "Erro ao buscar usuários: ",
                error
            );
            setErro(
                `Não foi possível carregar os usuários. Código: ${error.message}`
            );
            setUsuarios([]);
        } finally {
            setCarregando(false);
        }
    }

    function limparDetalhesUsuario() {
        setUsuarioSelecionado(null)
    }

    async function cadastrarUsuario(usuario) {
        try {
            const response = await axios.post(
                `${url}/users`, usuario
            )
            const data = response.data
            setNovoUsuario(data)
            setUsuarios([...usuarios, data])
            setModalNovoUsuarioAberto(false)
        } catch (error) {
            console.log("Erro ao cadastrar usuário: ", error)
        }
    }

    async function excluirUsuario(usuario) {
        const confirmado = window.confirm(
            `Tem certeza que deseja excluir ${usuario.name}?`
        )

        if (!confirmado) {
            return
        }

        try {
            setUsuarioExcluindo(usuario.id)
            setErroAcao(null)
            await axios.delete(`${url}/users/${usuario.id}`)
            setUsuarios((usuariosAtuais) =>
                usuariosAtuais.filter((item) => item.id !== usuario.id)
            )
            setUsuarioSelecionado((selecionado) =>
                selecionado?.id === usuario.id ? null : selecionado
            )
        } catch (error) {
            console.error("Erro ao excluir usuário: ", error)
            setErroAcao(
                `Não foi possível excluir ${usuario.name}. Tente novamente.`
            )
        } finally {
            setUsuarioExcluindo(null)
        }
    }

    useEffect(() => {
        buscarUsuarios();
    }, []);


    return (
        <div className="app">
            <HeaderComponent
                busca={busca}
                setBusca={setBusca}
            />
            {carregando && (
                <LoadingComponent />
            )}

            <p className="informacao">
                Usuários cadastrados: {usuarios.length}
            </p>

            {erro && (
                <p className="erro">
                    {erro}
                </p>
            )}
            {erroAcao && (
                <p className="erro" role="alert">
                    {erroAcao}
                </p>
            )}


            {!carregando && !erro && (
                <>
                    <p className="informacao">
                        {usuariosFiltrados.length} usuário(s) encontrado(s)
                    </p>

                    {usuariosFiltrados.length > 0 ? (
                        <UserListComponent
                            usuarios={usuariosFiltrados}
                            onSelecionarUsuario={buscarUsuario}
                            onExcluirUsuario={excluirUsuario}
                            usuarioExcluindo={usuarioExcluindo}
                        />
                    ) : (
                        <p className="sem-resultados">
                            Nenhum usuário encontrado.
                        </p>
                    )}

                    {usuarioSelecionado && (
                        <ModalComponent onFechar={limparDetalhesUsuario}>
                            <UserDetailsComponent
                                usuario={usuarioSelecionado}
                                onFecharDetalhes={limparDetalhesUsuario}
                            />
                        </ModalComponent>
                    )}
                    
                    {novoUsuario && (
                        <NovoUsuarioComponent novoUsuario={novoUsuario}/>
                    )}

                </>
            )}
            {modalNovoUsuarioAberto && (
                <ModalComponent titulo="Cadastrar Novo Usuário" onFechar={() => setModalNovoUsuarioAberto(false)}>
                    <UserForm onCadastrar={cadastrarUsuario}/>
                </ModalComponent>
            )}
        </div>
    );
}

export default App;