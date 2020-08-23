// import types
import {
  FETCH_PRODUCT,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  GET_ERRORS,
} from "../actions/types/types";

// initial state
const initialState = {
  products: [],
  error: "",
};

// create reducer
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT:
      return {
        products: action.payload,
        error: "",
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        products: action.payload,
        error: "",
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.response.filter(
          (x) => x._id === action.payload
        ),
        error: "",
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.response.filter(
          (x) => x._id !== action.payload
        ),
      };

    case GET_ERRORS:
      return {
        products: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
