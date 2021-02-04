import React, { useState, useRef, useEffect } from "react";
import { Form } from "@unform/web";
import { useParams } from "react-router-dom";
import Input from "../components/input";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import ClearIcon from "@material-ui/icons/Clear";
import url from "../services/api";
import Navbar from "../components/navbar";
import clientValidator from "../utils/validators/client";
import cpfMask from "../utils/masks/cpf";
import phoneMask from "../utils/masks/phone";
import "../css/createCall.css";

const ViewClient = () => {
  const createClientFormRef = useRef();
  const [client, setClient] = useState(null);
  const [clientEditing, setClientEditing] = useState(null);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(url + "/clients/index/" + id, {
      method: "GET",
    }).then(async response => {
      await response.json().then(result => {
        if (!result.error) {
          updateState(result.data);
        }
      });
    });
  }, [id]);

  const updateState = data => {
    const parsedData = {
      ...data,
      cpf: cpfMask(data.cpf),
      phone_number: phoneMask(data.phone_number),
    };

    setClient(parsedData);
    setClientEditing(parsedData);
  };

  const updateClientHandler = async () => {
    try {
      const rawCpf = clientEditing.cpf.replace(/\D/g, "");
      const rawNumber = clientEditing.phone_number.replace(/\D/g, "");
      let newErrors = { ...errors };

      return await clientValidator
        .validate(
          { ...clientEditing, cpf: rawCpf, phone_number: rawNumber },
          { abortEarly: false }
        )
        .then(async result => {
          await fetch(url + "/clients/update", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(result),
          })
            .then(async response => {
              await response
                .json()
                .then(result => {
                  if (!result.error) {
                    updateState(result.data);
                    setEditing(false);
                    alert(result.message);
                  } else throw result.message;
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
          } else throw error;
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pg-container">
      <Navbar></Navbar>

      <div className="pg-content al-center">
        {client ? (
          <Form
            className="pg-form"
            ref={createClientFormRef}
            onSubmit={updateClientHandler}
          >
            <Input
              value={clientEditing ? clientEditing.name : ""}
              onChange={e => {
                setClientEditing({ ...clientEditing, name: e.target.value });
                setErrors({ ...errors, name: false });
              }}
              error={!!errors["name"]}
              helperText={errors["name"]}
              name="name"
              label="Nome"
              autoComplete="name"
              disabled={!editing}
            />

            <Input
              value={clientEditing ? clientEditing.cpf : ""}
              onChange={e => {
                setClientEditing({
                  ...clientEditing,
                  cpf: cpfMask(e.target.value),
                });
                setErrors({ ...errors, cpf: false });
              }}
              error={!!errors["cpf"]}
              helperText={errors["cpf"]}
              name="cpf"
              label="Cpf"
              disabled={!editing}
            />

            <Input
              value={clientEditing ? clientEditing.email : ""}
              onChange={e => {
                setClientEditing({ ...clientEditing, email: e.target.value });
                setErrors({ ...errors, email: false });
              }}
              error={!!errors["email"]}
              helperText={errors["email"]}
              name="email"
              label="Email"
              autoComplete="email"
              disabled={!editing}
            />

            <Input
              value={clientEditing ? clientEditing.phone_number : ""}
              onChange={e => {
                setClientEditing({
                  ...clientEditing,
                  phone_number: phoneMask(e.target.value),
                });
                setErrors({ ...errors, phone_number: false });
              }}
              error={!!errors["phone_number"]}
              helperText={errors["phone_number"]}
              name="phone_number"
              label="Numero de celular"
              autoComplete="tel-national"
              inputProps={{ maxLength: 15 }}
              disabled={!editing}
            />

            <Input
              value={clientEditing ? clientEditing.address : ""}
              onChange={e => {
                setClientEditing({ ...clientEditing, address: e.target.value });
                setErrors({ ...errors, address: false });
              }}
              error={!!errors["address"]}
              helperText={errors["address"]}
              name="address"
              label="Endereço"
              autoComplete="street-address"
              disabled={!editing}
            />

            <Input
              value={clientEditing ? clientEditing.date_of_birth : ""}
              onChange={e => {
                setClientEditing({
                  ...clientEditing,
                  date_of_birth: e.target.value,
                });
                setErrors({ ...errors, date_of_birth: false });
              }}
              error={!!errors["date_of_birth"]}
              helperText={errors["date_of_birth"]}
              type="date"
              name="date_of_birth"
              label="Data de nascimento"
              disabled={!editing}
              inputProps={{ min: "1900-01-01" }}
            />

            <div className="fl jf-end">
              {editing ? (
                <>
                  <IconButton variant="contained" color="primary" type="submit">
                    <SaveAltIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      setClientEditing(client);
                      setErrors({});
                      setEditing(false);
                    }}
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
                    onClick={() => setEditing(!editing)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    style={{ color: "#ff4040" }}
                    onClick={() => null}
                    variant="contained"
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </div>

            {/*           <Button variant="contained" color="primary" type="submit">
            Cadastrar novo cliente
          </Button> */}
          </Form>
        ) : (
          <div>
            <h1>Cliente não existe ou foi deletado!</h1>
          </div>
        )}
      </div>
    </div>
  );
};
export default ViewClient;
