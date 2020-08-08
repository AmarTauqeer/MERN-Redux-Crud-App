import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 center-align">
            <p className="flow-text grey-text text-darken-1">
              Mern stack app with user authentication using redux via passport
              and JWTs
            </p>
            <br />
            <Link
              to="/register"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
              }}
              className="btn btn-sm waves-effect waves-light hoverable accent-3"
            >
              Register
            </Link>
            <Link
              to="/login"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
              }}
              className="btn btn-sm waves-effect waves-light hoverable accent-3"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
