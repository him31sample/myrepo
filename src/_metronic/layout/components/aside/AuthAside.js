import React from "react";
import {toAbsoluteUrl} from "../../../_helpers";
import {Link, Switch, Redirect} from "react-router-dom";

export function AuthAside() {

  return (
      <>
        {/*begin::Aside*/}
        <div
            className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={{
                backgroundImage: `url(${toAbsoluteUrl("/media/bg/bg-4.jpg")})`
            }}
        >
            {/*begin: Aside Container*/}
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
            {/* start:: Aside header */}
            <Link to="/" className="flex-column-auto mt-5">
                <img
                    alt="Logo"
                    className="max-h-70px"
                    src={toAbsoluteUrl("/media/logos/logo-letter-1.png")}
                />
            </Link>
            {/* end:: Aside header */}

            {/* start:: Aside content */}
            <div className="flex-column-fluid d-flex flex-column justify-content-center">
                <h3 className="font-size-h1 mb-5 text-white">
                Welcome to Metronic!
                </h3>
                <p className="font-weight-lighter text-white opacity-80">
                The ultimate Bootstrap & React 16 admin theme framework for next
                generation web apps.
                </p>
            </div>
            {/* end:: Aside content */}

            {/* start:: Aside footer for desktop */}
            <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                <div className="opacity-70 font-weight-bold	text-white">
                &copy; 2020 Metronic
                </div>
                <div className="d-flex">
                <Link to="/terms" className="text-white">
                    Privacy
                </Link>
                <Link to="/terms" className="text-white ml-10">
                    Legal
                </Link>
                <Link to="/terms" className="text-white ml-10">
                    Contact
                </Link>
                </div>
            </div>
            {/* end:: Aside footer for desktop */}
            </div>
            {/*end: Aside Container*/}
        </div>
        {/*begin::Aside*/}
      </>
  );
}
