import React, { useState, useRef } from "react";
import { Form } from "@unform/web";
import Button from "@material-ui/core/Button";
import Input from "../components/input";
import Navbar from "../components/navbar";
import clientValidator from "../utils/validators/client";
import cpfMask from "../utils/masks/cpf";
import phoneMask from "../utils/masks/phone";
import api from "../services/api";
import "../css/createCall.css";

const RegisterClient = () => {
  const date = new Date();
  // YYYY-MM-DD
  var initialDate = `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" : ""
  }${date.getMonth() + 1}-${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;

  const createClientFormRef = useRef();
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("708.893.961-40");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [birthday, setBirthday] = useState(initialDate);
  const [errors, setErrors] = useState({});

  const createClientHandler = async data => {
    let newErrors = { ...errors };

    return await clientValidator
      .validate(
        {
          ...data,
          cpf: data.cpf.replace(/\D/g, ""),
          phone: data.phone.replace(/\D/g, ""),
        },
        { abortEarly: false }
      )
      .then(async result => {
        await api
          .post("/clients/create", result)
          .then(response => {
            setName("");
            setCpf("");
            setEmail("");
            setPhone("");
            setAddress("");
            setPassword("");
            setPasswordConfirm("");
            setBirthday(initialDate);
            alert(result.data.message);
          })
          .catch(({ response }) => {
            if (response && response.data) {
              if (response.data.path)
                newErrors[response.data.path] = response.data.message;
              setErrors(newErrors);
            }
          });
      })
      .catch(error => {
        if (error.inner) {
          error.inner.forEach(err => {
            newErrors[err.path] = err.message;
          });
          setErrors(newErrors);
        }
        throw error;
      });
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
              setErrors({ ...errors, name: "" });
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
              setErrors({ ...errors, cpf: "" });
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
              setErrors({ ...errors, email: "" });
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
              setErrors({ ...errors, phone: "" });
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
              setErrors({ ...errors, address: "" });
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
              setErrors({ ...errors, birthday: "" });
            }}
            error={!!errors["birthday"]}
            helperText={errors["birthday"]}
            type="date"
            name="birthday"
            label="Data de nascimento"
            inputProps={{ min: "1900-01-01" }}
          />

          <Input
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setErrors({ ...errors, password: "" });
            }}
            error={!!errors["password"]}
            helperText={errors["password"]}
            type="password"
            name="password"
            label="Senha"
            autoComplete="new-password"
          />

          <Input
            value={passwordConfirm}
            onChange={e => {
              setPasswordConfirm(e.target.value);
              setErrors({ ...errors, passwordConfirm: "" });
            }}
            error={!!errors["passwordConfirm"]}
            helperText={errors["passwordConfirm"]}
            type="password"
            name="passwordConfirm"
            label="Confirme a senha"
            autoComplete="new-password"
          />

          <Button variant="contained" color="primary" type="submit">
            Finalizar
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default RegisterClient;
