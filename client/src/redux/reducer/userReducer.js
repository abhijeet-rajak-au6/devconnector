import { LOGIN, LOGOUT, CLEAR_PROFILE } from "../Action";

const initialState = {
  user: JSON.parse(localStorage.getItem("user") || null),
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        user: payload,
      };
    // case CLEAR_PROFILE:
    //   return {

    //   }
    case LOGOUT:
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
      };
   
    default:
      return state;
  }
};
export default userReducer;
