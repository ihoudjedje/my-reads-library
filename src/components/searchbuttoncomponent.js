import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const searchButtonComponent = props => {
  return (
    <Link className="open-search" to="/search">
      {props.title}
    </Link>
  );
};

searchButtonComponent.propTypes = {
  title: PropTypes.string
};

export default searchButtonComponent;
