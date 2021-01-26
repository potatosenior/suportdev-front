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

const CreateCall = ({ calls, setCalls, ...rest }) => {
  const createCallFormRef = useRef();
  const [status, setStatus] = useState("open");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [client, setClient] = useState("");
  const [clientError, setClientError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);

  const createCall = async data => {
    try {
      let error = false;

      if (data.name === "") {
        setNameError(true);
        error = true;
      }
      if (data.client === "") {
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
        client: data.client,
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
                setClient("");
                setDescription("");
                setStatus("open");
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
    <Form className="createCall" ref={createCallFormRef} onSubmit={createCall}>
      <Input
        value={name}
        onChange={e => {
          setName(e.target.value);
          setNameError(false);
        }}
        error={nameError}
        helperText="Insira o seu name"
        name="name"
        label="Nome"
      />
      <Input
        value={client}
        onChange={e => {
          setClient(e.target.value);
          setClientError(false);
        }}
        error={clientError}
        helperText="Insira o name do client"
        name="client"
        label="Cliente"
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
  );
};
export default CreateCall;
