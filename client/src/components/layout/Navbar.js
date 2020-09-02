import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    //console.log(this.props.auth);
    return (
      <div className="container">
        <nav
          className="red"
          style={{
            padding: "0px 10px",
          }}
        >
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">
              Hitech
            </Link>
            <Link to="#" className="sidenav-trigger" data-target="mobile-nav">
              <i className="material-icons">menu</i>
            </Link>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/category">Category</Link>
              </li>
              <li>
                <Link to="/custom-form">Add Cat with Reusable Component</Link>
              </li>

              <li>
                <Link to="/product">Product</Link>
              </li>

              <li>
                <Link to="/register">Register</Link>
              </li>
              {this.props.auth.isAuthenticated ? (
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              ) : (
                ""
              )}
              {this.props.auth.isAuthenticated ? (
                <li>
                  <Link to="/changePassword">Change Password</Link>
                </li>
              ) : (
                ""
              )}

              {this.props.auth.isAuthenticated ? (
                <li>
                  <Link to="" onClick={this.onLogoutClick}>
                    Logout
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-nav">
          <li>
            <Link to="/category">Category</Link>
          </li>
          <li>
            <Link to="/custom-form">Add Cat with Reusable Component</Link>
          </li>

          <li>
            <Link to="/product">Product</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          {this.props.auth.isAuthenticated ? (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          ) : (
            ""
          )}
          {this.props.auth.isAuthenticated ? (
            <li>
              <Link to="/changePassword">Change Password</Link>
            </li>
          ) : (
            ""
          )}

          {this.props.auth.isAuthenticated ? (
            <li>
              <Link to="" onClick={this.onLogoutClick}>
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
