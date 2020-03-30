import React from "react";

const BookshelfChangerComponent = props => {
  return (
    <div className="book-shelf-changer">
      <select
        onChange={event => {
          props.onChangeBookshelf(props.bookId, event.target.value);
        }}
        value={props.currentBookshelf}
      >
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BookshelfChangerComponent;
