import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">
              Hitech
            </Link>
            <Link to="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </Link>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/category">Category</Link>
              </li>

              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    );
  }
}
export default Navbar;
