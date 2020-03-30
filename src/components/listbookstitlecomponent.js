import React from "react";
import PropTypes from "prop-types";

const listBooksTitleComponent = props => {
  return (
    <div className="list-books-title">
      <h1>{props.title}</h1>
    </div>
  );
};

listBooksTitleComponent.propTypes = {
  title: PropTypes.string
};

export default listBooksTitleComponent;
