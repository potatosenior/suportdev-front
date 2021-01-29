import React from "react";
import { Route } from "react-router";

import App from "./App";
import Home from "./pages/home";

export default (
  <Route path="/" component={App}>
    {/* <IndexRoute component={Home} /> */}
    {/* <Route path="/some/where" component={SomePage} /> */}
  </Route>
);
