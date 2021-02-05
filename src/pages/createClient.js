import React, { useState, useRef } from "react";
import { Form } from "@unform/web";
import Button from "@material-ui/core/Button";
import Input from "../components/input";
import url from "../services/api";
import Navbar from "../components/navbar";
import clientValidator from "../utils/validators/client";
import cpfMask from "../utils/masks/cpf";
import phoneMask from "../utils/masks/phone";
import "../css/createCall.css";

const CreateClient = () => {
  const date = new Date();
  // YYYY-MM-DD
  var initialDate = `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" : ""
  }${date.getMonth()}-${date.getDate() + 1 < 10 ? "0" : ""}${date.getDate()}`;

  const createClientFormRef = useRef();
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState(initialDate);
  const [errors, setErrors] = useState({});

  const createClientHandler = async data => {
    try {
      const rawCpf = data.cpf.replace(/\D/g, "");
      const rawNumber = data.phone.replace(/\D/g, "");
      let newErrors = { ...errors };

      return await clientValidator
        .validate(
          { ...data, cpf: rawCpf, phone: rawNumber },
          { abortEarly: false }
        )
        .then(async result => {
          await fetch(url + "/clients/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(result),
          })
            .then(response => {
              response
                .json()
                .then(result => {
                  if (response.status === 201) {
                    setName("");
                    setCpf("");
                    setEmail("");
                    setPhone("");
                    setAddress("");
                    setBirthday(initialDate);
                    alert(result.message);
                  }
                  console.log(response.status);
                  console.log(result);
                  if (response.status === 400) {
                    if (result.path) newErrors[result.path] = result.message;
                    setErrors(newErrors);
                  }
                })
                .catch(error => {
                  throw error;
                });
            })
            .catch(error => {
              throw error;
            });
        })
        .catch(error => {
          if (error.inner) {
            error.inner.forEach(err => {
              newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
          }
        });
    } catch (error) {
      console.error(error);
    }
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
              setErrors({ ...errors, name: false });
            }}
            error={!!errors["name"]}
            helperText={errors["name"]}
            name="name"
            label="Nome"
            autoComplete="name"
          />

          <Input
            value={cpf}
            onChange={e => {
              setCpf(cpfMask(e.target.value));
              setErrors({ ...errors, cpf: false });
            }}
            error={!!errors["cpf"]}
            helperText={errors["cpf"]}
            name="cpf"
            label="Cpf"
          />

          <Input
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: false });
            }}
            error={!!errors["email"]}
            helperText={errors["email"]}
            name="email"
            label="Email"
            autoComplete="email"
          />

          <Input
            value={phone}
            onChange={e => {
              setPhone(phoneMask(e.target.value));
              setErrors({ ...errors, phone: false });
            }}
            error={!!errors["phone"]}
            helperText={errors["phone"]}
            name="phone"
            label="Numero de celular"
            autoComplete="tel-national"
            inputProps={{ maxLength: 15 }}
          />

          <Input
            value={address}
            onChange={e => {
              setAddress(e.target.value);
              setErrors({ ...errors, address: false });
            }}
            error={!!errors["address"]}
            helperText={errors["address"]}
            name="address"
            label="Endereço"
            autoComplete="street-address"
          />

          <Input
            value={birthday}
            onChange={e => {
              setBirthday(e.target.value);
              setErrors({ ...errors, birthday: false });
            }}
            error={!!errors["birthday"]}
            helperText={errors["birthday"]}
            type="date"
            name="birthday"
            label="Data de nascimento"
            inputProps={{ min: "1900-01-01" }}
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
