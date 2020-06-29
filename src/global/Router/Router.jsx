import React from "react";
import { Route, Switch } from "react-router-dom";
import { Routes } from "./Routes";

const Router = () => {
  return (
    <Route>
      <Switch>
        {Routes.map(({ path, exact, component, id }) => (
          <Route key={id} path={path} exact={exact} component={component} />
        ))}
      </Switch>
    </Route>
  );
};

export default Router;
