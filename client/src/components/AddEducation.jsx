import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addEducation } from "../redux/actions/profleAction";
import { setAlert, removeAlert } from "../redux/actions/alertAction";
import Alert from './error/Alert';
import { mapAlertToProps } from '../redux/mapStateToProps';

class AddEducation extends Component {
  state = {
    institution: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleChangeChecked = (e) => {
    this.setState({
      [e.target.name]: e.target.checked,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { addEducation, history, setAlert, removeAlert } = this.props;
    try {
      await addEducation(this.state);
      console.log("/dashboard");
      history.push("/dashboard");
    } catch (err) {
      console.log(err);
      console.log(err.includes("Authentication failed"))
      if(err.includes("Authentication failed")){
        history.push("/login");
        return 
      }
        setAlert(err,"error");
        setTimeout(() => {
          removeAlert();
        }, 3000);
    }
  };
  render() {
    const {
      institution,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    } = this.state;
    const {alert} = this.props;
    return (
      <Fragment>
        {alert.message ? <Alert {...alert}  /> : null }
        
        <h1 className="large text-primary">Add Your Education</h1>
        <p className="lead">
          <i className="fas fa-graduation-cap"></i> Add any school, bootcamp,
          etc that you have attended
        </p>
        <small>* = required field</small>
        <form onSubmit={this.handleSubmit} className="form">
          <div className="form-group">
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="* School or Bootcamp"
              name="institution"
              required
              value={institution}
            />
          </div>
          <div className="form-group">
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="* Degree or Certificate"
              name="degree"
              required
              value={degree}
            />
          </div>
          <div className="form-group">
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="Field Of Study"
              name="fieldOfStudy"
              value={fieldOfStudy}
            />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input
              onChange={this.handleChange}
              type="date"
              name="from"
              value={from}
            />
          </div>
          <div className="form-group">
            <p>
              <input
                onChange={this.handleChangeChecked}
                type="checkbox"
                name="current"
                value={current}
                checked={current}
              />{" "}
              Current School or Bootcamp
            </p>
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input
              onChange={this.handleChange}
              type="date"
              name="to"
              value={to}
              disabled={current}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={this.handleChange}
              name="description"
              cols="30"
              rows="5"
              placeholder="Program Description"
              value={description}
            ></textarea>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <a className="btn btn-light my-1" href="/dashboard">
            Go Back
          </a>
        </form>
      </Fragment>
    );
  }
}

export default connect(mapAlertToProps, { addEducation, setAlert, removeAlert })(
  AddEducation
);
