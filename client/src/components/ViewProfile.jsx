import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Spinner from "../components/common/Spinner";
import { getProfilesById } from "../redux/actions/profleAction";
import { mapUserAndProfileToProps } from "../redux/mapStateToProps";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperence";
import ProfileEducation from "./ProfileEducation";
import ProfileGitHub from './ProfileGitHub';
class ViewProfile extends Component {
  async componentDidMount() {
    const { getProfilesById, match } = this.props;
    try {
      const message = await getProfilesById(match.params.id);
      console.log(message);
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { loading, profile, user } = this.props;
    return !loading && profile ? (
      <Fragment>
        <Link to="/profiles" className="btn btn-light">
          Back To Profiles
        </Link>
        {user && user.id === profile.user._id && (
          <Link className="btn btn-dark" to="/createProfile">
            Edit Profile
          </Link>
        )}
        <div className="profile-grid my-1">
          <ProfileTop profile={profile} />
          <ProfileAbout profile={profile} />

          <div className="profile-exp bg-white p-2">
            <h2 class="text-primary">Experience</h2>
            {profile.experience.length > 0 ? (
              profile.experience.map(({ _id, ...otherProps }) => (
                <ProfileExperience key={_id} {...otherProps} />
              ))
            ) : (
              <h1> No exprience credentail is avaiable </h1>
            )}
          </div>

          <div className="profile-edu bg-white p-2">
            <h2 class="text-primary">Education</h2>
            {profile.education.length > 0 ? (
              profile.education.map(({ _id, ...otherProps }) => (
                <ProfileEducation key={_id} {...otherProps} />
              ))
            ) : (
              <h1> No education credentail is avaiable </h1>
            )}
          </div>
        </div>
        {profile.githubUserName && <ProfileGitHub username={profile.githubUserName}/>}
      </Fragment>
    ) : (
      <Spinner />
    );
  }
}

export default connect(mapUserAndProfileToProps, { getProfilesById })(
  ViewProfile
);
