import { combineReducers } from 'redux';
import userReducer from '../redux/reducer/userReducer';
import alertReducer from '../redux/reducer/alertreducer';
import profileReducer from '../redux/reducer/profileReducer';
import postReducer from '../redux/reducer/postReducer';
const rootReducer = combineReducers({
    userState:userReducer,
    alertState:alertReducer,
    profileState:profileReducer,
    postState:postReducer,
});

export default rootReducer;