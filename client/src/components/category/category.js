import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/categoryActions";
import { Link } from "react-router-dom";

class category extends Component {
  constructor() {
    super();
    this.state = {
      filterByName: "",
      categoryList: "",
    };
  }
  componentDidMount() {
    this.props.fetchAllCategories();
  }
  handleChange = (e) => {
    this.setState({ filterByName: e.target.value });

    let name = e.target.value;

    let filterCat = this.props.categoryData.response;

    if (filterCat !== undefined) {
      if (name) {
        let fCate = filterCat.filter((x) => x.name.includes(name));
        this.setState({
          categoryList: fCate,
        });
      }
    }
  };

  render() {
    const { categoryData } = this.props;
    let { categoryList, filterByName } = this.state;

    if (!filterByName) {
      if (categoryData !== undefined) {
        categoryList = categoryData.response;
      }
    }
    // delete operation with prompt
    const onDelete = (id) => {
      if (window.confirm("Are you sure to delete this record?")) {
        this.props.deleteCategory(id);
        this.props.fetchAllCategories();
      }
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

        <table className="striped">
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
