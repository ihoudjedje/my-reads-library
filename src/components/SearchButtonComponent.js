import React from "react";
import { Link } from "react-router-dom";

const SearchButtonComponent = props => {
  return (
    <Link className="open-search" to="/search">
      {props.title}
    </Link>
  );
};

export default SearchButtonComponent;
