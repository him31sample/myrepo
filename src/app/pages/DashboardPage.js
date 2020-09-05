import React from "react";
import { Redirect, Switch } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { Dashboard } from "../../_metronic/_partials";

export function DashboardPage() {
  const {isAuthorized} = useSelector(
    ({auth}) => ({
        isAuthorized: auth.user != null,
    }),
    shallowEqual
  );
  if (!isAuthorized) {
    return <Redirect to="/auth/login" />
  } else {
    return <Dashboard />;
  }
}
