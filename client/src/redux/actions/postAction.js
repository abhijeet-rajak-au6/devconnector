import {
  GET_POST,
  POST_LOADER,
  SET_ALERT,
  UPDATE_LIKE,
  REMOVE_LIKE,
  DELETE_POST,
  ADD_POST,
  GET_SINGLE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../Action";
import { setToken } from "../../utils/setToken";
import { keys } from "../../config";
import axios from "axios";

//@ get all post
export const getPosts = () => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    dispatch({
      type: POST_LOADER,
    });
    try {
      if (JSON.parse(localStorage.getItem("user")).token) {
        setToken(JSON.parse(localStorage.getItem("user")).token);
      }
      const { data } = await axios.get(`${keys.BASE_URL}/allPost`);

      // console.log(data);
      dispatch({
        type: GET_POST,
        payload: data.posts,
      });
      resolve("success");
    } catch (err) {
      console.log(err);
      reject(err.response.data.errors.msg);
    } finally {
      dispatch({
        type: POST_LOADER,
      });
    }
  });
};

export const addLike = (postId) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    // dispatch({
    //   type: POST_LOADER,
    // });
    try {
      if (JSON.parse(localStorage.getItem("user")).token) {
        setToken(JSON.parse(localStorage.getItem("user")).token);
      }
      const { data } = await axios.patch(
        `${keys.BASE_URL}/post/like/${postId}`,
        {}
      );

      console.log(data.posts);
      dispatch({
        type: UPDATE_LIKE,
        payload: { id: postId, post: data.posts },
      });
      resolve(data.status);
    } catch (err) {
      console.log(err);
      reject(err.response.data.errors.msg);
    } finally {
      //   dispatch({
      //     type: POST_LOADER,
      //   });
    }
  });
};

export const removeDislike = (postId) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    // dispatch({
    //   type: POST_LOADER,
    // });
    try {
      if (JSON.parse(localStorage.getItem("user")).token) {
        setToken(JSON.parse(localStorage.getItem("user")).token);
      }
      const { data } = await axios.patch(
        `${keys.BASE_URL}/post/dislike/${postId}`
      );

      console.log(data.posts);
      dispatch({
        type: REMOVE_LIKE,
        payload: { id: postId, post: data.posts },
      });
      resolve(data.status);
    } catch (err) {
      console.log(err);
      reject(err.response.data.errors.msg);
    } finally {
      //   dispatch({
      //     type: POST_LOADER,
      //   });
    }
  });
};

export const deletePost = (postId) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (JSON.parse(localStorage.getItem("user")).token) {
        setToken(JSON.parse(localStorage.getItem("user")).token);
      }
      const { data } = await axios.delete(
        `${keys.BASE_URL}/removePost/${postId}`
      );

      dispatch({
        type: DELETE_POST,
        payload: { postId },
      });
      resolve(data.msg);
    } catch (err) {
      reject(err.response.data.errors.msg);
    }
  });
};

export const addPost = (post) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (JSON.parse(localStorage.getItem("user")).token) {
        setToken(JSON.parse(localStorage.getItem("user")).token);
      }
      const { data } = await axios.post(
        `${keys.BASE_URL}/addPost`,
        post,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("data", data);
      dispatch({
        type: ADD_POST,
        payload: data.post,
      });
      resolve(data.msg);
    } catch (err) {
      console.log(err.response);
      if (err.response.data.errors.length > 0) {
        reject(err.response.data.errors[0].msg);
      }
    }
  });
};

// @ get post

export const getPost = (id) => async (dispatch) => {
  console.log(id);
  return new Promise(async (resolve, reject) => {
    dispatch({
      type: POST_LOADER,
    });
    try {
      if (JSON.parse(localStorage.getItem("user")).token) {
        setToken(JSON.parse(localStorage.getItem("user")).token);
      }
      const { data } = await axios.get(
        `${keys.BASE_URL}/getPostById/${id}`
      );

      console.log(data);
      dispatch({
        type: GET_SINGLE_POST,
        payload: data.post,
      });
      resolve("success");
    } catch (err) {
      console.log(err);
      reject(err.response.data.errors.msg);
    } finally {
      dispatch({
        type: POST_LOADER,
      });
    }
  });
};

export const addComment = (postId, comment) => async (dispatch) => {
  console.log(postId, comment);
  return new Promise(async (resolve, reject) => {
    // dispatch({
    //   type: POST_LOADER,
    // });
    try {
      if (JSON.parse(localStorage.getItem("user")).token) {
        setToken(JSON.parse(localStorage.getItem("user")).token);
      }
      const { data } = await axios.patch(
        `${keys.BASE_URL}/post/addComment/${postId}`,
        comment,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("data", data.post);
      dispatch({
        type: ADD_COMMENT,
        payload: { id: postId, post: data.post },
      });
      // dispatch({
      //   type: POST_LOADER,
      // });
      resolve(data.msg);
    } catch (err) {
      console.log(err.response);
      if (err.response.data.errors.length > 0) {
        reject(err.response.data.errors[0].msg);
      }
    }
  });
};

export const deleteComment=(postId,commentId)=>async(dispatch)=>{
  console.log(commentId,postId);
  return new Promise(async(resolve,reject)=>{

    try{
      if (JSON.parse(localStorage.getItem("user")).token) {
        setToken(JSON.parse(localStorage.getItem("user")).token);
      }
      const { data } = await axios.delete(
        `${keys.BASE_URL}/post/removeComment/${postId}/${commentId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("data", data.post);
      dispatch({
        type: REMOVE_COMMENT,
        payload: { id: postId, post: data.post },
      });
      // dispatch({
      //   type: POST_LOADER,
      // });
      resolve(data.msg);
    } catch (err) {
      console.log(err.response);
      if (err.response.data.errors.length > 0) {
        reject(err.response.data.errors[0].msg);
      }
    }
  })
} 
