import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Alert from "../error/Alert";
import { register } from "../../redux/actions/userAction";
import { setAlert,removeAlert } from '../../redux/actions/alertAction';
import { mapAlertToProps } from '../../redux/mapStateToProps';
import { connect } from "react-redux";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password1: "",
    password2: "",
  };
  componentDidMount(){
    document.querySelector('.container').style.display="block";

  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password1, password2 } = event.target;
    const { register, history, setAlert, removeAlert } = this.props;
    this.setState({
      name: name.value,
      email: email.value,
      password1: password1.value,
      password2: password2.value,
    });
    if (password1.value !== password2.value) {
      setAlert("Password and Confirm password donot match","error");
      setTimeout(()=>{
        removeAlert();
      },3000)
      
      return;
    }

    try {
      const message = await register({
        name: name.value,
        email: email.value,
        password: password1.value,
      });
      this.setState({
        name: "",
        email: "",
        password1: "",
        password2: "",
      });
      history.push("/login");
    } catch (err) {
      console.log(err);
      setAlert(err,"error");
      setTimeout(()=>{
        removeAlert();
      },3000)
    }
  };
  render() {
    const { name, email, password1, password2 } = this.state;
    const { alert } = this.props;
    return (
      <Fragment>
        <section className="container">
          <h1 className="large text-primary">Sign Up</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Create Your Account
          </p>
          <form onSubmit={this.handleSubmit} className="form">
            {alert.message ? <Alert {...alert} /> : null}
            <div className="form-group">
              <input
                onChange={this.handleChange}
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                required
              />
            </div>
            <div className="form-group">
              <input
                onChange={this.handleChange}
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
              />
              <small className="form-text">
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email
              </small>
            </div>
            <div className="form-group">
              <input
                onChange={this.handleChange}
                type="password"
                placeholder="Password"
                name="password1"
                minLength="6"
                value={password1}
              />
            </div>
            <div className="form-group">
              <input
                onChange={this.handleChange}
                type="password"
                placeholder="Confirm Password"
                name="password2"
                minLength="6"
                value={password2}
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
          </form>
          <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </section>
      </Fragment>
    );
  }
}

export default connect(mapAlertToProps, { register, setAlert,removeAlert })(Register);
