import { REGISTER, LOGIN, LOGOUT, GET_CURRENT_PROFILE , CLEAR_PROFILE,FETCHING_EXPERIENCE} from "../Action";
import { keys } from "../../config";
import { setToken } from "../../utils/setToken";
import axios from "axios";
export const register = (userCredentials) => async (dispatch) => {
  console.log(userCredentials);
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(`${keys.BASE_URL}/register`, {
        ...userCredentials,
      });
      console.log(data);
      resolve(data.status);
    } catch (err) {
      console.log(err.response.data);
      console.log(err.response.data.errors.msg);
      if (err.response.data.errors.length) {
        reject(err.response.data.errors[0].msg);
      } else {
        reject(err.response.data.errors.msg);
      }
    }
  });
};

export const login = (userCredentials) => async (dispatch) => {
  console.log(userCredentials);
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(`${keys.BASE_URL}/login`, {
        ...userCredentials,
      });
      console.log(data);
      dispatch({
        type: LOGIN,
        payload: data,
      });
      resolve(data.success);
    } catch (err) {
      console.log(err.response.data);
      console.log(err.response.data.errors.msg);
      if (err.response.data.errors.length) {
        reject(err.response.data.errors[0].msg);
      } else {
        reject(err.response.data.errors.msg);
      }
    }
  });
};

export const logout = () => async (dispatch) => {
  return new Promise(async(resolve, reject) => {
    if (JSON.parse(localStorage.getItem("user")).token) {
      setToken(JSON.parse(localStorage.getItem("user")).token);
    }
    try {
      const { data } = await axios.delete(`${keys.BASE_URL}/logout`);
      console.log(data);
      dispatch({
        type:CLEAR_PROFILE
      })
      dispatch({
        type: LOGOUT,
      });
      resolve(data.status);
    } catch (err) {
      console.log(err.response.data);
      if(err.response.data.msg){
        reject(err.response.data.msg);
      }
      else if(err.response.data.errors.msg==="Authentication failed"){
        dispatch({
          type:LOGOUT,
        })
        reject(err.response.data.errors.msg)
      }
    }
  });
};

export const getCurrentUser=()=> async (dispatch)=>{
 
  return new Promise (async(resolve,reject)=>{
    dispatch({
      type:FETCHING_EXPERIENCE
    });
    try {
      if(localStorage.getItem("user")){
        setToken(JSON.parse(localStorage.getItem("user")).token);
      }
      const {data } = await axios.get(`${keys.BASE_URL}/me`);
      console.log(data);
      dispatch({
        type:GET_CURRENT_PROFILE,
        payload:data.userProfile
      });
      resolve(data.userProfile);

    } catch (err) {
      console.log(err.response.data.errors.msg);
      if(err.response.data.errors.msg==="Authentication failed"){
        dispatch({
          type:LOGOUT,
        })
        reject(err.response.data.errors.msg)
      }
      reject(err.response.data.errors.msg);
    }finally{
      dispatch({
        type:FETCHING_EXPERIENCE
      })
    }
  })
} 
