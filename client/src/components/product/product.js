import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/productActions";
import * as catActions from "../../actions/categoryActions";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Moment from "moment";

class product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchByName: "",
      products: [],
      currentProducts: [],
      currentPage: 1,
      productPerPage: 5,
    };
  }
  componentDidMount() {
    this.props.fetchAllProducts();
    this.props.fetchAllCategories();
  }
  handleChange = (e) => {
    this.setState({ searchByName: e.target.value });
    let search = e.target.value;
    let data = this.props.productData.response;
    if (data !== undefined && data !== "") {
      if (search) {
        let filterProduct = data.filter((x) => x.productName.includes(search));
        if (filterProduct) {
          this.setState({
            products: filterProduct,
          });
        }
      }
    }
  };
  // delete operation with prompt
  onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      this.props.deleteProduct(id);
      this.props.fetchAllProducts();
    }
  };
  // category name
  getCategoryName = (categoryId) => {
    let categoryData = this.props.categoryData.response;
    let categoryName;
    if (categoryData !== undefined) {
      let filterCategory = categoryData.filter((x) =>
        x._id.includes(categoryId)
      );
      categoryName = filterCategory[0].name;
    }
    return categoryName;
  };
  render() {
    let {
      products,
      searchByName,
      productPerPage,
      currentPage,
      currentProducts,
    } = this.state;
    // get props
    const { productData } = this.props;
    let data = productData.response;
    if (data !== undefined && data !== "") {
      if (!searchByName) {
        products = data;
      }
      // get current categories
      const indexOfLastProduct = currentPage * productPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productPerPage;
      currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    } else {
      return (
        <div className="container" style={{ padding: "0px 20px" }}>
          <h3>loading...</h3>
        </div>
      );
    }
    // Change page
    const paginate = (pageNumber) => {
      this.setState({
        currentPage: pageNumber,
      });
    };
    return (
      <div className="container" style={{ padding: "0px 20px" }}>
        <br />
        <h4 style={{ marginTop: "4rem", textAlign: "center" }}>
          List of Products
        </h4>
        <input
          type="text"
          name="searchByName"
          placeholder="Search by name"
          onChange={this.handleChange}
          id="searchByName"
          value={searchByName}
        />
        <Link to="/product/create">
          <button
            className="waves-effect waves-light btn"
            style={{ textDecoration: "none" }}
          >
            +
          </button>
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Description</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts &&
              currentProducts.map((product) => {
                // get category name
                const categoryName = this.getCategoryName(product.categoryId);
                return (
                  <tr key={product._id}>
                    <td>{product.productName}</td>
                    <td>{categoryName}</td>
                    <td>{product.productDescription}</td>
                    <td>{Moment(product.createdDate).format("MM-DD-YYYY")}</td>
                    <td>
                      <Link
                        to={`/product/updateProduct/:${product._id}`}
                        params={{ id: product._id }}
                      >
                        <button className="waves-effect waves-light btn">
                          /
                        </button>
                      </Link>
                      <button
                        onClick={() => this.onDelete(product._id)}
                        className="waves-effect waves-light btn"
                      >
                        x
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Pagination
          productPerPage={productPerPage}
          totalProducts={products.length}
          paginate={paginate}
        />
      </div>
    );
  }
}
// map state to props
const mapStateToProps = (state) => {
  return {
    productData: state.prod.products,
    categoryData: state.cat.categories,
  };
};
// map props to actions
const mapActionToProps = {
  fetchAllProducts: actions.fetchProducts,
  deleteProduct: actions.deleteProducts,
  fetchAllCategories: catActions.fetchCategories,
};
export default connect(mapStateToProps, mapActionToProps)(product);
