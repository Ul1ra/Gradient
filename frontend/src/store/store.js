import {applyMiddleware, createStore, combineReducers} from "redux"
import thunk from "redux-thunk"
import { currentPosts } from "./reducers/postreducer.js"
import { profilePageReducer } from "./reducers/profilePageReducer"
import { userReducer } from "./reducers/reducers.js"
import { findFriendsReducer } from "./reducers/findFriendsReducer.js"

//3. create and apply middleware (thunk)
const middlewares = applyMiddleware(thunk)

//4. exporting and creating store

const reducer = combineReducers({
    currentPosts,
    profilePageReducer,
    userReducer,
    findFriendsReducer
})

export const store = createStore(reducer,middlewares);
