import React, { useState, useRef } from "react";
import { Form } from "@unform/web";
import Button from "@material-ui/core/Button";
import Input from "./input";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import url from "../services/api";

/**
 * Componente formulário para criar novos chamados
 *
 * @param {*} {
 * chamados, - state com a lista de todos chamados
 * setChamados, - função para alterar o state
 * ...rest - outras props
 * }
 * @return {*} Componente Form utilizado para criar novos chamados
 */
const CriarChamado = ({ chamados, setChamados, ...rest }) => {
  const criarChamadoFormRef = useRef();
  const [status, setStatus] = useState("aberto");
  const [nome, setNome] = useState("");
  const [nomeError, setNomeError] = useState(false);
  const [cliente, setCliente] = useState("");
  const [clienteError, setClienteError] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [descricaoError, setDescricaoError] = useState(false);

  const criarChamado = async data => {
    /* 
      Faz a requisição de criar o chamado e o adiciona
      as variaveis de state
    */
    try {
      let error = false;

      if (data.nome === "") {
        setNomeError(true);
        error = true;
      }
      if (data.cliente === "") {
        setClienteError(true);
        error = true;
      }
      if (data.descricao === "") {
        setDescricaoError(true);
        error = true;
      }

      if (error) return;

      const formData = {
        nome: data.nome,
        cliente: data.cliente,
        descricao: data.descricao,
        status: status,
      };

      await fetch(url + "/chamados/criar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(response => {
          response
            .json()
            .then(result => {
              if (!result.error) {
                // cria uma nova lista com o chamado criado
                var newChamados = [...chamados, result.data];
                // atribui essa lista ao state
                setChamados(newChamados);
                // reseta os campos
                setNome("");
                setCliente("");
                setDescricao("");
                setStatus("aberto");
              } else {
                alert(result.message);
              }
            })
            .catch(e => {
              console.log("error: ", e);
            });
        })
        .catch(e => {
          console.log("error: ", e);
        });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <Form
      className="criarChamado"
      ref={criarChamadoFormRef}
      onSubmit={criarChamado}
    >
      <Input
        value={nome}
        onChange={e => {
          setNome(e.target.value);
          setNomeError(false);
        }}
        error={nomeError}
        helperText="Insira o seu nome"
        name="nome"
      />
      <Input
        value={cliente}
        onChange={e => {
          setCliente(e.target.value);
          setClienteError(false);
        }}
        error={clienteError}
        helperText="Insira o nome do cliente"
        name="cliente"
      />
      <Input
        value={descricao}
        onChange={e => {
          setDescricao(e.target.value);
          setDescricaoError(false);
        }}
        error={descricaoError}
        helperText="Insira uma descrição do chamado"
        multiline={true}
        rows={4}
        name="descricao"
      />

      <FormControl component="fieldset">
        <FormLabel component="legend">Status</FormLabel>
        <RadioGroup
          aria-label="status"
          name="status"
          value={status}
          onChange={e => {
            setStatus(e.target.value);
          }}
        >
          <FormControlLabel
            checked={status === "aberto"}
            value="aberto"
            control={<Radio />}
            label="Aberto"
          />
          <FormControlLabel
            checked={status === "fechado"}
            value="fechado"
            control={<Radio />}
            label="Fechado"
          />
        </RadioGroup>
      </FormControl>

      <Button variant="contained" color="primary" type="submit">
        Criar novo chamado
      </Button>
    </Form>
  );
};
export default CriarChamado;
