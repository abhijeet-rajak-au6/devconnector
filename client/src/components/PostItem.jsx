import React, { Fragment } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { mapStateToPropsPost } from "../redux/mapStateToProps";
import {
  addLike,
  removeDislike,
  deletePost,
} from "../redux/actions/postAction";
import { setAlert, removeAlert } from "../redux/actions/alertAction";

function PostItem({
  date,
  text,
  likes,
  comments,
  // user,
  user: { _id, name, avatar },
  authUser,
  postId,
  addLike,
  setAlert,
  removeAlert,
  removeDislike,
  deletePost,
  showAction = true,
}) {
  const handleDislike = async () => {
    try {
      const message = await removeDislike(postId);
      console.log(message);
    } catch (err) {
      console.log(err);
      setAlert(err, "error");
      setTimeout(() => {
        removeAlert();
      }, 3000);
    }
  };

  const handleAddLike = async () => {
    try {
      const message = await addLike(postId);
      console.log(message);
    } catch (err) {
      console.log(err);
      setAlert(err, "error");
      setTimeout(() => {
        removeAlert();
      }, 3000);
    }
  };

  const handleDeletePost = async () => {
    try {
      const message = await deletePost(postId);
      console.log(message);
      setAlert(message, "success");
      setTimeout(() => {
        removeAlert();
      }, 3000);
    } catch (err) {
      setAlert(err, "error");
      setTimeout(() => {
        removeAlert();
      }, 3000);
    }
  };
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img class="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p class="my-1">{text}</p>
        <p class="post-date">
          posted on {" "}
          <Moment format="YYYY/DD/MM">{date}</Moment>
        </p>
        {showAction && (
          <Fragment>
            <button onClick={handleAddLike} type="button" class="btn btn-light">
              <i class="fas fa-thumbs-up"></i>
              <span>{likes.length}</span>
            </button>
            <button onClick={handleDislike} type="button" class="btn btn-light">
              <i class="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${postId}`} class="btn btn-primary">
              Discussion <span class="comment-count">{comments.length}</span>
            </Link>
            {authUser.id === _id && (
              <button
                onClick={handleDeletePost}
                type="button"
                class="btn btn-danger"
              >
                <i class="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default connect(mapStateToPropsPost, {
  addLike,
  setAlert,
  removeAlert,
  removeDislike,
  deletePost,
})(PostItem);
