import React, { Component,Fragment } from "react";
import { connect } from "react-redux";
import { getPost } from "../redux/actions/postAction";
import PostItem from "./PostItem";
import Spinner from "../components/common/Spinner";
import { Link } from 'react-router-dom';
import { mapStateToPropsPost } from "../redux/mapStateToProps";
import CommentForm from '../components/CommentForm';
import CommentItem from '../components/CommentItem';

class Post extends Component {
  async componentDidMount() {
    const { getPost, match } = this.props;
    try {
      const message = await getPost(match.params.id);
      console.log(message);
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { post, postLoading,match, posts } = this.props;
    if( post && !postLoading){

      console.log(post);
      console.log(posts);
    }
    return post && !postLoading ? (
        <Fragment>
            <Link to="/posts" className="btn">
                Go back
            </Link>
            <PostItem {...post} showAction={false}/>
            <CommentForm postId={match.params.id}/>
            { post.comments.map(comment=> <CommentItem key={comment._id} {...comment} commentId={comment._id} />) }
        </Fragment>
    ) : (
      <Spinner />
    );
  }
}
export default connect(mapStateToPropsPost, { getPost })(Post);
