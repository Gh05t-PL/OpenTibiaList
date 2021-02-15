import React from "react";
import {useHistory} from "react-router-dom";
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import TextField from "./Fields/TextField";
import CountryField from "./Fields/CountryField";

const RegisterForm = () => {
  const history = useHistory();

  // const login = (e) => {
  //   e.preventDefault();
  //   fetch('http://localhost:8080/api/v1/security/login', {
  //     method: 'POST',
  //     credentials: "include",
  //     body: JSON.stringify({
  //       email: email,
  //       password: password,
  //     })
  //   }).then((response) => {
  //     console.log(response)
  //     if (response.status === 401) {
  //       error({
  //         title: "Unauthorized!",
  //         text: 'Your credentials are invalid.',
  //         stack: MyStack
  //       })
  //
  //       return;
  //     }
  //
  //     response.json().then(function (data) {
  //       setSession({loggedIn: true, user: data})
  //       history.push('/')
  //       console.log(data)
  //     }).catch((e) => {
  //       error({
  //         title: "Error!",
  //         text: 'Invalid data received.',
  //         stack: MyStack
  //       })
  //     });
  //   })
  // }

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        country: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Email address must be valid one')
          .required('Required'),
        name: Yup.string()
          .matches(
            /^[a-zA-Z0-9]+$/
          )
          .required('Required'),
        password: Yup.string()
          .min(
            6,
            'Password must be minimum 6 characters long'
          )
          .required('Required'),
        confirmPassword: Yup.string()
          .oneOf(
            [Yup.ref("password")],
            "Both passwords need to be this same"
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
            label="Username"
            name="name"
            placeholder="Username"
          />
        </div>

        <div className="form-group">
          <CountryField
            label="Country"
            name="country"
            placeholder="Country"
          />
        </div>

        <div className="form-group">
          <TextField
            label="Password"
            name="password"
            placeholder="Password"
          />
        </div>

        <div className="form-group">
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>

        <div className="form-group mt-4">
          <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
        </div>
      </Form>
    </Formik>
  )
}

export default RegisterForm;
