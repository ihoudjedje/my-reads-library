import React from "react";
import PropTypes from "prop-types";

const bookshelfTitleComp = props => {
  return <h2 className="bookshelf-title">{props.title}</h2>;
};

bookshelfTitleComp.propTypes = {
  title: PropTypes.string
};

export default bookshelfTitleComp;
