// import types
import {
  FETCH_CATEGORY,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  GET_ERRORS,
} from "../actions/types/types";

// initial state
const initialState = {
  categories: [],
  error: "",
};

// create reducer
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY:
      return {
        categories: action.payload,
        error: "",
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: action.payload,
        error: "",
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.response.filter(
          (x) => x._id === action.payload
        ),
        error: "",
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.response.filter(
          (x) => x._id !== action.payload
        ),
      };

    case GET_ERRORS:
      return {
        categories: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
