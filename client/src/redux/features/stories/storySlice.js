import { createSlice, getDefaultMiddleware } from "@reduxjs/toolkit";
import { getBlog, getMyStories, getStories } from "../../../api/storyApi";

const initialState = {
  loading: false,
  data: [],
  error: {
    state: false,
    message: "",
  },
};

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    storyLoad: (state) => {
      state.loading = true;
    },
    storySuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = {
        state: false,
        message: "",
      };
    },
    storyError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    },
  },
  middleware: () =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const getStoriesAction = () => async (dispatch) => {
  dispatch(storyLoad());
  try {
    const { data } = await getStories();
    dispatch(storySuccess(data));
  } catch (error) {
    dispatch(
      storyError({
        state: true,
        message: error,
      })
    );
  }
};

export const getMyStoriesAction = (email) => async (dispatch) => {
  dispatch(storyLoad());
  try {
    const { data } = await getMyStories(email);
    dispatch(storySuccess(data));
  } catch (error) {
    dispatch(
      storyError({
        state: true,
        message: error,
      })
    );
  }
};

export const getBlogAction = (blogId) => async (dispatch) => {
  try {
    const { data } = await getBlog(blogId);
    dispatch(storySuccess(data));
  } catch (error) {
    dispatch(
      storyError({
        state: true,
        message: error,
      })
    );
  }
};

export const { storyLoad, storySuccess, storyError } = storySlice.actions;
export default storySlice.reducer;
