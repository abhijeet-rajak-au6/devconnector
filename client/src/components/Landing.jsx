import React,{useEffect} from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { mapUserAndProfileToProps } from '../redux/mapStateToProps';


function Landing({user}) {

  useEffect(()=>{
    document.querySelector('.container').style.display="none";
  },[])
  return !user ? (
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Developer Connector</h1>
            <p className="lead">
              Create a developer profile/portfolio, share posts and get help
              from other developers
            </p>
            <div className="buttons">
              <Link className="btn btn-primary" to="/register">Sign Up</Link>
              <Link className="btn btn-light```" to="/login">Sign In</Link>
            </div>
          </div>
        </div>
      </section>
  ):(<Redirect to="/dashboard"/>);
}

export default connect(mapUserAndProfileToProps,null)(Landing);
