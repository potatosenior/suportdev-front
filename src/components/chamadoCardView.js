import React, { useState, useEffect } from "react";
import { Form } from "@unform/web";
import IconButton from "@material-ui/core/IconButton";
import Input from "./input.js";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import ClearIcon from "@material-ui/icons/Clear";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const ChamadoCardView = ({
  editarChamadoFormRef,
  editando,
  chamados,
  setChamados,
  setEditando,
  chamadoView,
  setChamadoView,
  ...rest
}) => {
  const url = "http://localhost:3000";
  const [nome, setNome] = useState(chamadoView.nome);
  const [cliente, setCliente] = useState(chamadoView.cliente);
  const [descricao, setDescricao] = useState(chamadoView.descricao);
  const [status, setStatus] = useState(chamadoView.status);

  const resetarCampos = () => {
    // reseta os valores e cancela a edicao
    setNome(chamadoView.nome);
    setCliente(chamadoView.cliente);
    setDescricao(chamadoView.descricao);
    setStatus(chamadoView.status);
    setEditando(!editando);
  };

  useEffect(() => {
    // atribui os valores a cada renderizaçao
    setNome(chamadoView.nome);
    setCliente(chamadoView.cliente);
    setDescricao(chamadoView.descricao);
    setStatus(chamadoView.status);
  }, [chamadoView]);

  const editarChamado = async data => {
    /* 
      Faz a requisição de alterar algum chamado e os atualiza
      nos states
    */
    await fetch(url + "/chamados/atualizar", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        status: status,
        chamadoId: chamadoView.id,
      }),
    })
      .then(async response => {
        response
          .json()
          .then(async result => {
            if (!result.error) {
              // junta o objeto resultado com o atual
              const final = { ...chamadoView, ...result.data };
              // procura o chamado atual na lista de chamados e pega seu index
              let idx = chamados.findIndex(elem => elem.id === chamadoView.id);
              let chamadosCopia = [...chamados];
              // altera o chamado na lista
              chamadosCopia[idx] = final;
              setChamados(chamadosCopia);
              // altera na view
              setChamadoView(final);
              setEditando(!editando);
            }
          })
          .catch(e => {
            console.log("error: ", e);
          });
      })
      .catch(e => {
        console.log("error: ", e);
      });
  };

  const deletarChamado = async () => {
    await fetch(url + "/chamados/deletar?chamadoId=" + chamadoView.id, {
      method: "DELETE",
    }).then(response => {
      response
        .json()
        .then(result => {
          if (!result.error) {
            var final = [...chamados];
            // remove o chamado da lista
            final = final.filter(item => item.id !== chamadoView.id);

            setChamados(final);
            setChamadoView(null);
          }
        })
        .catch(e => {
          console.log("error: ", e);
        });
    });
  };

  return (
    <div {...rest} className="chamadoCardView">
      <Form
        className="editarChamado"
        ref={editarChamadoFormRef}
        onSubmit={editarChamado}
      >
        <Input
          disabled={!editando}
          value={nome}
          onChange={e => setNome(e.target.value)}
          name="nome"
          required
          size="small"
        />

        <Input
          value={cliente}
          onChange={e => setCliente(e.target.value)}
          name="cliente"
          disabled={!editando}
          size="small"
          required
        />

        <Input
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          multiline={true}
          rows={4}
          name="descricao"
          disabled={!editando}
          size="small"
          required
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
              disabled={!editando}
            />
            <FormControlLabel
              checked={status === "fechado"}
              value="fechado"
              control={<Radio />}
              label="Fechado"
              disabled={!editando}
            />
          </RadioGroup>
        </FormControl>

        <div className="chamadoCardViewIcons">
          <IconButton
            variant="contained"
            color="primary"
            style={{ marginRight: "auto" }}
            onClick={() => {
              setEditando(false);
              setChamadoView(null);
            }}
          >
            <CancelPresentationIcon />
          </IconButton>

          {editando ? (
            <>
              <IconButton variant="contained" color="primary" type="submit">
                <SaveAltIcon />
              </IconButton>

              <IconButton
                onClick={resetarCampos}
                variant="contained"
                color="primary"
              >
                <ClearIcon />
              </IconButton>
            </>
          ) : (
            <>
              <div></div>

              <IconButton
                variant="contained"
                color="primary"
                onClick={() => setEditando(!editando)}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                onClick={() => deletarChamado()}
                variant="contained"
                color="primary"
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </div>
      </Form>
    </div>
  );
};

export default ChamadoCardView;
