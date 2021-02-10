import React from "react";
import Register from "../../../../presentation/pages/Register";
import { AxiosHttpClient } from "../../../../infrastructure/http/axios-http-client";
import registerClient from "../../../../domain/use_cases/client/registerClient";
import clientValidator from "../../../../utils/validators/client";

const registerClientFactory = () => {
  const axiosHttpClient = new AxiosHttpClient();
  const registerClientHandler = new registerClient(
    axiosHttpClient,
    clientValidator
  );

  return <Register registerClient={registerClientHandler} />;
};

export default registerClientFactory;
