import React from "react";
import BookshelfChangerComponent from "./bookshelfchangercomponent";
import PropTypes from "prop-types";

const bookComponent = props => {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: props.bookCoverWidth,
            height: props.bookCoverHeight,
            backgroundImage: "url(" + props.bookCoverUrl + ")"
          }}
        ></div>
        <BookshelfChangerComponent
          onChangeBookshelf={props.onChangeBookshelf}
          currentBookshelf={props.currentBookshelf}
          bookId={props.bookId}
        />
      </div>
      <div className="book-title">{props.bookTitle}</div>
      <div className="book-authors">{props.bookAuthors.join("<br>")}</div>
    </div>
  );
};

bookComponent.propTypes = {
  bookId: PropTypes.string.isRequired,
  bookTitle: PropTypes.string,
  bookAuthors: PropTypes.array.isRequired,
  bookCoverUrl: PropTypes.string,
  bookCoverWidth: PropTypes.number.isRequired,
  bookCoverHeight: PropTypes.number.isRequired,
  onChangeBookshelf: PropTypes.func.isRequired,
  currentBookshelf: PropTypes.string.isRequired
};

export default bookComponent;
