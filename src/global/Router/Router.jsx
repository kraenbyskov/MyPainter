import React from "react";
import { Route, Switch } from "react-router-dom";
import { Routes } from "./Routes";

const Router = () => {
  return (
    <Route>
      <Switch>
        {Routes.map(({ path, exact, Component, id }) => (
          <Route key={id} path={path} exact={exact} component={Component} />
        ))}
      </Switch>
    </Route>
  );
};

export default Router;
