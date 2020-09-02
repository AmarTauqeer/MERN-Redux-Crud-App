import React, { useState } from "react";
import PropTypes from "prop-types";
import { validateInput } from "../../utilities/validator";

const InputField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  validators,
}) => {
  const [error, setError] = useState(false);
  const handleChange = (event) => {
    const { value } = event.target;
    setError(validateInput(validators, value));
    onChange(value);
    //console.log(value);
  };
  return (
    <div className="container">
      <input
        label={label}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="form-control"
      />
      {error && <p className="card-panel red-text">{error.message}</p>}
    </div>
  );
};
// type checking
InputField.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
// default value
InputField.defaultProps = {
  value: "",
  label: "",
  placeholder: "",
  type: "text",
  validators: [],
};
export default InputField;
