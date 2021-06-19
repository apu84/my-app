import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const newPost = createAsyncThunk('post/newPost', async (post) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return response.json();
});

export const editPost = createAsyncThunk('post/editPost', async (post) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return response.json();
});

const initialState = {
  posts: [],
  status: 'idle'
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    save: (state, action) => {
      console.log(state, action);
    }
  },
  extraReducers: {
    [newPost.pending]: (state, action) => {
      state.status = 'pending';
    },
    [newPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload);
      state.status = 'fulfilled';
    },
    [editPost.pending]: (state, action) => {
      state.status = 'pending';
    },
    [editPost.fulfilled]: (state, action) => {
      state.posts = state.posts.map(post => post.id === action.id ? action.payload: post);
      state.status = 'fulfilled';
    }
  }
});

//reducer
export default postSlice.reducer;

//actions
export const { save } = postSlice.actions;

export const selectPosts = state => state.post.posts;
export const selectStatus = state => state.post.status;

