import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/dashboard";

import CustomForm from "./components/CustomForm/index";

import Category from "./components/category/category";
import CreateCategory from "./components/category/createCategory";
import UpdateCategory from "./components/category/updateCategory";

import Product from "./components/product/product";
import CreateProduct from "./components/product/createProduct";
import updateProduct from "./components/product/updateProduct";

import Profile from "./components/auth/Profile";
import EditProfile from "./components/auth/editProfile";
import ChangePassword from "./components/auth/ChangePassword";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/editProfile" component={EditProfile} />
              <PrivateRoute
                exact
                path="/changePassword"
                component={ChangePassword}
              />
              <PrivateRoute exact path="/custom-form" component={CustomForm} />
              <PrivateRoute exact path="/category" component={Category} />
              <PrivateRoute
                exact
                path="/category/create"
                component={CreateCategory}
              />
              <PrivateRoute
                exact
                path="/category/updateCategory/:id"
                component={UpdateCategory}
              />
              <PrivateRoute exact path="/product" component={Product} />
              <PrivateRoute
                exact
                path="/product/create"
                component={CreateProduct}
              />
              <PrivateRoute
                exact
                path="/product/updateProduct/:id"
                component={updateProduct}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
