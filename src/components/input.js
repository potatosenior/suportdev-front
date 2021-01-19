import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import TextField from "@material-ui/core/TextField";

/**
 * Componente input usado em toda aplicação
 *
 * @param {*} {
 * name, - nome do elemento
 * ...rest - outras props
 * }
 * @return {*} Componenete do tipo TextField registrado no unform
 */
const Input = ({ name, ...rest }) => {
  const inputRef = useRef();
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    // registra o TextField para ser utilizado junto com o unform
    registerField({
      name: fieldName,
      getValue: ref => {
        return ref.value;
      },
      ref: inputRef.current,
    });
  }, [fieldName, registerField]);

  return (
    <TextField
      name={name}
      inputRef={inputRef}
      id="outlined-basic"
      label={name}
      variant="outlined"
      autoComplete="off"
      style={{ paddingBottom: "10px" }}
      inputProps={{ maxLength: 255 }}
      {...rest}
    />
  );
};
export default Input;
