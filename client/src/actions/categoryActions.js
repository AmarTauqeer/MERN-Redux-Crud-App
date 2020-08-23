import axios from "axios";
import * as actionCreator from "./actionsCreators/category";

/* make changes to database mongodb */

// make axios request to get data from mongodb
export const fetchCategories = () => {
  return (dispatch) => {
    axios
      .get("/api/category")
      .then((response) => {
        const categories = response.data;
        dispatch(actionCreator.fetchCategory(categories));
      })
      .catch((error) => {
        dispatch(actionCreator.fetchCategoryFailure(error.message));
      });
  };
};

// fetch category by id
export const fetchCategoryById = (id) => {
  return (dispatch) => {
    axios.get(`/api/category/${id}`).then((response) => {
      const categories = response.data;
      //console.log(categories);
      dispatch(actionCreator.fetchCategoryById(categories));
    });
  };
};

// add
export const addCategories = (categories) => {
  return (dispatch) => {
    axios.post("/api/category", categories).then((response) => {
      const categories = response.data;
      dispatch(actionCreator.addCategory(categories));
    });
  };
};

// update
export const updateCategories = (id, categories) => {
  return (dispatch) => {
    axios.put(`/api/category/${id}`, categories).then((response) => {
      dispatch(actionCreator.updateCategory(id));
    });
  };
};

// delete
export const deleteCategories = (id) => {
  return (dispatch) => {
    axios.delete(`/api/category/${id}`).then((response) => {
      dispatch(actionCreator.deleteCategory(id));
    });
  };
};
