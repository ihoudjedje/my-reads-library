import React from "react";
import BookshelfChangerComponent from "./bookshelfchangercomponent";

const bookComponent = props => {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: props.bookCoverWidth,
            height: props.bookCoverHeight,
            backgroundImage: "url(" + props.bookCoverUrl + ")",
            backgroundColor: props.backgroundColor
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

export default bookComponent;
