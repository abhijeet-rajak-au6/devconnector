import {
  ADD_EXPERIENCE,
  SET_ALERT,
  REMOVE_ALERT,
  ADD_EDUCATION,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  CLEAR_PROFILE,
  LOGOUT,
  GET_ALL_PROFILES,
  GET_REPOS,
  LOADER, GET_CURRENT_PROFILE,
  GIT_HUB_LOADER,
  
} from "../Action";

import axios from "axios";
import { setToken } from "../../utils/setToken";
import { keys } from "../../config";
export const createProfile = (createProfileData, edit) => async (dispatch) => {
  // console.log(createProfile);
  console.log(createProfileData);
  return new Promise(async (resolve, reject) => {
    try {
      if (JSON.parse(localStorage.getItem("user")).token) {
        setToken(JSON.parse(localStorage.getItem("user")).token);
      }

      const { data } = await axios.post(
        `${keys.BASE_URL}/addProfile`,
        createProfileData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      dispatch({
        type: SET_ALERT,
        payload: {
          message: data.msg,
          messageType: "success",
        },
      });

      setTimeout(() => {
        dispatch({
          type: REMOVE_ALERT,
        });
      }, 3000);

      resolve(data.msg);
    } catch (err) {
      console.log(err.response.data.errors);
      if (err.response.data.errors.msg.includes("Authentication failed")) {
        dispatch({
          type: LOGOUT,
        });
        reject(err.response.data.errors.msg);
      }
    }
  });
};

// get all profiles

export const getProfiles = () => async (dispatch) => {
  // console.log(createProfile);
  
  return new Promise(async (resolve, reject) => {
    dispatch({
      type:LOADER
    });
    dispatch({
      type:CLEAR_PROFILE
    })
    try {
      const { data } = await axios.get(
        `${keys.BASE_URL}/getAllProfiles`);
      console.log(data);
      dispatch({
        type:GET_ALL_PROFILES,
        payload:data.profiles
      })
      resolve(data.msg);
    } catch (err) {
      console.log(err);
      console.log(err.response.data.errors);
      if (err.response.data.errors.msg.includes("Authentication failed")) {
        dispatch({
          type: LOGOUT,
        });
        reject(err.response.data.errors.msg);
      }
    }
    finally{
      dispatch({
        type:LOADER
      })
    }
  });
};

// get profile By Id

export const getProfilesById = (id) => async (dispatch) => {
  // console.log(createProfile);
  
  return new Promise(async (resolve, reject) => {
    dispatch({
      type:LOADER
    })
    try {
      const { data } = await axios.get(
        `${keys.BASE_URL}/getProfileById/${id}`);
      console.log(data);
      dispatch({
        type:GET_CURRENT_PROFILE,
        payload:data.profile
      })
      resolve(data.msg);
    } catch (err) {
      console.log(err);
      console.log(err.response.data.errors);
      if (err.response.data.errors.msg.includes("Authentication failed")) {
        dispatch({
          type: LOGOUT,
        });
        reject(err.response.data.errors.msg);
      }
    }
    finally{
      dispatch({
        type:LOADER
      })
    }
  });
};

export const getGitHubRepos = (username) => async (dispatch) => {
  // console.log(createProfile);
  
  return new Promise(async (resolve, reject) => {
    dispatch({
      type:GIT_HUB_LOADER
    })
    try {
      // if (JSON.parse(localStorage.getItem("user")).token) {
      //   setToken(JSON.parse(localStorage.getItem("user")).token);
      // }

      const { data } = await axios.get(
        `${keys.BASE_URL}/getUserRepos/${username}`);
      console.log(data);
      dispatch({
        type:GET_REPOS,
        payload:data.repos
      })
      resolve(data.msg);
    } catch (err) {
      console.log(err);
      if (err.response.data.errors.msg.includes("Authentication failed")) {
        dispatch({
          type: LOGOUT,
        });
        reject(err.response.data.errors.msg);
      }
    }
    finally{
      dispatch({
        type:GIT_HUB_LOADER
      })
    }
  });
};

export const addExperience = (experience) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (JSON.parse(localStorage.getItem("user")).token) {
        setToken(JSON.parse(localStorage.getItem("user")).token);
      }
      const { data } = await axios.patch(
        `${keys.BASE_URL}/updateExperience`,
        experience,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data.updatedProfile);
      dispatch({
        type: ADD_EXPERIENCE,
        payload: data.updatedProfile,
      });
      dispatch({
        type: SET_ALERT,
        payload: {
          message: "experience is added sucessfully",
          messageType: "success",
        },
      });
      setTimeout(() => {
        dispatch({
          type: REMOVE_ALERT,
        });
      }, 3000);
      resolve(data.status);
    } catch (err) {
      if (err.response.data.errors.length) {
        reject(err.response.data.errors[0].msg);
      } else {
        if (err.response.data.errors.msg.includes("Authentication failed")) {
          dispatch({
            type: LOGOUT,
          });
          reject(err.response.data.errors.msg);
        }
      }
    }
  });
};

export const addEducation = (education) => async (dispatch) => {
  console.log(education);
  return new Promise(async (resolve, reject) => {
    try {
      if (JSON.parse(localStorage.getItem("user")).token) {
        setToken(JSON.parse(localStorage.getItem("user")).token);
      }
      const { data } = await axios.patch(
        `${keys.BASE_URL}/addEducation`,
        education,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data.updatedProfile);
      dispatch({
        type: ADD_EDUCATION,
        payload: data.updatedProfile,
      });
      dispatch({
        type: SET_ALERT,
        payload: {
          message: "experience is added sucessfully",
          messageType: "success",
        },
      });
      setTimeout(() => {
        dispatch({
          type: REMOVE_ALERT,
        });
      }, 3000);
      resolve(data.status);
    } catch (err) {
      console.log(err.response.data.errors.length);
      if (err.response.data.errors.length) {
        console.log("hello");
        reject(err.response.data.errors[0].msg);
      } else {
        if (err.response.data.errors.msg.includes("Authentication failed")) {
          dispatch({
            type: LOGOUT,
          });
          reject(err.response.data.errors.msg);
        }
      }
    }
  });
};

export const deleteExperiencne = (id) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (JSON.parse(localStorage.getItem("user")).token) {
        setToken(JSON.parse(localStorage.getItem("user")).token);
      }
      const { data } = await axios.delete(
        `${keys.BASE_URL}/deleteExperiencne/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      dispatch({
        type: DELETE_EXPERIENCE,
        payload: data.updatedProfile,
      });
      dispatch({
        type: SET_ALERT,
        payload: {
          message: data.msg,
          messageType: "success",
        },
      });
      setTimeout(() => {
        dispatch({
          type: REMOVE_ALERT,
        });
      }, 3000);
      resolve(data.msg);
    } catch (err) {
      if (err.response.data.errors.msg.includes("Authentication failed")) {
        dispatch({
          type: LOGOUT,
        });
        reject(err.response.data.errors.msg);
      }
    }
  });
};

export const deleteEducation = (id) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (JSON.parse(localStorage.getItem("user")).token) {
        setToken(JSON.parse(localStorage.getItem("user")).token);
      }
      const { data } = await axios.delete(
        `${keys.BASE_URL}/deleteEducation/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      dispatch({
        type: DELETE_EDUCATION,
        payload: data.updatedProfile,
      });
      dispatch({
        type: SET_ALERT,
        payload: {
          message: data.msg,
          messageType: "success",
        },
      });
      setTimeout(() => {
        dispatch({
          type: REMOVE_ALERT,
        });
      }, 3000);
      resolve(data.msg);
    } catch (err) {
      if (err.response.data.errors.msg.includes("Authentication failed")) {
        dispatch({
          type: LOGOUT,
        });
        reject(err.response.data.errors.msg);
      }
    }
  });
};

export const deleteUser = (id) => async (dispatch) => {
  if (window.confirm("Are you sure u wanted to delete the account")) {
    return new Promise(async (resolve, reject) => {
      try {
        if (JSON.parse(localStorage.getItem("user")).token) {
          setToken(JSON.parse(localStorage.getItem("user")).token);
        }
        const { data } = await axios.delete(
          `${keys.BASE_URL}/removeUser`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // localStorage.removeItem("user");
        dispatch({
          type: CLEAR_PROFILE,
        });
        dispatch({
          type:LOGOUT
        })
        console.log(data);
        resolve(data.msg);
      } catch (err) {
        if (err.response.data.errors.msg.includes("Authentication failed")) {
          dispatch({
            type: LOGOUT,
          });
          reject(err.response.data.errors.msg);
        }
      }
    });
  }
};
