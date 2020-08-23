import {
  FETCH_CATEGORY,
  FETCH_CATEGORY_BY_ID,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  GET_ERRORS,
} from "../types/types";

/* action creator fuctions for redux */

// fetch category
export const fetchCategory = (categories) => {
  return {
    type: FETCH_CATEGORY,
    payload: categories,
  };
};

// fetch category by id
export const fetchCategoryById = (categories) => {
  return {
    type: FETCH_CATEGORY_BY_ID,
    payload: categories,
  };
};

export const fetchCategoryFailure = (error) => {
  return {
    type: GET_ERRORS,
    payload: error,
  };
};

// add category
export const addCategory = (categories) => {
  return {
    type: CREATE_CATEGORY,
    payload: categories,
  };
};

// delete category
export const deleteCategory = (id) => {
  return {
    type: DELETE_CATEGORY,
    payload: id,
  };
};

// update category
export const updateCategory = (id) => {
  return {
    type: UPDATE_CATEGORY,
    payload: id,
  };
};
