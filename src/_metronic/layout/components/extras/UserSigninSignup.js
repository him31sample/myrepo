/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useMemo} from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {useSelector} from "react-redux";
import objectPath from "object-path";
import {useHtmlClassService} from "../../_core/MetronicLayout";
import {UserProfileDropdown} from "./dropdowns/UserProfileDropdown";
import { toAbsoluteUrl, checkIsActive } from "../../../_helpers";
import { useLocation } from "react-router";
import { NavLink, Link } from "react-router-dom";


export function UserSigninSignup() {
  const location = useLocation();
  const {user} = useSelector(state => state.auth);
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas: objectPath.get(uiService.config, "extras.user.layout") === "offcanvas",
    };
  }, [uiService]);
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  }

  return <div
            id="kt_header_menu"
            className={`header-menu header-menu-left header-menu-mobile ${layoutProps.ktMenuClasses}`}
            {...layoutProps.headerMenuAttributes}
          >
            {/*begin::Header Nav*/}
            <ul className={`menu-nav ${layoutProps.ulClasses}`}>
                  {/*begin::1 Level*/}
                  <li className={`menu-item menu-item-rel ${getMenuItemActive('/auth/login')}`}>
                      <NavLink className="menu-link" to="/auth/login">
                          <span className="menu-text">Log In</span>
                      </NavLink>
                  </li>
                  {/*end::1 Level*/}

                  {/*begin::1 Level*/}
                  <li className={`menu-item menu-item-rel ${getMenuItemActive('/auth/registration')}`}>
                      <NavLink className="menu-link" to="/auth/registration">
                          <span className="menu-text">Sign Up/Register</span>
                      </NavLink>
                  </li>
                  {/*end::1 Level*/}

            </ul>
            {/*end::Header Nav*/}
          </div>;
}
