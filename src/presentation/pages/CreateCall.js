import React, { useState, useRef } from "react";
import { Form } from "@unform/web";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "../../components/input";
import Navbar from "../../components/navbar";
import "../../css/createCall.css";

const CreateCall = ({ createCall }) => {
  const createCallFormRef = useRef();
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("open");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [description, setDescription] = useState("");

  const createCallHandler = async data => {
    await createCall
      .create({ ...data, cpf: data.cpf.replace(/\D/g, ""), status })
      .then(result => {
        setName("");
        setCpf("");
        setDescription("");
        setStatus("open");
        setErrors({});

        alert("Chamado criado com sucesso!");
      })
      .catch(error => {
        const newErrors = { ...errors };

        if (error.inner) {
          // yup error
          error.inner.forEach(err => {
            newErrors[err.path] = err.message;
          });
          setErrors(newErrors);
        }
        if (error.data) {
          // server error
          if (error.data.path) newErrors[error.data.path] = error.data.message;
          setErrors(newErrors);
        }
      });
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
        <Form
          className="pg-form"
          ref={createCallFormRef}
          onSubmit={createCallHandler}
        >
          <Input
            value={name}
            onChange={e => {
              setName(e.target.value);
              setErrors({ ...errors, name: "" });
            }}
            error={!!errors["name"]}
            helperText={errors["name"]}
            name="name"
            label="Nome"
          />
          <Input
            value={cpf}
            onChange={e => {
              setCpf(cpfMask(e.target.value));
              setErrors({ ...errors, cpf: "" });
            }}
            error={!!errors["cpf"]}
            helperText={errors["cpf"]}
            name="cpf"
            label="Cpf do cliente"
          />
          <Input
            value={description}
            onChange={e => {
              setDescription(e.target.value);
              setErrors({ ...errors, description: "" });
            }}
            error={!!errors["description"]}
            helperText={errors["description"]}
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
