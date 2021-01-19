import "./App.css";
import React, { useRef, useState, useEffect } from "react";
// componentes
import CriarChamado from "./components/criarChamado";
import CriarMensagem from "./components/criarMensagem";
import ChamadoCard from "./components/chamadoCard";
import ChamadoCardView from "./components/chamadoCardView";
import url from "./services/api";

const App = () => {
  console.log("base url: ", url);
  const editarChamadoFormRef = useRef();
  const [chamados, setChamados] = useState([]);
  const [chamadoView, setChamadoView] = useState(null);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    // carrega os chamados ao carregar a pagina
    fetch(url + "/chamados/listar", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async response => {
      await response.json().then(result => {
        setChamados(result);
      });
    });
  }, []);

  const getMensagens = async id => {
    return await fetch(url + "/chamados/mensagens/listar?chamadoId=" + id, {
      method: "GET",
    })
      .then(async response => {
        return await response.json().then(result => {
          return result;
        });
      })
      .catch(e => {
        console.log("error: ", e);
        throw new Error(e);
      });
  };

  const chamadoCardClick = async (e, id) => {
    e.preventDefault();
    // acha o objeto do chamado que foi selecionado
    const chamado = chamados.find(elem => elem.id === id);
    // busca as mensagens desse chamado
    const msgs = await getMensagens(id);
    // adiciona as mensagens ao objeto do chamado
    var result = { ...chamado, msg: msgs };
    // altera o objeto chamado original no state
    setChamadoView(result);
  };

  return (
    <main>
      <CriarChamado chamados={chamados} setChamados={setChamados} />

      <div className="chamados">
        {chamados.length ? (
          chamados.map(item => (
            <ChamadoCard
              key={item.id}
              id={item.id}
              onClick={chamadoCardClick}
              nome={item.nome}
              cliente={item.cliente}
              descricao={item.descricao}
              status={item.status}
            />
          ))
        ) : (
          <h4>Você ainda não tem nenhum chamado!</h4>
        )}
      </div>

      {chamadoView ? (
        <div className="chamadoView">
          <>
            <ChamadoCardView
              editarChamadoFormRef={editarChamadoFormRef}
              chamadoView={chamadoView}
              setChamadoView={setChamadoView}
              editando={editando}
              setEditando={setEditando}
              chamados={chamados}
              setChamados={setChamados}
            />

            <h3>Mensagens</h3>

            <CriarMensagem
              chamadoView={chamadoView}
              setChamadoView={setChamadoView}
            />

            <div className="mensagensContainer">
              {chamadoView.msg.map(msg => (
                <div key={msg.id} className="mensagem">
                  <p>{msg.conteudo}</p>
                </div>
              ))}
            </div>
          </>
        </div>
      ) : (
        <div></div>
      )}
    </main>
  );
};

export default App;
