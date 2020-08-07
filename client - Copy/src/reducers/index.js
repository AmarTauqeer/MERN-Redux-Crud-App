import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import authReducer from "./authReducer";

import errorReducer from "./errorReducer";
export default combineReducers({
  cat: categoryReducer,
  auth: authReducer,
  errors: errorReducer,
});
