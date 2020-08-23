import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/productActions";

const initialState = {
  _id: "",
  productName: "",
  productDescription: "",
  categoryId: "",
  selectedCategory: "",
  productNameError: "",
  categoryIdError: "",
  productDescriptionError: "",
};

class updateProduct extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    id = id.substr(1);

    const allProducts = this.props.prod;

    const currentProduct = allProducts.filter((x) => x._id === id);

    this.setState({
      _id: currentProduct[0]._id,
      productName: currentProduct[0].productName,
      productDescription: currentProduct[0].productDescription,
      categoryId: currentProduct[0].categoryId,
      selectedCategory: currentProduct[0].categoryId,
    });
  }

  validate = () => {
    let productNameError = "";
    let productDescriptionError = "";
    let categoryIdError = "";

    if (this.state.productName.length === 0) {
      productNameError = "Name is required.";
    }
    if (this.state.productDescription.length === 0) {
      productDescriptionError = "Description is required.";
    }
    if (this.state.selectedCategory.length === 0) {
      categoryIdError = "Product id is required.";
    }

    if (productNameError || productDescriptionError || categoryIdError) {
      this.setState({
        productNameError,
        categoryIdError,
        productDescriptionError,
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
        productName: this.state.productName,
        productDescription: this.state.productDescription,
        categoryId: this.state.selectedCategory,
      };
      let id = this.state._id;
      this.props.updateProducts(id, data);
      this.props.history.push("/product");
    }
  };
  render() {
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
                  fontWeight: "300",
                }}
              >
                Update Product
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
                <label className="active">Name</label>
                <input
                  onChange={this.onChange}
                  value={this.state.productName}
                  id="productName"
                  type="text"
                />
                {this.state.productNameError ? (
                  <span className="red-text">
                    {this.state.productNameError}
                  </span>
                ) : null}
                <input type="hidden" id="_id" value={this.state._id} />
              </div>

              <div className="input-field col s12">
                <label className="active">Description</label>
                <input
                  onChange={this.onChange}
                  value={this.state.productDescription}
                  id="productDescription"
                  type="text"
                />
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
  cat: state.cat.categories.response,
  prod: state.prod.products.response,
});

// map action to props
const mapActionToProps = {
  fetchAllProducts: actions.fetchProducts,
  updateProducts: actions.updateProducts,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withRouter(updateProduct));
