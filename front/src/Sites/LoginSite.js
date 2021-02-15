import React from "react";
import LoginForm from "../Components/Forms/LoginForm";

const LoginSite = () => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="card" style={{marginTop: '30px'}}>
          <article className="card-body" style={{width: "350px"}}>
            <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>
            <hr/>
            <p className="text-success text-center">Hello Tibia Community Member</p>
            <LoginForm />
          </article>
        </div>
      </div>
    </>
  )
}

export default LoginSite;
