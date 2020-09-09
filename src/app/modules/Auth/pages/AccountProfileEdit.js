import React, { useState, useEffect, useRef} from "react";
import { useFormik, withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { updateProfile } from "../_redux/authCrud";
import { Formik, Form, Field } from "formik";
import { Input, Select } from "../../../../_metronic/_partials/controls";
import { useSubheader } from "../../../../_metronic/layout";
import { shallowEqual, useSelector } from "react-redux";
import store from "../../../../redux/store"


function AccountProfileEdit(props) {

  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const suhbeader = useSubheader();
  const AccountProfileEditSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    last_name: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const saveProduct = (values) => {
    console.log("Save Product Values");
    console.log(values);
  };


  useEffect(() => {
    let _title = "Your Account";
    let _subheader_title = "My Account";
    setTitle(_title);
    suhbeader.setTitle(_subheader_title);
    // suhbeader.setBreadcrumbs(["Account", "Profile"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  console.log("Printing Props")
  console.log(props);
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={props.user}
        validationSchema={AccountProfileEditSchema}
        onSubmit={(values) => {
          saveProduct(values);
        }}
      >
        {({ handleSubmit, errors, status, values}) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field name="first_name" component={Input} label="First Name" />
                </div>
                <div className="col-lg-4">
                  <Field name="last_name" component={Input} label="Last Name" />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field name="country" component={Input} label="Country" />
                </div>
                <div className="col-lg-4">
                  <Field name="region" component={Input} label="Region" />
                </div>
                <div className="col-lg-4">
                  <Field name="city" component={Input} label="City" />
                </div>
              </div>
              
              <button
                type="submit"
                onSubmit={() => handleSubmit()}
              >Update Profile</button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(AccountProfileEdit));
