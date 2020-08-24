import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/categoryActions";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Moment from "moment";
import spinner from "./../../images/spinner.gif";

class category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchByName: "",
      categories: [],
      currentCategories: [],
      currentPage: 1,
      categoryPerPage: 5,
    };
  }
  componentDidMount() {
    this.props.fetchAllCategories();
  }

  handleChange = (e) => {
    this.setState({ searchByName: e.target.value });
    let name = e.target.value;
    let data = this.props.categoryData.response;
    if (data !== undefined && data !== "") {
      if (name) {
        let filterCategory = data.filter((x) => x.name.includes(name));
        this.setState({
          categories: filterCategory,
        });
      }
    }
  };
  // delete operation with prompt
  onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      this.props.deleteCategory(id);
      this.props.fetchAllCategories();
    }
  };

  render() {
    let {
      categories,
      searchByName,
      categoryPerPage,
      currentPage,
      currentCategories,
    } = this.state;
    // get props
    const { categoryData } = this.props;

    let data = categoryData.response;

    if (data !== undefined && data !== "") {
      if (!searchByName) {
        categories = categoryData.response;
      }
      // get current categories
      const indexOfLastCategory = currentPage * categoryPerPage;
      const indexOfFirstCategory = indexOfLastCategory - categoryPerPage;

      currentCategories = categories.slice(
        indexOfFirstCategory,
        indexOfLastCategory
      );
    } else {
      return (
        <div
          className="container"
          style={{ padding: "0px 20px", textAlign: "center" }}
        >
          <img src={spinner} alt="spinner" />
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
          List of Categories
        </h4>
        <input
          type="text"
          name="searchByName"
          placeholder="Search by name"
          onChange={this.handleChange}
          id="searchByName"
          value={searchByName}
        />

        <Link to="/category/create">
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
              <th>Name</th>
              <th>Ref Cat Id</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories &&
              currentCategories.map((cat) => {
                return (
                  <tr key={cat._id}>
                    <td>{cat.name}</td>
                    <td>{cat.categoryId}</td>
                    <td>{Moment(cat.createdDate).format("MM-DD-YYYY")}</td>
                    <td>
                      <Link
                        to={`/category/updateCategory/:${cat._id}`}
                        params={{ id: cat._id }}
                      >
                        <button className="waves-effect waves-light btn">
                          /
                        </button>
                      </Link>
                      <button
                        onClick={() => this.onDelete(cat._id)}
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
          categoryPerPage={categoryPerPage}
          totalCategories={categories.length}
          paginate={paginate}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoryData: state.cat.categories,
  };
};

// map action to props
const mapActionToProps = {
  fetchAllCategories: actions.fetchCategories,
  deleteCategory: actions.deleteCategories,
};

export default connect(mapStateToProps, mapActionToProps)(category);
