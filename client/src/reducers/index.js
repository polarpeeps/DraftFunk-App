import { combineReducers } from "redux";
// import todosReducer from './todo'
import authReducer from './auth'
const rootReducer = combineReducers({
    
    auth:authReducer,
})
export default rootReducer;