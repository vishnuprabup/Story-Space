import { createSlice } from "@reduxjs/toolkit";
import {
  loginHandler,
  logoutHandler,
  profileHandler,
  signupHandler,
} from "../../../api/authApi";

const initialState = {
  loading: false,
  user: null,
  error: {
    state: false,
    message: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authLoad: (state) => {
      state.loading = true;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    authError: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    authLogout: (state) => {
      state.loading = false;
      state.user = null;
      state.error = {
        state: false,
        message: "",
      };
    },
  },
});

export const loginAction = (authData) => async (dispatch) => {
  dispatch(authLoad());
  try {
    const response = await loginHandler(authData);
    if (response.data.message === "Logged-in") {
      const data = await profileHandler();
      dispatch(authSuccess(data.data));
    } else {
      dispatch(
        authError({
          state: true,
          message: "Sign In failed",
        })
      );
    }
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      dispatch(
        authError({
          state: true,
          message: error.message,
        })
      );
    }
    dispatch(
      authError({
        state: true,
        message: error.response.data.message,
      })
    );
    console.log(error);
  }
};

export const signupAction = (authData) => async (dispatch) => {
  dispatch(authLoad());
  try {
    const response = await signupHandler(authData);
    if (response.data.message === "Signed-up") {
      const data = await profileHandler();
      dispatch(authSuccess(data.data));
    } else {
      dispatch(
        authError({
          state: true,
          message: "Sign In failed",
        })
      );
    }
  } catch (error) {
    if (error.code === "ERR_NETOWORK") {
      dispatch(
        authError({
          state: true,
          message: error.message,
        })
      );
    }
    dispatch(
      authError({
        state: true,
        message: error.response.data.message,
      })
    );
  }
};

export const logoutAction = () => async (dispatch) => {
  dispatch(authLoad());
  try {
    await logoutHandler();
    dispatch(authLogout());
  } catch (error) {
    authError({
      state: true,
      message: error.response.data.message,
    });
  }
};

export const { authError, authLoad, authSuccess, authLogout } =
  userSlice.actions;
export default userSlice.reducer;
