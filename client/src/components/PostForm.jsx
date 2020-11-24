import React, { Component } from "react";
import { addPost } from "../redux/actions/postAction";
import { connect } from "react-redux";
import { setAlert, removeAlert } from "../redux/actions/alertAction";
class PostForm extends Component {
  state = {
    text: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = async (e) => {
    const { addPost, setAlert, removeAlert } = this.props;
    e.preventDefault();
    try {
      const message = await addPost(this.state);
      this.setState({
          text:""
      })
      setAlert(message, "success");
      setTimeout(() => {
        removeAlert();
      }, 3000);
    } catch (err) {
      console.log(err);
      setAlert(err, "error");
      setTimeout(() => {
        removeAlert();
      }, 3000);
    }
  };
  render() {
    return (
      <div class="post-form">
        <div class="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form onSubmit={this.handleSubmit} class="form my-1">
          <textarea
            onChange={this.handleChange}
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
            name="text"
            value={ this.state.text }
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    );
  }
}
export default connect(null, {addPost,setAlert, removeAlert})(PostForm);
