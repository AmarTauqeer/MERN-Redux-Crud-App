import {
  FETCH_PRODUCT,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  GET_ERRORS,
} from "../types/types";

/* action creator fuctions for redux */

// fetch product
export const fetchProduct = (products) => {
  return {
    type: FETCH_PRODUCT,
    payload: products,
  };
};

export const fetchProductFailure = (error) => {
  return {
    type: GET_ERRORS,
    payload: error,
  };
};

// add product
export const addProduct = (products) => {
  return {
    type: CREATE_PRODUCT,
    payload: products,
  };
};

// delete product
export const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    payload: id,
  };
};

// update product
export const updateProduct = (id) => {
  return {
    type: UPDATE_PRODUCT,
    payload: id,
  };
};
