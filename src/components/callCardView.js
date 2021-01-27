import React, { useState, useEffect, useRef } from "react";
import { Form } from "@unform/web";
import CreateMessage from "./createMessage";
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
import url from "../services/api";

const CallCardView = ({ calls, setCalls, callView, setCallView, ...rest }) => {
  const editCallFormRef = useRef();
  const [editando, setEditando] = useState(false);
  const [name, setName] = useState(callView.name);
  const [client, setClient] = useState(callView.client);
  const [description, setDescription] = useState(callView.description);
  const [status, setStatus] = useState(callView.status);

  const resetFields = () => {
    setName(callView.name);
    setClient(callView.client);
    setDescription(callView.description);
    setStatus(callView.status);
    setEditando(!editando);
  };

  useEffect(() => {
    setName(callView.name);
    setClient(callView.client);
    setDescription(callView.description);
    setStatus(callView.status);
  }, [callView]);

  const editCall = async data => {
    await fetch(url + "/calls/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        status: status,
        callId: callView.id,
      }),
    })
      .then(async response => {
        response
          .json()
          .then(async result => {
            if (!result.error) {
              const final = { ...callView, ...result.data };

              let idx = calls.findIndex(elem => elem.id === callView.id);
              let callsCopia = [...calls];

              callsCopia[idx] = final;

              setCalls(callsCopia);
              setCallView(final);
              setEditando(!editando);
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
    await fetch(url + "/calls/deletar?callId=" + callView.id, {
      method: "DELETE",
    }).then(response => {
      response
        .json()
        .then(result => {
          if (!result.error) {
            var final = [...calls];
            final = final.filter(item => item.id !== callView.id);

            setCalls(final);
            setCallView(null);
          } else {
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("error: ", e);
        });
    });
  };

  return (
    <div {...rest} className="callCardView">
      <Form className="editCall" ref={editCallFormRef} onSubmit={editCall}>
        <Input
          disabled={!editando}
          value={name}
          onChange={e => setName(e.target.value)}
          name="name"
          required
          size="small"
        />

        <Input
          value={client}
          onChange={e => setClient(e.target.value)}
          name="client"
          disabled={!editando}
          size="small"
          required
        />

        <Input
          value={description}
          onChange={e => setDescription(e.target.value)}
          multiline={true}
          rows={4}
          name="description"
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
              checked={status === "open"}
              value="open"
              control={<Radio />}
              label="Aberto"
              disabled={!editando}
            />
            <FormControlLabel
              checked={status === "closed"}
              value="closed"
              control={<Radio />}
              label="Fechado"
              disabled={!editando}
            />
          </RadioGroup>
        </FormControl>

        <div className="callCardViewIcons">
          <IconButton
            variant="contained"
            color="primary"
            style={{ marginRight: "auto" }}
            onClick={() => {
              setEditando(false);
              setCallView(null);
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
                onClick={() => setEditando(!editando)}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                onClick={() => deleteCall()}
                variant="contained"
                color="primary"
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </div>
      </Form>

      <h3>Messages</h3>

      <CreateMessage callView={callView} setCallView={setCallView} />

      <div className="messagesContainer">
        {callView.msg.map(msg => {
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
  );
};

export default CallCardView;
