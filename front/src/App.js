import React, {useEffect, useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";

import "@pnotify/core/dist/PNotify.css";
import '@pnotify/bootstrap4/dist/PNotifyBootstrap4.css';
import {defaultModules} from "@pnotify/core";

import ServerListSite from "./Sites/ServerListSite";
import SessionContext from "./Contexts/AppContext";
import ProfileHeader from "./Components/ProfileHeader";
import LoginSite from "./Sites/LoginSite";
import ServerDashboardSite from "./Sites/ServerDashboardSite";
import RegisterSite from "./Sites/RegisterSite";
import ActivateAccountSite from "./Sites/ActivateAccountSite";
import ServerDetailSite from "./Sites/ServerDetailSite";

import PNotifyBootstrap4 from '@pnotify/bootstrap4';
import PNotifyFontAwesome4 from '@pnotify/font-awesome4';
// const PNotifyFontAwesome4 = require'@pnotify/font-awesome4';
defaultModules.set(PNotifyBootstrap4, {})
defaultModules.set(PNotifyFontAwesome4, {})

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [context, setContext] = useState();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/security/isLoggedIn', {credentials: "include"})
      .then((response) => {
        if (response.status === 401) {
          return;
        }

        response.json().then(function (data) {
          setContext({loggedIn: true, user: data})
        })
      })
      .catch(() => {

      })
  }, [])

  return (
    <SessionContext.Provider value={[context, setContext]}>
      <div className={isMenuOpen ? "d-flex" : "d-flex toggled"} id="wrapper">
        <Router>

          <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">OpenTibiaList</div>
            <div className="list-group list-group-flush">
              <form
                className="list-group-item  form-inline d-flex justify-content-center md-form form-sm mt-0 bg-light">
                <i className="fas fa-search" aria-hidden="true"/>
                <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
                       aria-label="Search"/>
              </form>

              <Link className="list-group-item list-group-item-action bg-light" to="/servers">Servers</Link>
              <Link className="list-group-item list-group-item-action bg-light" to="/upcoming">Starting Soon</Link>
              <Link className="list-group-item list-group-item-action bg-light" to="/download">Download</Link>
            </div>
          </div>


          <div id="page-content-wrapper">

            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
              <button className="btn btn-primary" id="menu-toggle" onClick={toggleMenu}><i className="fas fa-bars"/>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                  <ProfileHeader/>
                </ul>
              </div>
            </nav>

            <div className="container-fluid" style={{padding: "20px 80px 0px 80px"}}>

              <Switch>
                <Route exact path="/servers" component={ServerListSite}/>
                <Route path="/server/:id" component={ServerDetailSite} />
                <Route exact path="/upcoming">
                  <p>bbbb</p>
                </Route>
                <Route exact path="/download">
                  <p>cccc</p>
                </Route>
                <Route exact path="/login">
                  <LoginSite/>
                </Route>
                <Route exact path="/register">
                  <RegisterSite/>
                </Route>
                <Route exact path="/register/confirm">
                  <ActivateAccountSite/>
                </Route>
                <Route exact path="/dashboard">
                  <ServerDashboardSite/>
                </Route>
                <Route exact path="/">
                  <Redirect to="/servers"/>
                </Route>
              </Switch>
            </div>
          </div>

        </Router>
      </div>
    </SessionContext.Provider>
  );
}

export default App;
