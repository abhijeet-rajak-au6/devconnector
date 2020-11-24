import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { mapUserAndProfileToProps } from "../redux/mapStateToProps";
import { Link, withRouter } from 'react-router-dom';
import Spinner from "../components/common/Spinner";
import { getCurrentUser } from "../redux/actions/userAction";
import Alert from "../components/error/Alert";
import DashBoardAction from '../components/dashBoardAction.jsx';
import Experience from '../components/Experience';
import Education from '../components/Education';
import { deleteUser } from '../redux/actions/profleAction';
class DashBoard extends Component {
  async componentDidMount() {
    const { getCurrentUser, history } = this.props;
    try {
      await getCurrentUser();
    } catch (err) {
      history.push("/login");
    }
  }
  handleDeleteAccount=async (e)=>{
    const {history, deleteUser } = this.props;
    try{
     
      const message =await deleteUser();
      console.log(message);
      history.push("/login");
    }catch(err){
      console.log(err);
    }
  }
  render() {
    const { user, profile, alert , profileFetching} = this.props;
    return user && !profileFetching ? (
      <div>
        { alert.message ? <Alert { ...alert } /> : null }
        <h1 className="large text-primary">DashBoard</h1>
        <p className="lead">
          <i className="fas fa-user"></i>
          Welcome {user && user.name}
        </p>

        {!profile && !profileFetching ? (
          <Fragment>
            <p>You havent create your profile please add some info</p>
          <Link to="/createProfile" className="btn btn-primary my-1">
                Create Profile
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <DashBoardAction/>
            <Experience/>
            <Education/>

            <div className="my-2">
              <button onClick={this.handleDeleteAccount} className="btn btn-danger">
                <i className="fas fa-user-minus"></i>
                Delete My Acoount
              </button>
            </div>
          </Fragment>
        )}
      </div>
    ) : (
      <Spinner />
    );
  }
}
export default connect(mapUserAndProfileToProps, { getCurrentUser, deleteUser })(withRouter(DashBoard));
