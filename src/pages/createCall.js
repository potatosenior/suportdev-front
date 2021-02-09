import React, { useState, useRef } from "react";
import { Form } from "@unform/web";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "../components/input";
import url from "../services/base_url";
import Navbar from "../components/navbar";
import validateCPF from "../utils/validators/cpf";
import "../css/createCall.css";

const CreateCall = () => {
  const [calls, setCalls] = useState([]);
  const createCallFormRef = useRef();
  const [status, setStatus] = useState("open");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [cpf, setCpf] = useState("");
  const [clientError, setClientError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);

  const createCall = async data => {
    try {
      let error = false;
      const rawCpf = data.cpf.replace(/\D/g, "");

      if (data.name === "") {
        setNameError(true);
        error = true;
      }
      if (data.cpf === "" || !validateCPF(rawCpf)) {
        setClientError(true);
        error = true;
      }
      if (data.description === "") {
        setDescriptionError(true);
        error = true;
      }

      if (error) return;

      const formData = {
        name: data.name,
        cpf: rawCpf,
        description: data.description,
        status: status,
      };

      await fetch(url + "/calls/create", {
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
                var newCalls = [...calls, result.data];
                setCalls(newCalls);
                setName("");
                setCpf("");
                setDescription("");
                setStatus("open");
              }

              alert(result.message);
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

  const cpfMask = value => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  return (
    <div className="pg-container">
      <Navbar></Navbar>

      <div className="pg-content al-center">
        <Form className="pg-form" ref={createCallFormRef} onSubmit={createCall}>
          <Input
            value={name}
            onChange={e => {
              setName(e.target.value);
              setNameError(false);
            }}
            error={nameError}
            helperText="Insira o seu nome"
            name="name"
            label="Nome"
          />
          <Input
            value={cpf}
            onChange={e => {
              setCpf(cpfMask(e.target.value));
              setClientError(false);
            }}
            error={clientError}
            helperText="Insira o cpf do cliente"
            name="cpf"
            label="Cpf do cliente"
          />
          <Input
            value={description}
            onChange={e => {
              setDescription(e.target.value);
              setDescriptionError(false);
            }}
            error={descriptionError}
            helperText="Insira uma descrição do chamado"
            multiline={true}
            rows={4}
            name="description"
            label="Descrição"
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
                checked={status === "open"}
                value="open"
                control={<Radio />}
                label="Aberto"
              />
              <FormControlLabel
                checked={status === "closed"}
                value="closed"
                control={<Radio />}
                label="Fechado"
              />
            </RadioGroup>
          </FormControl>

          <Button variant="contained" color="primary" type="submit">
            Criar novo chamado
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default CreateCall;
