import React from "react";
import Login from "../../../../presentation/pages/Login";
import { AxiosHttpClient } from "../../../../infrastructure/http/axios-http-client";
import LoginClient from "../../../../domain/use_cases/client/loginClient";
import { setToken } from "../../../../services/auth";

const loginClientFactory = () => {
  const axiosHttpClient = new AxiosHttpClient();
  const loginClient = new LoginClient(axiosHttpClient, setToken);

  return <Login loginClient={loginClient} />;
};

export default loginClientFactory;
