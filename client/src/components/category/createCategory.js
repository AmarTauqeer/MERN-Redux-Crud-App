import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addCategories } from "../../actions/categoryActions";
class createCategory extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      categoryId: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      name: this.state.name,
      categoryId: this.state.categoryId,
    };
    this.props.addCategories(newCategory);
    this.props.history.push("/category");
  };
  render() {
    return (
      <div className="container">
        <br />
        <div className="row" style={{ marginTop: "4rem" }}>
          <div className="col s8 offset-s2">
            <Link to="/category" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4
                style={{
                  textAlign: "center",
                  fontWeight: "200",
                }}
              >
                Create Category
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  id="name"
                  type="text"
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.categoryId}
                  id="categoryId"
                  type="text"
                />
                <label htmlFor="categoryId">Category ID</label>
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
  cat: state.cat,
});
export default connect(mapStateToProps, { addCategories })(
  withRouter(createCategory)
);
