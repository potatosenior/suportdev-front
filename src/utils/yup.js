const yup = require("yup");

yup.setLocale({
  mixed: {
    default: "inválido!",
    required: ({ label }) => label + " é uma informação necessária!",
  },
});

export default yup;
