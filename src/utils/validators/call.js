import validateCPF from "./cpf";
import yup from "../yup";

const callValidator = yup.object().shape({
  name: yup.string().required().label("Nome"),
  cpf: yup
    .string()
    .label("Cpf")
    .required()
    .test("cpf-validator", "Cpf inválido!", value => {
      console.log(validateCPF(value));
      return validateCPF(value);
    }),
  description: yup
    .string()
    .lowercase()
    .required()
    .label("Descrição")
    .min(30, "Nos dê uma descrição mais detalhada, min. 30 caracteres."),
});

export default callValidator;
