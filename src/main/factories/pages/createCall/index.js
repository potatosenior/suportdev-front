import React from "react";
import { AxiosHttpClient } from "../../../../infrastructure/http/axios-http-client";
import CreateCallPage from "../../../../presentation/pages/CreateCall";
import CreateCall from "../../../../domain/use_cases/call/CreateCall";
import callValidator from "../../../../utils/validators/call";

const createCallFactory = () => {
  const axiosHttpClient = new AxiosHttpClient();
  const createCall = new CreateCall(axiosHttpClient, callValidator);

  return <CreateCallPage createCall={createCall} />;
};

export default createCallFactory;
