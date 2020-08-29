import {
  SET_CURRENT_USER,
  USER_LOADING,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
} from "../actions/types/types";
const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: action.payload,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
