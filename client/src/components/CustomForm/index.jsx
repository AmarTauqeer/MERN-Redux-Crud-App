import React, { Component } from "react";
import InputField from "../InputField/index";
import Button from "../Button/index";
import "./index.scss";
import { Link, withRouter } from "react-router-dom";
import { Validators } from "../../utilities/validator";
import { connect } from "react-redux";
import { addCategories } from "../../actions/categoryActions";
import isEmpty from "is-empty";

const initialState = {
  name: "",
  categoryId: "",
  formTitle: "Create Category",
  message: "",
  acceptance: false,
};
export class index extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  // handle change
  handleChange = (key) => (value) => {
    this.setState({
      [key]: value,
    });
  };
  handleClick = (e) => {
    e.preventDefault();
    const newCategory = {
      name: this.state.name,
      categoryId: this.state.categoryId,
    };
    if (!isEmpty(newCategory.name) && !isEmpty(newCategory.categoryId)) {
      this.props.addCategories(newCategory);
      this.props.history.push("/category");
    } else {
      alert("Pleae fill up the fields");
      return false;
    }
  };
  render() {
    const { name, categoryId, formTitle, message, acceptance } = this.state;
    return (
      <div className="container">
        <Link to="/category" className="btn-flat waves-effect">
          <i className="material-icons left">keyboard_backspace</i> Back to
          Category
        </Link>
        <div className="formTitle">{formTitle && <span>{formTitle}</span>}</div>
        <InputField
          value={name}
          type="text"
          placeholder="Name"
          onChange={this.handleChange("name")}
          validators={[
            { check: Validators.required, message: "Name is required" },
          ]}
        />
        <InputField
          value={categoryId}
          type="text"
          placeholder="Category ref..."
          onChange={this.handleChange("categoryId")}
          validators={[
            { check: Validators.required, message: "Category ref is required" },
          ]}
        />
        <Button value="Save" onClick={this.handleClick} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cat: state.cat,
});

export default connect(mapStateToProps, { addCategories })(withRouter(index));
