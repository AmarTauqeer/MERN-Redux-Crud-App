import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/authActions";
import PropTypes from "prop-types";
import isEmpty from "is-empty";

const initialState = {
  _id: "",
  oldPassword: "",
  oldPasswordError: "",
  newPassword: "",
  newPasswordError: "",
  errors: {},
};

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  componentWillReceiveProps(nextProps) {
    if (isEmpty(nextProps.errors)) {
      this.props.history.push("/login");
    } else {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  componentDidMount() {
    const users = this.props.auth;
    this.setState({
      _id: users.user._id,
    });
  }
  validate = () => {
    let oldPasswordError = "";
    let newPasswordError = "";

    if (this.state.oldPassword.length === 0) {
      oldPasswordError = "Old password is required.";
    }
    if (this.state.newPassword.length === 0) {
      newPasswordError = "New password is required.";
    }
    if (oldPasswordError || newPasswordError) {
      this.setState({
        oldPasswordError,
        newPasswordError,
      });
      return false;
    }
    return true;
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    // validation
    const isValid = this.validate();
    //console.log(this.state.errors);
    if (isValid) {
      const data = {
        _id: this.state._id,
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
      };
      let id = this.state._id;
      this.props.changePasswords(id, data);
    }
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <br />
        <div className="row" style={{ marginTop: "4rem" }}>
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              Home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4
                style={{
                  textAlign: "center",
                  fontWeight: "300",
                }}
              >
                Change Password
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <label className="active">Old Password</label>
                <input
                  onChange={this.onChange}
                  value={this.state.oldPassword}
                  id="oldPassword"
                  type="password"
                />
                {this.state.oldPasswordError ? (
                  <span className="red-text">
                    {this.state.oldPasswordError}
                  </span>
                ) : null}
                {errors.passwordincorrect ? (
                  <span className="red-text">{errors.passwordincorrect}</span>
                ) : null}

                <input type="hidden" id="_id" value={this.state._id} />
              </div>
              <div className="input-field col s12">
                <label className="active">New Password</label>
                <input
                  onChange={this.onChange}
                  value={this.state.newPassword}
                  id="newPassword"
                  type="password"
                />
                {this.state.newPasswordError ? (
                  <span className="red-text">
                    {this.state.newPasswordError}
                  </span>
                ) : null}
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="waves-effect waves-light btn"
                  onClick={this.onSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
// map action to props
const mapActionToProps = {
  changePasswords: actions.changePasswords,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(ChangePassword));
