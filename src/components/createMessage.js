import React, { useState, useRef } from "react";
import { Form } from "@unform/web";
import Input from "./input";
import Button from "@material-ui/core/Button";
import url from "../services/api";

const CreateMessage = ({ callView, setCallView, ...rest }) => {
  const createMessageFormRef = useRef();
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(false);

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
          callId: callView.id,
        }),
      })
        .then(async response => {
          await response.json().then(result => {
            if (!result.error) {
              var final = { ...callView };
              final.msg.push(result.data);
              setCallView(final);
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
    <Form
      className="createMessage"
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
        size="small"
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
  );
};
export default CreateMessage;
