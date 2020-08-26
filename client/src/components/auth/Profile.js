import React, { Component } from "react";
import { connect } from "react-redux";

class Profile extends Component {
  state = {
    id: "",
    users: {},
  };
  handleClick = (id) => {
    if (id) {
      //this.props.history.push(`/editProfile/:${user._id}`);
      this.props.history.push({
        pathname: `/editProfile`,
        state: { id: id },
      });
    }
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div className="container" style={{ padding: "0px 20px" }}>
        <br />
        <h4 style={{ marginTop: "4rem", textAlign: "center" }}>Profile</h4>
        <br />
        <div className="row">
          <div className="col s4" style={{ textAlign: "center" }}>
            <b>Name</b>
          </div>
          <div className="col s4">{user.name}</div>
        </div>
        <div className="row">
          <div className="col s4" style={{ textAlign: "center" }}>
            <b>Email</b>
          </div>
          <div className="col s4">{user.email}</div>
        </div>
        <div className="row">
          <div className="col s4"></div>
          <div className="col s4">
            <button
              onClick={() => this.handleClick(user._id)}
              className="waves-effect waves-light btn"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(Profile);
