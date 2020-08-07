import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/categoryActions";
import "./category.css";
import { Link } from "react-router-dom";

class category extends Component {
  componentDidMount() {
    this.props.fetchAllCategories();
  }

  render() {
    const { categoryData } = this.props;
    var categoryList;
    if (categoryData !== undefined) {
      categoryList = categoryData.response;
    }
    // delete operation with prompt
    const onDelete = (id) => {
      if (window.confirm("Are you sure to delete this record?")) {
        this.props.deleteCategory(id);
        this.props.fetchAllCategories();
      }
    };
    return (
      <div className="container">
        <h4>List of Categories</h4>
        <Link to="/category/create" style={{ marginLeft: "50px" }}>
          <button
            className="waves-effect waves-light btn"
            style={{ textDecoration: "none" }}
          >
            +
          </button>
        </Link>

        <table className="responsive-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoryList &&
              categoryList.map((cat) => {
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
                        onClick={() => onDelete(cat._id)}
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
  deleteCategory: actions.deleteCategories,
  fetchAllCategories: actions.fetchCategories,
};

export default connect(mapStateToProps, mapActionToProps)(category);
