import {combineReducers, configureStore} from "@reduxjs/toolkit";
import createPostReducer from './pages/new-post-slice'

export default configureStore({
  reducer: combineReducers({
    createPost: createPostReducer
  })
})