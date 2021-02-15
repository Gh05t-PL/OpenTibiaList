import React, {useContext} from "react";
import SessionContext from "../Contexts/AppContext";
import {Link, useHistory} from "react-router-dom";

const ProfileHeader = () => {
  const [session, setSession] = useContext(SessionContext);
  const history = useHistory();

  const handleLogout = () => {
    setSession({});
    fetch('http://localhost:8080/api/v1/security/logout', {credentials: "include"}).then((res) => {
      history.push('/')
    })
  }

  return (
    <>
      {!session?.loggedIn ?
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li> :
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {session.user.name}
          </a>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a>
            <Link className="dropdown-item" to="/dashboard/servers">Profile</Link>
            <div className="dropdown-divider"/>
            <Link className="dropdown-item" to="/dashboard/servers">Dashboard</Link>
          </div>
        </li>
      }
    </>
  )
}

export default ProfileHeader
