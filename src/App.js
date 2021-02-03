import React from "react";
import Home from "./pages/home";
import CreateCall from "./pages/createCall";
import CreateClient from "./pages/createClient";
import IndexClients from "./pages/indexClients";
import IndexCalls from "./pages/indexCalls";
import ViewCall from "./pages/viewCall";
import ViewClient from "./pages/viewClient";
import { Switch, Route } from "react-router-dom";
import "./css/App.css";

const App = () => (
  <Switch>
    <Route path="/calls/create">
      <CreateCall />
    </Route>

    <Route path="/calls/index">
      <IndexCalls />
    </Route>

    <Route path="/calls/view/:id">
      <ViewCall />
    </Route>

    <Route path="/clients/create">
      <CreateClient />
    </Route>

    <Route path="/clients/index">
      <IndexClients />
    </Route>

    <Route path="/clients/view/:id">
      <ViewClient />
    </Route>

    <Route path="/">
      <Home />
    </Route>
  </Switch>
);

export default App;
