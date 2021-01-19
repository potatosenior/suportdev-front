import "../App.css";
import React, { useState, useEffect } from "react";
// componentes
import CriarChamado from "../components/criarChamado";
import CriarMensagem from "../components/criarMensagem";
import ChamadoCard from "../components/chamadoCard";
import ChamadoCardView from "../components/chamadoCardView";
import url from "../services/api";

/**
 * Pagina inicio com todas funções do site
 *
 * @return {*} Pagina inicio
 */
const Inicio = () => {
  // state global que contém todos chamados
  const [chamados, setChamados] = useState([]);
  // state global do chamado sendo visualizado
  const [chamadoView, setChamadoView] = useState(null);

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
              chamadoView={chamadoView}
              setChamadoView={setChamadoView}
              chamados={chamados}
              setChamados={setChamados}
            />
          </>
        </div>
      ) : (
        <div></div>
      )}
    </main>
  );
};

export default Inicio;
