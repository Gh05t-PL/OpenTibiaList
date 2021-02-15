import React, {useState} from "react";

import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import ServerList from "../Components/ServerList";
import {useLocation} from "react-router";
import AddServerForm from "../Components/Forms/AddServerForm";

const ServerDashboardSite = () => {
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);


  return (<Switch>
      <Router>
        <>
          <div className="row">
            <nav className="nav nav-tabs">
              <Link
                className={`nav-item nav-link ${pathname !== "/dashboard/servers" ? "" : "active"}`}
                to="/dashboard/servers"
                onClick={() => {
                  setPathname("/dashboard/servers")
                }}
              >Your Servers</Link>
              <Link
                className={`nav-item nav-link ${pathname !== "/dashboard/servers/add" ? "" : "active"}`}
                to="/dashboard/servers/add"
                onClick={() => {
                  setPathname("/dashboard/servers/add")
                }}
              >Add Server</Link>

              {/*<a className="nav-link" href="#">Link</a>*/}
              {/*<a className="nav-link" href="#">Link</a>*/}
              {/*<a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>*/}
            </nav>
          </div>

          <br/>
          <br/>
          <div className="row rounded justify-content-center">
            <Route path="/dashboard/servers" exact>
              <ServerList endpoint={"api/v1/profile/servers"} link={"/dashboard/servers/{id}"}/>
            </Route>
            <Route path="/dashboard/servers/add" exact>
              <AddServerForm/>
            </Route>
          </div>

        </>
      </Router></Switch>
  )
}

export default ServerDashboardSite;
