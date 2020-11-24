import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addExperience } from "../redux/actions/profleAction";
import { setAlert, removeAlert } from "../redux/actions/alertAction";
import { mapAlertToProps } from "../redux/mapStateToProps";
import Alert from "../components/error/Alert";

class AddExperience extends Component {
  state = {
    title: "",
    company: "",
    location: "",
    current: false,
    from: "",
    to: "",
    description: "",
    disableTo: false,
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleChangeCurrent = (e) => {
    this.setState({
      [e.target.name]: e.target.checked,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { addExperience, history, setAlert, removeAlert } = this.props;
    try {
      await addExperience(this.state);
      history.push("/dashboard");
    } catch (err) {
      console.log(err);
      if (err.includes("Authentication failed")) {
        history.push("/login");
        return;
      }
      setAlert(err, "error");
      setTimeout(() => {
        removeAlert();
      }, 3000);
    }
  };
  render() {
    const {
      title,
      company,
      location,
      current,
      from,
      to,
      description,
      disableTo,
    } = this.state;
    const { alert } = this.props;
    return (
      <Fragment>
        {alert.message ? <Alert {...alert} /> : null}
        <h1 class="large text-primary">Add An Experience</h1>
        <p class="lead">
          <i class="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form onSubmit={this.handleSubmit} class="form">
          <div class="form-group">
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="* Job Title"
              name="title"
              required
              value={title}
            />
          </div>
          <div class="form-group">
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="* Company"
              name="company"
              required
              value={company}
            />
          </div>
          <div class="form-group">
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="Location"
              name="location"
              value={location}
            />
          </div>
          <div class="form-group">
            <h4>From Date</h4>
            <input
              onChange={this.handleChange}
              type="date"
              name="from"
              value={from}
            />
          </div>
          <div class="form-group">
            <p>
              <input
                onChange={this.handleChangeCurrent}
                type="checkbox"
                name="current"
                value={current}
              />{" "}
              Current Job
            </p>
          </div>
          <div class="form-group">
            <h4>To Date</h4>
            <input
              onChange={this.handleChange}
              type="date"
              name="to"
              value={to}
              disabled={current}
            />
          </div>

          <div class="form-group">
            <textarea
              onChange={this.handleChange}
              name="description"
              cols="30"
              rows="5"
              placeholder="Job Description"
              value={description}
            ></textarea>
          </div>
          <input type="submit" class="btn btn-primary my-1" />
          <a class="btn btn-light my-1" href="/dashboard">
            Go Back
          </a>
        </form>
      </Fragment>
    );
  }
}

export default connect(mapAlertToProps, {
  addExperience,
  setAlert,
  removeAlert,
})(AddExperience);
