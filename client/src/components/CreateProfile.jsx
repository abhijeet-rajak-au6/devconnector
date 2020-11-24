import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { mapUserAndProfileToProps } from "../redux/mapStateToProps";
import { createProfile } from "../redux/actions/profleAction";
import { setAlert, removeAlert } from "../redux/actions/alertAction";
import { getCurrentUser } from "../redux/actions/userAction";
import Alert from "../components/error/Alert";

class CreateProfile extends Component {
  state = {
    status: "",
    company: "",
    website: "",
    location: "",
    skills: "",
    githubUserName: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    youtube: "",
    displaySocialInputs: false,
  };
  async componentDidMount() {
    const { profile, getCurrentUser } = this.props;
    console.log(profile);
    if (!profile) {
      const userProfile = await getCurrentUser();
      if (userProfile) {
        this.setState({
          status: "" || userProfile.status,
          company: "" || userProfile.company,
          website: "" || userProfile.website,
          location: "" || userProfile.location,
          skills:
            "" ||
            userProfile.skills.reduce((acc, curValue, idx) => {
              if (userProfile.skills.length - 1 !== idx)
                return (acc += curValue + ",");
              return (acc += curValue);
            }, ""),
          githubUserName: "" || userProfile.githubUserName,
          bio: "" || userProfile.bio,
          twitter: "" || userProfile.social.twitter,
          facebook: "" || userProfile.social.facebook,
          linkedin: "" || userProfile.social.linkedin,
          instagram: "" || userProfile.social.instagram,
          youtube: "" || userProfile.social.youtube,
        });
      }
    } else {
      this.setState({
        status: "" || profile.status,
        company: "" || profile.company,
        website: "" || profile.website,
        location: "" || profile.location,
        skills:
          "" ||
          profile.skills.reduce((acc, curValue, idx) => {
            if (profile.skills.length - 1 !== idx)
              return (acc += curValue + ",");
            return (acc += curValue);
          }, ""),
        githubUserName: "" || profile.githubUserName,
        bio: "" || profile.bio,
        twitter: "" || profile.social.twitter,
        facebook: "" || profile.social.facebook,
        linkedin: "" || profile.social.linkedin,
        instagram: "" || profile.social.instagram,
        youtube: "" || profile.social.youtube,
      });
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      createProfile,
      profile,
      setAlert,
      removeAlert,
      history,
    } = this.props;
    const {
      displaySocialInputs,
      status,
      bio,
      company,
      website,
      location,
      skills,
      githubUserName,
      twitter,
      facebook,
      linkedin,
      instagram,
      youtube,
    } = this.state;
    const userProfile = {
      status,
      bio,
      company,
      website,
      location,
      skills,
      githubUserName,
      social: {
        twitter,
        facebook,
        linkedin,
        instagram,
        youtube,
      },
    };
    try {
      console.log(Boolean(profile));
      console.log(profile);
      await createProfile(userProfile);
      history.push("/dashboard");
    } catch (err) {
      console.log(err);
      if(err.length){
        setAlert(err[0].msg, "error");
      }
      else{
        if (err.includes("Authentication failed")) {
          history.push("/login");
          return;
        }
      }
      
      // Internal Server error;
    }
  };
  render() {
    const {
      displaySocialInputs,
      status,
      bio,
      company,
      website,
      location,
      skills,
      githubUserName,
      twitter,
      facebook,
      linkedin,
      instagram,
      youtube,
    } = this.state;
    const { alert, profile } = this.props;
    // console.log(profile);
    return (
      <Fragment>
        {alert.message ? <Alert {...alert} /> : null}
        <section className="container">
          {profile ? (
            <h1 className="large text-primary">Update your profile</h1>
          ) : (
            <h1 className="large text-primary">Create your profile</h1>
          )}

          <p className="lead">
            <i className="fas fa-user"></i> Let's get some information to make
            your profile stand out
          </p>
          <small>* = required field</small>
          <form onSubmit={this.handleSubmit} className="form">
            <div className="form-group">
              <select onChange={this.handleChange} name="status" value={status}>
                <option value="0">* Select Professional Status</option>
                <option value="Developer">Developer</option>
                <option value="Junior Developer">Junior Developer</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Manager">Manager</option>
                <option value="Student or Learning">Student or Learning</option>
                <option value="Instructor">Instructor or Teacher</option>
                <option value="Intern">Intern</option>
                <option value="Other">Other</option>
              </select>
              <small className="form-text">
                Give us an idea of where you are at in your career
              </small>
            </div>
            <div className="form-group">
              <input
                onChange={this.handleChange}
                type="text"
                placeholder="Company"
                name="company"
                value={company}
              />
              <small className="form-text">
                Could be your own company or one you work for
              </small>
            </div>
            <div className="form-group">
              <input
                onChange={this.handleChange}
                type="text"
                placeholder="Website"
                name="website"
                value={website}
              />
              <small className="form-text">
                Could be your own or a company website
              </small>
            </div>
            <div className="form-group">
              <input
                onChange={this.handleChange}
                type="text"
                placeholder="Location"
                name="location"
                value={location}
              />
              <small className="form-text">
                City & state suggested (eg. Boston, MA)
              </small>
            </div>
            <div className="form-group">
              <input
                onChange={this.handleChange}
                type="text"
                placeholder="* Skills"
                name="skills"
                value={skills}
              />
              <small className="form-text">
                Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
              </small>
            </div>
            <div className="form-group">
              <input
                onChange={this.handleChange}
                type="text"
                placeholder="Github Username"
                name="githubUserName"
                value={githubUserName}
              />
              <small className="form-text">
                If you want your latest repos and a Github link, include your
                username
              </small>
            </div>
            <div className="form-group">
              <textarea
                onChange={this.handleChange}
                placeholder="A short bio of yourself"
                name="bio"
                value={bio}
              ></textarea>
              <small className="form-text">
                Tell us a little about yourself
              </small>
            </div>

            <div className="my-2">
              <button
                onClick={(e) =>
                  this.setState({
                    displaySocialInputs: !displaySocialInputs,
                  })
                }
                type="button"
                className="btn btn-light"
              >
                Add Social Network Links
              </button>
              <span>Optional</span>
            </div>

            {displaySocialInputs ? (
              <Fragment>
                <div className="form-group social-input">
                  <i className="fab fa-twitter fa-2x"></i>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Twitter URL"
                    name="twitter"
                    value={twitter}
                  />
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-facebook fa-2x"></i>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Facebook URL"
                    name="facebook"
                    value={facebook}
                  />
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-youtube fa-2x"></i>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    placeholder="YouTube URL"
                    name="youtube"
                    value={youtube}
                  />
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-linkedin fa-2x"></i>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Linkedin URL"
                    name="linkedin"
                    value={linkedin}
                  />
                </div>

                <div className="form-group social-input">
                  <i className="fab fa-instagram fa-2x"></i>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Instagram URL"
                    name="instagram"
                    value={linkedin}
                  />
                </div>
              </Fragment>
            ) : null}

            <input
              onChange={this.handleChange}
              type="submit"
              className="btn btn-primary my-1"
            />
            <Link className="btn btn-light my-1" to="/dashboard">
              Go Back
            </Link>
          </form>
        </section>
      </Fragment>
    );
  }
}
export default connect(mapUserAndProfileToProps, {
  createProfile,
  setAlert,
  removeAlert,
  getCurrentUser,
})(CreateProfile);
