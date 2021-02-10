"use-strict";

export default class loginClient {
  constructor(httpClient, setToken) {
    this.httpClient = httpClient;
    this.setToken = setToken;
  }

  async login(email, password) {
    return this.httpClient
      .post("/oauth/token", { email, password })
      .then(response => {
        this.setToken(response.data);

        return true;
      })
      .catch(error => {
        throw error;
      });
  }
}
