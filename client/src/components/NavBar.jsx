import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { mapUserAndProfileToProps } from "../redux/mapStateToProps";
import { logout } from "../redux/actions/userAction";

function NavBar({ user, logout, history }) {
  // console.log(user);
  const handleLogout = async (e) => {
    try {
      const message = await logout();
      history.push("/login");
    } catch (err) {
      if (err.includes("Authentication failed")) {
        history.push("/login");
        return;
      }
      //Internal server errror
    }
  };
  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-code"></i> DevConnector
          </Link>
        </h1>
        <ul>
          <li>
            <Link to="/profiles">Developer</Link>
          </li>
          {!user ? (
            <Fragment>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li>
                <Link to="/posts">Posts</Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <i className="fas fa-user"></i>
                  <span className="hide-sm">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link onClick={handleLogout} to="/logout">
                  <i className="fas fa-sign-out-alt"></i>
                  <span className="hide-sm">Logout</span>
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default connect(mapUserAndProfileToProps, { logout })(
  withRouter(NavBar)
);
