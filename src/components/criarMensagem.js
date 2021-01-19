import React, { useState, useRef } from "react";
import { Form } from "@unform/web";
import Input from "./input";
import Button from "@material-ui/core/Button";
import url from "../services/api";

const CriarMensagem = ({ chamadoView, setChamadoView, ...rest }) => {
  const criarMensagemFormRef = useRef();
  const [mensagemError, setMensagemError] = useState(false);

  const criarMensagem = async data => {
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
          // adiciona as mensagens ao objeto chamado
          var final = { ...chamadoView };

          final.msg.push(result.data);

          setChamadoView(final);
        });
      })
      .catch(e => {
        console.log("error: ", e);
      });
  };

  const validacao = data => {
    if (data.conteudo === "") {
      return setMensagemError(true);
    }
    criarMensagem(data);
  };

  return (
    <Form
      className="criarMensagem"
      ref={criarMensagemFormRef}
      onSubmit={validacao}
    >
      <Input
        onChange={() => setMensagemError(false)}
        error={mensagemError}
        helperText="Insira o conteudo da mensagem"
        multiline={true}
        name="conteudo"
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
