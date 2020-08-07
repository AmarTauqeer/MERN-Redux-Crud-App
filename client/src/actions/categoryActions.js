import axios from "axios";
import {
  FETCH_CATEGORY,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  GET_ERRORS,
} from "./types";

/* make changes to database mongodb */

// make axios request to get data from mongodb
export const fetchCategories = () => {
  return (dispatch) => {
    axios
      .get("/api/category")
      .then((response) => {
        // response.data is the users
        const categories = response.data;
        //console.log(categories);
        dispatch(fetchCategory(categories));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(fetchCategoryFailure(error.message));
      });
  };
};

// add data to database
export const addCategories = (categories) => {
  return (dispatch) => {
    axios.post("/api/category", categories).then((response) => {
      const categories = response.data;
      dispatch(addCategory(categories));
    });
  };
};

// update data to database
export const updateCategories = (id, categories) => {
  return (dispatch) => {
    axios.put(`/api/category/${id}`, categories).then((response) => {
      dispatch(updateCategory(id));
    });
  };
};

// delete data from database
export const deleteCategories = (id) => {
  return (dispatch) => {
    axios.delete(`/api/category/${id}`).then((response) => {
      dispatch(deleteCategory(id));
    });
  };
};

/* action creator fuctions for redux */

// fetch category
export const fetchCategory = (categories) => {
  return {
    type: FETCH_CATEGORY,
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
