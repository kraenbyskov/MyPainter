import React from "react";
import { Route, Switch } from "react-router-dom";
import Routes from "./Routes";

const Router = () => {
  return (
    <Route>
      <Switch>
        {Routes.map((route) => (
          <Route
            key={route.name}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Switch>
    </Route>
  );
};

export default Router;
