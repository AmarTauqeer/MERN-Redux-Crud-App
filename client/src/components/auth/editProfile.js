import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/authActions";

const initialState = {
  _id: "",
  name: "",
  email: "",
  password: "",
  nameError: "",
  emailError: "",
};

class editProfile extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  componentDidMount() {
    let id = this.props.location.state.id;
    const users = this.props.auth;
    this.setState({
      _id: id,
      name: users.user.name,
      email: users.user.email,
      password: users.user.password,
    });
  }
  validate = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";

    if (this.state.name.length === 0) {
      nameError = "Name is required.";
    }
    if (!this.state.email.includes("@")) {
      emailError = "Invalid email.";
    }
    if (this.state.email.length === 0) {
      emailError = "Email is required.";
    }
    if (this.state.password.length === 0) {
      passwordError = "Password is required.";
    }
    if (nameError || emailError || passwordError) {
      this.setState({
        nameError,
        emailError,
        passwordError,
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
    if (isValid) {
      const data = {
        _id: this.state._id,
        name: this.state.name,
        email: this.state.email,
      };
      let id = this.state._id;
      this.props.updateProfiles(id, data);
      this.props.history.push("/profile");
    }
  };
  render() {
    return (
      <div className="container">
        <br />
        <div className="row" style={{ marginTop: "4rem" }}>
          <div className="col s8 offset-s2">
            <Link to="/profile" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              Profile
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4
                style={{
                  textAlign: "center",
                  fontWeight: "300",
                }}
              >
                Update Profile
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <label className="active">Name</label>
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  id="name"
                  type="text"
                />
                {this.state.nameError ? (
                  <span className="red-text">{this.state.nameError}</span>
                ) : null}
                <input type="hidden" id="_id" value={this.state._id} />
              </div>
              <div className="input-field col s12">
                <label className="active">Email</label>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  id="email"
                  type="email"
                />
                {this.state.emailError ? (
                  <span className="red-text">{this.state.emailError}</span>
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
const mapStateToProps = (state) => ({
  auth: state.auth,
});
// map action to props
const mapActionToProps = {
  updateProfiles: actions.updateProfiles,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(editProfile));
