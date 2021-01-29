import React, { useState, useRef } from "react";
import { Form } from "@unform/web";
import Button from "@material-ui/core/Button";
import Input from "../components/input";
import url from "../services/api";
import Navbar from "../components/navbar";
import "../css/createCall.css";
import validateCPF from "../utils/validators/cpf";

const CreateClient = () => {
  const date = new Date();
  // YYYY-MM-DD
  var dateParsed = `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" : ""
  }${date.getMonth() + 1}-${date.getDate()}`;
  const createClientFormRef = useRef();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [cpf, setCpf] = useState("");
  const [cpfError, setCpfError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [adress, setAdress] = useState("");
  const [adressError, setAdressError] = useState(false);
  const [birthday, setBirthday] = useState(dateParsed);
  const [birthdayError, setBirthdayError] = useState(false);

  const createClientHandler = async data => {
    try {
      const rawCpf = data.cpf.replace(/\D/g, "");
      let error = false;

      if (data.name === "") {
        setNameError(true);
        error = true;
      }
      if (data.cpf === "" || !validateCPF(rawCpf)) {
        setCpfError(true);
        error = true;
      }
      if (data.email === "") {
        setEmailError(true);
        error = true;
      }
      if (data.phone_number === "") {
        setPhoneError(true);
        error = true;
      }
      if (data.adress === "") {
        setAdressError(true);
        error = true;
      }
      if (data.date_of_birth === "") {
        setBirthdayError(true);
        error = true;
      }

      if (error) return;
      console.log(data.phone_number.replace(/\D/g, ""));
      await fetch(url + "/clients/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          cpf: rawCpf,
          phone_number: data.phone_number.replace(/\D/g, ""),
        }),
      })
        .then(response => {
          response
            .json()
            .then(result => {
              if (!result.error) {
                setName("");
                setCpf("");
                setEmail("");
                setPhone("");
                setAdress("");
                setBirthday(dateParsed);
              }
              console.log(result);
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

  const phoneMask = value => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2");
  };

  return (
    <div className="pg-container">
      <Navbar></Navbar>

      <div className="pg-content al-center">
        <Form
          className="pg-form"
          ref={createClientFormRef}
          onSubmit={createClientHandler}
        >
          <Input
            value={name}
            onChange={e => {
              setName(e.target.value);
              setNameError(false);
            }}
            error={nameError}
            helperText="Insira o nome do cliente"
            name="name"
            label="Nome"
            autoComplete="name"
          />

          <Input
            value={cpf}
            onChange={e => {
              setCpf(cpfMask(e.target.value));
              setCpfError(false);
            }}
            error={cpfError}
            helperText="Insira o cpf do cliente"
            name="cpf"
            label="Cpf"
          />

          <Input
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
            error={emailError}
            helperText="Insira o email do cliente"
            name="email"
            label="Email"
            autoComplete="email"
          />

          <Input
            value={phone}
            onChange={e => {
              setPhone(phoneMask(e.target.value));
              setPhoneError(false);
            }}
            error={phoneError}
            helperText="Insira o numero do cliente"
            name="phone_number"
            label="Numero de celular"
            autoComplete="tel-national"
          />

          <Input
            value={adress}
            onChange={e => {
              setAdress(e.target.value);
              setAdressError(false);
            }}
            error={adressError}
            helperText="Insira o endereço do cliente"
            name="adress"
            label="Endereço"
            autoComplete="street-address"
          />

          <Input
            value={birthday}
            onChange={e => {
              setBirthday(e.target.value);
              setBirthdayError(false);
            }}
            error={birthdayError}
            helperText="Data de nascimento do cliente"
            type="date"
            name="date_of_birth"
            label="Data de nascimento"
          />

          <Button variant="contained" color="primary" type="submit">
            Cadastrar novo cliente
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default CreateClient;
