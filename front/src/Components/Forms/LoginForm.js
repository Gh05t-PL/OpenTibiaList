import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import TextField from "./Fields/TextField";
import {Link} from "react-router-dom";
import React, {useContext} from "react";
import {objectToQueryParam} from "../../Helpers/URLHelpers";
import {error} from "@pnotify/core";
import MyStack from "../../Pnotify/MyStack";
import SessionContext from "../../Contexts/AppContext";
import {useHistory} from "react-router";

const LoginForm = () => {
  const setSession = useContext(SessionContext)[1];
  const history = useHistory();

  const login = (values) => {
    console.log(values)
    fetch(window.API_HOST+`/api/v1/security/login${objectToQueryParam({"_remember_me": values.rememberMe})}`, {
      method: 'POST',
      credentials: "include",
      body: JSON.stringify({
        email: values.email,
        password: values.password
      })
    }).then((response) => {
      console.log(response)
      if (response.status === 401) {
        error({
          title: "Unauthorized!",
          text: 'Your credentials are invalid.',
          stack: MyStack
        })

        return;
      }

      response.json().then(function (data) {
        setSession({loggedIn: true, user: data})
        history.push('/')
        console.log(data)
      }).catch((e) => {
        error({
          title: "Error!",
          text: 'Invalid data received.',
          stack: MyStack
        })
      });
    })
  }

  return (
    <Formik
      initialValues={{
        'email': '',
        'password': '',
        'rememberMe': false,
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Email address must be valid one')
          .required('Required'),
        password: Yup.string()
          .required('Required'),
      })}
      onSubmit={(values) => {
        login(values);
      }}
    >
      <Form>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text"> <i className="fa fa-user"/> </span>
            </div>
            {/*<input name="" className="form-control" placeholder="Email" type="email"*/}
            {/*       onChange={e => setEmail(e.target.value)} value={email} required/>*/}
            <TextField
              label=""
              name="email"
              placeholder="Email"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text"> <i className="fa fa-lock"/> </span>
            </div>
            {/*<input className="form-control" placeholder="******" type="password"*/}
            {/*       onChange={e => setPassword(e.target.value)} value={password} required/>*/}
            <TextField
              label=""
              name="password"
              placeholder="Password"
              type="password"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="input-group">
            <div className="custom-control custom-checkbox">
              <Field
                type="checkbox"
                name="rememberMe"
                className="custom-control-input"
                id="rememberMe"
              />
              <label className="custom-control-label" htmlFor="rememberMe">Remember Session?</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block"> Login</button>
        </div>
        <p className="text-center"><Link to="/forgotten-password" className="btn">Forgot password?</Link></p>
        <p className="text-center"><Link to="/register" className="btn">Create Account</Link></p>
      </Form>
    </Formik>
  )
}

export default LoginForm;
