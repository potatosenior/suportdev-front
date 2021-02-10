"use-strict";

import Call from "../../entities/Call";

export default class createCall {
  constructor(httpClient, callValidator) {
    this.httpClient = httpClient;
    this.callValidator = callValidator;
  }

  async create(call) {
    return this.callValidator
      .validate(call, { abortEarly: false })
      .then(result => {
        return this.httpClient
          .post("/calls/create", result)
          .then(response => {
            return new Call(response.data.data);
          })
          .catch(error => {
            throw error;
          });
      })
      .catch(error => {
        throw error;
      });
  }
}
