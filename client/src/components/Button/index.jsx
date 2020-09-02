import React from "react";
import PropTypes from "prop-types";

import "./buttonStyles.css";

const Button = ({ value, onClick }) => {
  return (
    <div className="container">
      <button
        className="waves-effect waves-light btn"
        onClick={(event) => onClick(event)}
      >
        {value}
      </button>
    </div>
  );
};

Button.propTypes = {
  styleClass: PropTypes.string,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  styleClass: "btn-primary",
};

export default Button;
