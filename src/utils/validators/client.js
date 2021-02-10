import validateCPF from "./cpf";
import yup from "../yup";

const clientValidator = yup.object().shape({
  name: yup.string().required().label("Nome"),
  cpf: yup
    .string()
    .required()
    .label("Cpf")
    .test("cpf-validator", "Cpf inválido!", value => {
      return validateCPF(value);
    }),
  email: yup
    .string()
    .lowercase()
    .required()
    .email("Email deve ser válido!")
    .label("Email"),
  phone: yup
    .string()
    .required()
    .label("Celular")
    .test("is-only-numbers", "Numero inválido!", value =>
      /^[0-9]*$/.test(value)
    )
    .max(11, "Número inválido!")
    .min(10, "Número inválido!"),
  address: yup.string().required().label("Endereço"),
  birthday: yup
    .string()
    .required()
    .label("Data de nascimento")
    .test("only-18", "Deve ser maior de 18 anos!", value => {
      const year = value.split("-")[0];
      const thisYear = new Date().getFullYear();

      return thisYear - year >= 18;
    }),
  password: yup.string().required().label("Senha").min(8, "Senha muito curta!"),
  passwordConfirm: yup
    .string()
    .required()
    .min(8, " ")
    .oneOf([yup.ref("password"), null], "Senhas não coincidem!")
    .label("Confirmar Senha"),
});

export default clientValidator;
