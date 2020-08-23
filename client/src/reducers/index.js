import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import authReducer from "./authReducer";

import errorReducer from "./errorReducer";
export default combineReducers({
  cat: categoryReducer,
  prod: productReducer,
  auth: authReducer,
  errors: errorReducer,
});
