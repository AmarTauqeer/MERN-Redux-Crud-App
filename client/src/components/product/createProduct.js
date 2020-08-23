import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/productActions";

const initialState = {
  productName: "",
  productDescription: "",
  categoryId: "",
  selectedCategory: "",
  productNameError: "",
  categoryIdError: "",
  productDescriptionError: "",
};

class createProduct extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  validate = () => {
    let productNameError = "";
    let productDescriptionError = "";
    let categoryIdError = "";

    if (!this.state.productName) {
      productNameError = "Name is required.";
    }
    if (!this.state.productDescription) {
      productDescriptionError = "Description is required.";
    }
    if (!this.state.selectedCategory) {
      categoryIdError = "Product is required.";
    }

    if ((productNameError, productDescriptionError, categoryIdError)) {
      this.setState({
        productNameError,
        productDescriptionError,
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
    const newProduct = {
      productName: this.state.productName,
      productDescription: this.state.productDescription,
      categoryId: this.state.selectedCategory,
    };

    // validation
    const isValid = this.validate();
    if (isValid) {
      this.props.addProducts(newProduct);
      this.props.history.push("/product");
      // clear form
      this.setState(initialState);
    }
  };
  render() {
    //console.log(this.props.cat.response);
    return (
      <div className="container">
        <br />
        <div className="row" style={{ marginTop: "4rem" }}>
          <div className="col s8 offset-s2">
            <Link to="/product" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              Product
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4
                style={{
                  textAlign: "center",
                  fontWeight: "200",
                }}
              >
                Create Product
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <label
                style={{ padding: "10px", fontSize: "14px", fontWeight: "400" }}
              >
                Category
              </label>
              <div className="input-field col s12">
                <select
                  className="browser-default"
                  name="categoryId"
                  onChange={(e) =>
                    this.setState({ selectedCategory: e.target.value })
                  }
                  value={this.state.selectedCategory}
                >
                  {this.props.cat.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {this.state.categoryIdError ? (
                  <span className="red-text">{this.state.categoryIdError}</span>
                ) : null}
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.productName}
                  id="productName"
                  type="text"
                />
                <label htmlFor="productName">Name</label>
                {this.state.productNameError ? (
                  <span className="red-text">
                    {this.state.productNameError}
                  </span>
                ) : null}
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.productDescription}
                  id="productDescription"
                  type="text"
                />
                <label htmlFor="productDescription">Description</label>
                {this.state.productDescriptionError ? (
                  <span className="red-text">
                    {this.state.productDescriptionError}
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
// map state to props
const mapStateToProps = (state) => ({
  cat: state.cat.categories.response,
});
// map props to actions
const mapActionToProps = {
  addProducts: actions.addProducts,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(createProduct));
