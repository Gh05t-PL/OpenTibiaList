import React from "react";
import {useHistory} from "react-router-dom";
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import TextField from "./Fields/TextField";
import {useLocation} from "react-router";
import queryString from "query-string";

const ActivateAccountForm = () => {
  // const history = useHistory();
  const location = useLocation();
  const token = queryString.parse(location.search).token ?? null;
  const email = queryString.parse(location.search).email ?? null;

  return (
    <Formik
      initialValues={{
        email: email || '',
        token: token || ''
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Email address must be valid one')
          .required('Required'),
        token: Yup.string()
          .matches(
            /^[A-Z0-9]+$/
          )
          .min(
            6,
            "Token is 6 character long"
          )
          .max(
            6,
            "Token is 6 character long"
          )
          .required('Required'),

      })}
      onSubmit={(values, {setSubmitting}) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >

      <Form>
        <div className="form-group">
          <TextField
            label="Email"
            name="email"
            placeholder="Email"
          />
        </div>

        <div className="form-group">
          <TextField
            label="Token"
            name="token"
            placeholder="Token"
          />
        </div>

        <div className="form-group mt-4">
          <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </div>
      </Form>
    </Formik>
  )
}

export default ActivateAccountForm;
