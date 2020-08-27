import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { KundalisPage } from "./kundalis/KundalisPage";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function KundaliPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path="/astrology/kundalis" component={KundalisPage} />
      </Switch>
    </Suspense>
  );
}
