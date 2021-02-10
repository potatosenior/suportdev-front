import axios from "./axios";
import { HttpGetClient } from "../../data/protocols/http/http-get-client";
import { HttpPostClient } from "../../data/protocols/http/http-post-client";

export class AxiosHttpClient implements HttpGetClient, HttpPostClient {
  async post(url, body, ...rest) {
    return await axios
      .post(url, body, rest)
      .then(response => response)
      .catch(error => {
        if (error.response) throw error.response;
        throw error;
      });
  }

  async get(url, ...rest) {
    return await axios
      .get(url, rest)
      .then(response => response)
      .catch(error => {
        throw error.response;
      });
  }
}
