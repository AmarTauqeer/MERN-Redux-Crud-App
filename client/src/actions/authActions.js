import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
} from "./types/types";
// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login")) // re-direct to login on successful register
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// update profile
// update
export const updateProfiles = (id, user) => {
  return (dispatch) => {
    axios.put(`/api/users/editProfile/${id}`, user).then((response) => {
      dispatch(updateProfile(response.data));
    });
  };
};
// update profile
export const updateProfile = (data) => {
  return {
    type: UPDATE_PROFILE,
    payload: data,
  };
};
// change password api call
export const changePasswords = (id, user) => {
  return (dispatch) => {
    axios
      .put(`/api/users/changePassword/${id}`, user)
      .then((response) => {
        dispatch(changePassword(response.data));
        // clear the errors
        dispatch({
          type: GET_ERRORS,
          payload: {},
        });
      })
      .catch((err) => {
        //catch error
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  };
};
// change password
export const changePassword = (data) => {
  return {
    type: CHANGE_PASSWORD,
    payload: data,
  };
};
