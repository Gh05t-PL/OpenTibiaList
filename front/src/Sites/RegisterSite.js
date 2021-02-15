import React from "react";
import {useHistory} from "react-router-dom";
import RegisterForm from "../Components/Forms/RegisterForm";

const RegisterSite = () => {
  const history = useHistory();

  return (
    <>
      <div className="row justify-content-center">
        <div className="card" style={{marginTop: '30px'}}>
          <article className="card-body" style={{width: "350px"}}>
            <h4 className="card-title text-center mb-4 mt-1">Register</h4>
            <hr/>
            <p className="text-success text-center">Create your OTList account</p>
            <RegisterForm/>
          </article>
        </div>
      </div>
    </>
  )
}

export default RegisterSite;
