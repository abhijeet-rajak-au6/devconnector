import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addComment } from '../redux/actions/postAction';

class CommentForm extends Component {
  state = {
    text: "",
  };

  handleSubmit = async(e)=>{
      e.preventDefault();
      const { addComment,postId } = this.props;
    try{
      console.log("add comment");
       const message =  await addComment(postId,this.state);
       console.log(message);
       this.setState({
         text:""
       })
    }catch(err){
        console.log(err);
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div class="post-form">
        <div class="bg-primary p">
          <h3>leave Comment</h3>
        </div>
        <form onSubmit={this.handleSubmit} class="form my-1">
          <textarea
            onChange={this.handleChange}
            name="text"
            cols="30"
            rows="5"
            placeholder="Leave a comment"
            required
            name="text"
            value={this.state.text}
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    );
  }
}

export default connect(null, { addComment })(CommentForm);
