import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/categoryActions";

const initialState = {
  _id: "",
  name: "",
  categoryId: "",
  nameError: "",
  categoryIdError: "",
};

class updateCategory extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    id = id.substr(1);

    const allCategories = this.props.cat.response;

    const currentCategory = allCategories.filter((x) => x._id === id);

    this.setState({
      _id: currentCategory[0]._id,
      name: currentCategory[0].name,
      categoryId: currentCategory[0].categoryId,
    });
  }

  validate = () => {
    let nameError = "";
    let categoryIdError = "";

    if (this.state.name.length === 0) {
      nameError = "Name is required.";
    }

    if (this.state.categoryId.length === 0) {
      categoryIdError = "Category id is required.";
    }

    if (nameError || categoryIdError) {
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

    // validation
    const isValid = this.validate();

    if (isValid) {
      const data = {
        _id: this.state._id,
        name: this.state.name,
        categoryId: this.state.categoryId,
      };

      this.props.updateCategories(this.state._id, data);
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
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4
                style={{
                  textAlign: "center",
                  fontWeight: "300",
                }}
              >
                Update Category
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
                {this.state.nameError ? (
                  <span className="red-text">{this.state.nameError}</span>
                ) : null}

                <input type="hidden" id="_id" value={this.state._id} />
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.categoryId}
                  id="categoryId"
                  type="text"
                />
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
  cat: state.cat.categories,
});

// map action to props
const mapActionToProps = {
  fetchAllCategories: actions.fetchCategories,
  updateCategories: actions.updateCategories,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(updateCategory));
