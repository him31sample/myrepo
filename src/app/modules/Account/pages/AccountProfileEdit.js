import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import * as account from "../_redux/accountRedux";
import { updateProfile } from "../_redux/accountCrud";
import { Formik, Form, Field } from "formik";
import { Input, Select } from "../../../../_metronic/_partials/controls";
import {
  AVAILABLE_COLORS,
  AVAILABLE_MANUFACTURES,
  ProductStatusTitles,
  ProductConditionTitles,
} from "../../ECommerce/pages/products/ProductsUIHelpers";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  username: "",
  country: "",
  region: "",
  city: "",
  phone_verified: false,
  email_verified: true
};

function AccountProfileEdit(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const RegistrationSchema = Yup.object().shape({
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
    email: Yup.string()
      .email("Wrong email format")
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

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
    onSubmit: (values, { setStatus, setFieldError, setSubmitting }) => {
      enableLoading();
      updateProfile(values.first_name, values.last_name, values.email, values.password)
        .then(({ data: { access } }) => {
          props.register(access);
          disableLoading();
        })
        .catch((error) => {
          setSubmitting(false);
          setStatus(
            intl.formatMessage({
              id: "AUTH.VALIDATION.INVALID_LOGIN",
            })
          );
          if (error.response) {
            setFieldError('first_name', error.response.data.first_name);
            setFieldError('last_name', error.response.data.last_name);
            setFieldError('email', error.response.data.email);
            setFieldError('password', error.response.data.password);
          }
          disableLoading();
        });
    },
  });

  return (
    <>
      <Form className="form form-label-right">
        <div className="form-group row">
          <div className="col-lg-4">
            <Field
              name="model"
              component={Input}
              placeholder="Model"
              label="Model"
            />
          </div>
          <div className="col-lg-4">
            <Select name="manufacture" label="Color">
              {AVAILABLE_MANUFACTURES.map((manufacture) => (
                <option key={manufacture} value={manufacture}>
                  {manufacture}
                </option>
              ))}
            </Select>
          </div>
          <div className="col-lg-4">
            <Field
              type="number"
              name="modelYear"
              component={Input}
              placeholder="Model year"
              label="Model year"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-lg-4">
            <Field
              type="number"
              name="mileage"
              component={Input}
              placeholder="Mileage"
              label="Mileage"
            />
          </div>
          <div className="col-lg-4">
            <Select name="color" label="Color">
              {AVAILABLE_COLORS.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </Select>
          </div>
          <div className="col-lg-4">
            <Field
              type="number"
              name="price"
              component={Input}
              placeholder="Price"
              label="Price ($)"
              customFeedbackLabel="Please enter Price"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-lg-4">
            <Field
              name="VINCode"
              component={Input}
              placeholder="VIN code"
              label="VIN code"
            />
          </div>
          <div className="col-lg-4">
            <Select name="status" label="Status">
              {ProductStatusTitles.map((status, index) => (
                <option key={status} value={index}>
                  {status}
                </option>
              ))}
            </Select>
          </div>
          <div className="col-lg-4">
            <Select name="condition" label="Condition">
              {ProductConditionTitles.map((condition, index) => (
                <option key={condition} value={index}>
                  {condition}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <Field
            name="description"
            as="textarea"
            className="form-control"
          />
        </div>
        <button
        type="submit"
        style={{ display: "none" }}
        onSubmit={() => formik.handleSubmit()}
      ></button>
      </Form>
    </>
  );
}

export default injectIntl(connect(null, account.actions)(AccountProfileEdit));
