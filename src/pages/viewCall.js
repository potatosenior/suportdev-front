import React, { useState, useEffect, useRef } from "react";
import { Form } from "@unform/web";
import { Link, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Input from "../components/input.js";
import IconButton from "@material-ui/core/IconButton";
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
import url from "../services/api";
import Navbar from "../components/navbar";
import "../css/viewCall.css";

const ViewCall = () => {
  const [call, setCall] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(false);
  const editCallFormRef = useRef();
  const createMessageFormRef = useRef();
  const { id } = useParams();

  useEffect(() => {
    fetch(url + "/calls/index/" + id, {
      method: "GET",
    })
      .then(async response => {
        await response.json().then(async result => {
          if (!result.error) {
            await fetch(url + "/clients/index/" + result.client_id, {
              method: "GET",
            })
              .then(result2 => {
                if (!result2.error)
                  result2
                    .json()
                    .then(client => {
                      updateCallStates({ ...result, cpf: client.cpf });
                    })
                    .catch(error => console.error(error));
                else alert(result.message);
              })
              .catch(error => console.error(error));
          } else {
            // alert(result.message);
          }
        });
      })
      .catch(e => {
        console.error(e);
      });

    getMessages(id).then(result => {
      if (result) setMessages(result);
    });
  }, [id]);

  const getMessages = async id => {
    return await fetch(url + "/calls/messages/index?callId=" + id, {
      method: "GET",
    })
      .then(async response => {
        return await response.json().then(result => {
          return result;
        });
      })
      .catch(e => {
        console.error("error: ", e);
        throw new Error(e);
      });
  };

  const resetFields = () => {
    setName(call.name);
    setCpf(call.cpf);
    setDescription(call.description);
    setStatus(call.status);
    setEditing(!editing);
  };

  const updateCallStates = newCall => {
    setCall(newCall);
    setName(newCall.name);
    setStatus(newCall.status);
    setDescription(newCall.description);
    setCpf(newCall.cpf);
  };

  const editCall = async data => {
    await fetch(url + "/calls/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        id: call.id,
        status: status,
      }),
    })
      .then(async response => {
        response
          .json()
          .then(async result => {
            if (!result.error) {
              setCall({ ...call, ...result.data });
              setEditing(!editing);
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
  };

  const deleteCall = async () => {
    await fetch(url + "/calls/delete?callId=" + call.id, {
      method: "DELETE",
    }).then(response => {
      response
        .json()
        .then(result => {
          if (!result.error) {
            setCall(null);
          } else {
            alert(result.message);
          }
        })
        .catch(error => {
          console.error(error);
        });
    });
  };

  const createMessage = async data => {
    if (data.content === "") {
      return setMessageError(true);
    }

    try {
      await fetch(url + "/calls/messages/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: data.content,
          id: call.id,
        }),
      })
        .then(async response => {
          await response.json().then(result => {
            if (!result.error) {
              // console.log(result)
              setMessages([...messages, result.data]);
              setMessage("");
            } else {
              alert(result.message);
            }
          });
        })
        .catch(e => {
          console.log("error: ", e);
        });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="pg-container">
      <Navbar></Navbar>

      <div className="pg-content al-center">
        {call ? (
          <div className="view-form form-border fl fl-ro jf-around">
            <div>
              <Form
                className="fl fl-cl"
                ref={editCallFormRef}
                onSubmit={editCall}
              >
                <Input
                  disabled={!editing}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  name="name"
                  required
                  label="Nome do atendente"
                />

                <Input
                  value={cpf}
                  onChange={e => setCpf(e.target.value)}
                  name="cpf"
                  disabled={!editing}
                  label="Cpf do cliente"
                  required
                />

                <Input
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  multiline={true}
                  rows={4}
                  name="description"
                  disabled={!editing}
                  required
                  label="Descrição do chamado"
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
                      disabled={!editing}
                    />
                    <FormControlLabel
                      checked={status === "closed"}
                      value="closed"
                      control={<Radio />}
                      label="Fechado"
                      disabled={!editing}
                    />
                  </RadioGroup>
                </FormControl>

                <div className="callCardViewIcons">
                  <Link to="/calls/index" style={{ marginRight: "auto" }}>
                    <IconButton
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        setEditing(false);
                        setCall(null);
                      }}
                    >
                      <CancelPresentationIcon />
                    </IconButton>
                  </Link>

                  {editing ? (
                    <>
                      <IconButton
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        <SaveAltIcon />
                      </IconButton>

                      <IconButton
                        onClick={resetFields}
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
                        onClick={() => deleteCall()}
                        variant="contained"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </div>
              </Form>
            </div>

            <div>
              <h3>Mensagens</h3>

              <Form
                className="fl fl-cl"
                ref={createMessageFormRef}
                onSubmit={createMessage}
              >
                <Input
                  value={message}
                  onChange={e => {
                    setMessage(e.target.value);
                    setMessageError(false);
                  }}
                  error={messageError}
                  helperText="Insira o conteudo da mensagem"
                  multiline={true}
                  name="content"
                  label="Conteudo"
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

              <div className="messagesContainer">
                {messages.map(msg => {
                  let date = new Date(msg.createdAt);

                  return (
                    <div key={msg.id} className="message">
                      <p>{msg.content}</p>

                      <span>
                        {date.getHours() +
                          ":" +
                          date.getMinutes() +
                          " " +
                          date.getDate() +
                          "/" +
                          parseInt(date.getMonth() + 1)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <h1>Esse chamado não existe ou deletado!</h1>
        )}
      </div>
    </div>
  );
};
export default ViewCall;
