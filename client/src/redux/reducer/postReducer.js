import { GET_POST, POST_LOADER, UPDATE_LIKE, REMOVE_LIKE, DELETE_POST,ADD_POST, GET_SINGLE_POST, ADD_COMMENT, REMOVE_COMMENT } from "../Action";

const initialState = {
  post:null,
  posts: [],
  loading: false,
};

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REMOVE_COMMENT:
      return {
        ...state,post:payload.post
      }
    case ADD_COMMENT:
      console.log(payload.post);
      return{

       ...state,post:payload.post
      }
    
    case ADD_POST:
      return {
        ...state,posts:[...state.posts,payload]
      }
    case GET_SINGLE_POST:
      return{
        ...state,post:payload
      }
    case DELETE_POST:
     
      return {
        ...state,
        posts:state.posts.filter((post)=> post._id!==payload.postId? post: null)
      }
    case UPDATE_LIKE:
      // console.log(payload.post.likes);
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === payload.id) {
            console.log("hi");
            return {...post,likes:payload.post.likes}
          }
          return post;
        }),
      };
    case REMOVE_LIKE:
      // console.log(payload.post.likes);
      return {
        ...state,
        posts:state.posts.map(post=> post._id===payload.id ? {...post,likes:payload.post.likes}: post )
      }
    case GET_POST:
      return {
        ...state,
        posts: payload,
      };
    case POST_LOADER: {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    default: {
      return state;
    }
  }
};

export default postReducer;
