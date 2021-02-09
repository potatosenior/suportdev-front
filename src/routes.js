import React from "react";
import Home from "./pages/home";
import CreateCall from "./pages/createCall";
import CreateClient from "./pages/createClient";
import IndexClients from "./pages/indexClients";
import IndexCalls from "./pages/indexCalls";
import ViewCall from "./pages/viewCall";
import ViewClient from "./pages/viewClient";
import Login from "./pages/login";
import Register from "./pages/register";
import { Switch, Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import "./css/App.css";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>

    <Route path="/login">
      <Login />
    </Route>

    <Route path="/register">
      <Register />
    </Route>

    <PrivateRoute path="/calls/create" component={CreateCall} />

    <PrivateRoute path="/calls/index" component={IndexCalls} />

    <PrivateRoute path="/calls/view/:id" component={ViewCall} />

    <PrivateRoute path="/clients/create" component={CreateClient} />

    <PrivateRoute path="/clients/index" component={IndexClients} />

    <PrivateRoute path="/clients/view/:id" component={ViewClient} />

    <Route path="*" component={() => <h1>Pagina não encontrada!</h1>} />
  </Switch>
);

export default Routes;
