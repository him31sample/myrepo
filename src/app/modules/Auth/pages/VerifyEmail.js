import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { Link, Redirect, useParams, useLocation} from "react-router-dom";
import * as Yup from "yup";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { resetPasswordConfirm } from "../_redux/authCrud";
import queryString from 'query-string';

const initialValues = {
  uid:"",
  token:"",
};

function VerifyEmail(props) {
  const { intl } = props;
  const [isRequested, setIsRequested] = useState(false);
  initialValues.uid = useParams().uid;
  initialValues.token = useParams().token;
  console.log(initialValues);


  const formik = useFormik({
    initialValues,
    onSubmit: (values, { setStatus, setFieldError, setSubmitting }) => {
      resetPasswordConfirm(values.uid, values.token)
        .then(() => {
          setIsRequested(true);
          console.log(values);
        })
        .catch((error) => {
          setIsRequested(false);
          setSubmitting(false);
          setStatus(
            intl.formatMessage(
              { id: "AUTH.VALIDATION.NOT_FOUND" },
              { name: values.email }
            )
          );
          if (error.response.data) {
            setStatus(error.response.data.detail);
            setFieldError('new_password', error.response.data.new_password);
            setFieldError('confirm_new_password', error.response.data.confirm_new_password);
          }
        });
    },
  });

  return (
    <>
      {isRequested && <Redirect to="/auth" />}
      {!isRequested && (
        <div className="login-form login-forgot" style={{ display: "block" }}>
          <div className="text-center mb-10 mb-lg-20">
            <h3 className="font-size-h1">Email Verification ?</h3>
            <div className="text-muted font-weight-bold">
              Enter new password for your account
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
          >
            {formik.status && (
              <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                <div className="alert-text font-weight-bold">
                  {formik.status}
                </div>
              </div>
            )}

            
            <div className="form-group d-flex flex-wrap flex-center">
              <button
                id="kt_login_forgot_submit"
                type="submit"
                className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                disabled={formik.isSubmitting}
              >
                Submit
              </button>
              <Link to="/auth">
                <button
                  type="button"
                  id="kt_login_forgot_cancel"
                  className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(VerifyEmail));
