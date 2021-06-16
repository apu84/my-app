import {combineReducers, configureStore} from "@reduxjs/toolkit";
import postReducer from './pages/post-slice'

export default configureStore({
  reducer: combineReducers({
    post: postReducer
  })
})