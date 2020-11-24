import {
  GET_CURRENT_PROFILE,
  CLEAR_PROFILE,
  ADD_EXPERIENCE,
  FETCHING_EXPERIENCE,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  GET_ALL_PROFILES,
  GET_REPOS,
  LOADER,
  GIT_HUB_LOADER,
} from "../Action";

const initialState = {
  userProfile: null,
  profiles: [],
  repos: [],
  fetchProfile: false,
  loading: false,
  repoLoading: false,
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CURRENT_PROFILE:
    case ADD_EXPERIENCE:
    case DELETE_EXPERIENCE:
    case DELETE_EDUCATION:
      return {
        ...state,
        userProfile: payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        userProfile: null,
        profiles: [],
      };
    case FETCHING_EXPERIENCE:
      return {
        ...state,
        fetchProfile: !state.fetchProfile,
      };
    case GET_ALL_PROFILES:
      return {
        ...state,
        profiles: payload,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
      };
    case LOADER:
      return {
        ...state,
        loading: !state.loading,
      };
    case GIT_HUB_LOADER:
      return {
        ...state,
        repoLoading: !state.repoLoading,
      };
    default:
      return state;
  }
};

export default profileReducer;
