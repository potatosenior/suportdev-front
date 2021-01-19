import React, { useState, useRef } from "react";
import { Form } from "@unform/web";
import Input from "./input";
import Button from "@material-ui/core/Button";
import url from "../services/api";

/**
 * Componente de criar novas mensagens ao chamado
 *
 * @param {*} {
 * chamadoView, - chamado atual
 * setChamadoView, - função de alterar o chamado
 * ...rest - outras props
 * }
 * @return {*} Componente Form utilizado para criar mensagens
 */
const CriarMensagem = ({ chamadoView, setChamadoView, ...rest }) => {
  const criarMensagemFormRef = useRef();
  const [mensagem, setMensagem] = useState("");
  const [mensagemError, setMensagemError] = useState(false);

  const criarMensagem = async data => {
    /* 
      Cria uma nova mensagem no chamado atual
    */
    if (data.conteudo === "") {
      return setMensagemError(true);
    }
    try {
      await fetch(url + "/chamados/mensagens/criar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conteudo: data.conteudo,
          chamadoId: chamadoView.id,
        }),
      })
        .then(async response => {
          await response.json().then(result => {
            if (!result.error) {
              // cria uma cópia do objeto chamado atual
              var final = { ...chamadoView };
              // adiciona as mensagens ao objeto chamado atual
              final.msg.push(result.data);
              // atribui o resultado ao state
              setChamadoView(final);
              // reseta o campo mensagem
              setMensagem("");
            } else {
              alert(result.message);
            }
          });
        })
        .catch(e => {
          console.log("error: ", e);
        });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Form
      className="criarMensagem"
      ref={criarMensagemFormRef}
      onSubmit={criarMensagem}
    >
      <Input
        value={mensagem}
        onChange={e => {
          setMensagem(e.target.value);
          setMensagemError(false);
        }}
        error={mensagemError}
        helperText="Insira o conteudo da mensagem"
        multiline={true}
        name="conteudo"
        size="small"
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ marginBottom: 10 }}
      >
        Criar nova mensagem
      </Button>
    </Form>
  );
};
export default CriarMensagem;
