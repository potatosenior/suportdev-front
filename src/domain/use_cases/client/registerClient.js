"use-strict";

import Client from "../../entities/Client";

export default class registerClient {
  constructor(httpClient, clientValidator) {
    this.httpClient = httpClient;
    this.clientValidator = clientValidator;
  }

  async register({
    name,
    cpf,
    email,
    address,
    phone,
    birthday,
    password,
    passwordConfirm,
  }) {
    return this.clientValidator
      .validate(
        {
          name,
          cpf,
          email,
          address,
          phone,
          birthday,
          password,
          passwordConfirm,
        },
        { abortEarly: false }
      )
      .then(result => {
        const client = new Client(result);

        return this.httpClient
          .post("/clients/create", client)
          .then(response => response)
          .catch(error => {
            throw error;
          });
      })
      .catch(error => {
        throw error;
      });
  }
}
