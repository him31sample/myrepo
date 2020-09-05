import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import AccountProfile from "./AccountProfile";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function Account() {
  const {isAuthorized} = useSelector(
    ({auth}) => ({
        isAuthorized: auth.user != null,
    }),
    shallowEqual
  );
  console.log("Authroization Status for Account")
  console.log(isAuthorized)
  if (!isAuthorized) {
    return <Redirect to="/auth/login" />
  } else {
    return (
      <Suspense fallback={<LayoutSplashScreen />}>
        <Switch>
  
          {
          /* Redirect from eCommerce root URL to /customers */
            <Redirect
              exact={true}
              from="/account"
              to="/account/profile"
            />
          }
          <ContentRoute path="/account/profile" component={AccountProfile} />
          <ContentRoute path="/account/profile/edit" component={AccountProfile} />
          <ContentRoute path="/account/verify-email" component={AccountProfile} />
          <ContentRoute path="/account/update-email" component={AccountProfile} />
          <ContentRoute path="/account/verify-phonenumber" component={AccountProfile} />
          <ContentRoute path="/account/update-phonenumber" component={AccountProfile} />
        </Switch>
      </Suspense>
    );
  }
}
