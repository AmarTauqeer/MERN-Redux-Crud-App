import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addCategories } from "../../actions/categoryActions";

const initialState = {
  name: "",
  categoryId: "",
  nameError: "",
  categoryIdError: "",
};

class createCategory extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  validate = () => {
    let nameError = "";
    let categoryIdError = "";

    if (!this.state.name) {
      nameError = "Name is required.";
    }

    if (!this.state.categoryId) {
      categoryIdError = "Category id is required.";
    }

    if ((nameError, categoryIdError)) {
      this.setState({
        nameError,
        categoryIdError,
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

    const newCategory = {
      name: this.state.name,
      categoryId: this.state.categoryId,
    };

    // validation
    const isValid = this.validate();

    if (isValid) {
      this.props.addCategories(newCategory);
      this.props.history.push("/category");
    }
  };
  render() {
    return (
      <div className="container">
        <br />
        <div className="row" style={{ marginTop: "4rem" }}>
          <div className="col s8 offset-s2">
            <Link to="/category" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              Category
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
                {this.state.nameError ? (
                  <span className="red-text">{this.state.nameError}</span>
                ) : null}
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.categoryId}
                  id="categoryId"
                  type="text"
                />
                <label htmlFor="categoryId">Ref Cat ID</label>
                {this.state.categoryIdError ? (
                  <span className="red-text">{this.state.categoryIdError}</span>
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
