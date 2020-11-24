import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getPosts } from "../redux/actions/postAction";
import { mapStateToPropsPost } from "../redux/mapStateToProps";
import Spinner from "../components/common/Spinner";
import PostItem from "../components/PostItem";
import { setAlert, removeAlert } from "../redux/actions/alertAction";
import Alert from './error/Alert';
import  PostForm from '../components/PostForm';

class Posts extends Component {
  async componentDidMount() {
    const { getPosts } = this.props;
    try {
      const message = await getPosts();
      console.log(message);
    } catch (err) {
      console.log(err);
      setAlert(err, "error");
      setTimeout(() => {
        removeAlert();
      }, 3000);
    }
  }

  render() {
    const { postLoading, posts, alert } = this.props;
    return posts.length && !postLoading ? (
      <Fragment>
        { alert.message ? <Alert {...alert} />:null }
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
          <i className="fas fa-user"></i>
          Welcome to the community
        </p>
        <PostForm/>
        <div className="posts">
          {posts.map(({ _id, ...others }) => (
            <PostItem key={_id} {...others} postId={_id} />
          ))}
        </div>
      </Fragment>
    ) : (
      <Spinner />
    );
  }
}

export default connect(mapStateToPropsPost, { getPosts })(Posts);
