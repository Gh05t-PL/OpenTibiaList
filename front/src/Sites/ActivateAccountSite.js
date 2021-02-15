import React from "react";
import {useHistory} from "react-router-dom";
import RegisterForm from "../Components/Forms/RegisterForm";
import ActivateAccountSite from "./ActivateAccountSite";
import ActivateAccountForm from "../Components/Forms/ActivateAccountForm";

const RegisterSite = () => {
  const history = useHistory();

  return (
    <>
      <div className="row justify-content-center">
        <div className="card" style={{marginTop: '30px'}}>
          <article className="card-body" style={{width: "350px"}}>
            <h4 className="card-title text-center mb-4 mt-1">Confirm Email</h4>
            <hr/>
            <p className="text-success text-center">Confirm email for your OTList account</p>
            <ActivateAccountForm/>
          </article>
        </div>
      </div>
    </>
  )
}

export default RegisterSite;
