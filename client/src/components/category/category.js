import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/categoryActions";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

class category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterByName: "",
      categories: [],
      currentCategories: [],
      currentPage: 1,
      categoryPerPage: 5,
      loading: false,
    };
  }
  componentDidMount() {
    //this.state.loading = true;
    this.props.fetchAllCategories();
    //this.state.loading = false;
  }

  handleChange = (e) => {
    this.setState({ filterByName: e.target.value });
    let name = e.target.value;
    let filterCat = this.props.categoryData.response;

    if (filterCat !== undefined) {
      if (name) {
        let fCate = filterCat.filter((x) => x.name.includes(name));
        this.setState({
          categories: fCate,
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
      filterByName,
      categoryPerPage,
      currentPage,
      currentCategories,
    } = this.state;
    // get data from redux store
    const { categoryData } = this.props;

    if (categoryData.response) {
      if (!filterByName) {
        categories = categoryData.response;
      }

      // get current categories

      const indexOfLastCategory = currentPage * categoryPerPage;
      const indexOfFirstCategory = indexOfLastCategory - categoryPerPage;

      //console.log(indexOfLastCategory);
      currentCategories = categories.slice(
        indexOfFirstCategory,
        indexOfLastCategory
      );
      //console.log(categories);
      //console.log(currentCategories);
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
          name="filterByName"
          placeholder="Search by name"
          onChange={this.handleChange}
          id="filterByName"
          value={filterByName}
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
              <th>Id</th>
              <th>Name</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories &&
              currentCategories.map((cat) => {
                return (
                  <tr key={cat._id}>
                    <td>{cat._id}</td>
                    <td>{cat.name}</td>
                    <td>{cat.createdDate}</td>
                    <td>
                      <Link
                        to={`/category/updateCategory/:${cat._id}`}
                        params={{ id: cat._id }}
                      >
                        <button className="waves-effect waves-light btn">
                          /
                        </button>
                      </Link>
                      &nbsp;
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
