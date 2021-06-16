import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const newPost = createAsyncThunk('createPost/newPost', async (post) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return response.json();
})

const initialState = {
  posts: [],
  status: 'idle'
};

const createPostSlice = createSlice({
  name: 'createPost',
  initialState,
  reducers: {
    save: (state, action) => {
      console.log(state, action);
    }
  },
  extraReducers: {
    [newPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload);
    }
  }
});

//reducer
export default createPostSlice.reducer;

//actions
export const { save } = createPostSlice.actions;

export const selectCreatePost = state => state.createPost.posts;
