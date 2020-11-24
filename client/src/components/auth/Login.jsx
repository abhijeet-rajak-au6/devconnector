import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../redux/actions/userAction";
import { setAlert, removeAlert } from '../../redux/actions/alertAction';
import { mapAlertToProps } from '../../redux/mapStateToProps';
import Alert from "../error/Alert";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  componentDidMount(){
    document.querySelector('.container').style.display="block";

  }
  handleSubmit = async (event) => {
    const { history, login,setAlert,removeAlert} = this.props;
    const { email,password } = this.state;
    event.preventDefault();
    try {
      const message = await login({
        email,
        password
      });
      console.log("history push");
      history.push("/dashboard");
    } catch (err) {
      setAlert(err,"error");
      setTimeout(()=>{
        removeAlert();
      },3000); 
      
    }
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    const { email, password } = this.state;
    const {alert} = this.props;
    return (
      <section className="container">
        {alert.message ? <Alert {...alert} /> : null}
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>
        <form
          onSubmit={this.handleSubmit}
          className="form"
          action="dashboard.html"
        >
          <div className="form-group">
            <input
              onChange={this.handleChange}
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              required
            />
          </div>
          <div className="form-group">
            <input
              onChange={this.handleChange}
              type="password"
              placeholder="Password"
              name="password"
              value={password}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    );
  }
}
export default connect(mapAlertToProps, { login,setAlert,removeAlert })(Login);
