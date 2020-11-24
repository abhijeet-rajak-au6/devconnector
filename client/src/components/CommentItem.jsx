import React, { Component, Fragment } from 'react';
import Moment from 'react-moment';
import { Link,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../redux/actions/postAction';
import { mapStateToPropsPost } from '../redux/mapStateToProps';

class CommentItem extends Component {

    handleDeleteComment=async()=>{
      const { deleteComment, match,commentId } = this.props;
      console.log(this.props);
      console.log(match);
      try{
        const message = await deleteComment(match.params.id,commentId);
        console.log(message);
      }
      catch(err){
        console.log(err);
      }
    }
    render() {
        const { date, text, user:{_id,name,avatar}, postId, authUser,commentId } = this.props;
        console.log("id",this.props.user);
        console.log("auth", authUser.id);
        return (
            <div class="post bg-white p-1 my-1">
          <div>
            <Link to="/">
              <img
                class="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {text}
            </p>
             <p class="post-date">
                <Moment format="YYYY/DD/MM">{ date }</Moment>
            </p>
            {authUser.id === _id && (
              <button
                onClick={this.handleDeleteComment}
                type="button"
                class="btn btn-danger"
              >
                <i class="fas fa-times"></i>
              </button>
            )}
          </div>
        </div>
        )
    }
}
export default connect(mapStateToPropsPost,{ deleteComment })(withRouter(CommentItem));
