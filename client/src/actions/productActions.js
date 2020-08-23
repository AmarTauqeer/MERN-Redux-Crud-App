import axios from "axios";
import * as actionCreator from "./actionsCreators/product";

/* make changes to database mongodb */

// make axios request to get data from mongodb
export const fetchProducts = () => {
  return (dispatch) => {
    axios
      .get("/api/product")
      .then((response) => {
        const products = response.data;
        dispatch(actionCreator.fetchProduct(products));
      })
      .catch((error) => {
        dispatch(actionCreator.fetchProductFailure(error.message));
      });
  };
};

// add
export const addProducts = (products) => {
  return (dispatch) => {
    axios.post("/api/product", products).then((response) => {
      const products = response.data;
      dispatch(actionCreator.addProduct(products));
    });
  };
};

// update
export const updateProducts = (id, products) => {
  return (dispatch) => {
    axios.put(`/api/product/${id}`, products).then((response) => {
      dispatch(actionCreator.updateProduct(id));
    });
  };
};

// delete
export const deleteProducts = (id) => {
  return (dispatch) => {
    axios.delete(`/api/product/${id}`).then((response) => {
      dispatch(actionCreator.deleteProduct(id));
    });
  };
};
