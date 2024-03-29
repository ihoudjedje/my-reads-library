import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookComponent from "../components/bookcomponent";
import * as BooksAPI from "../BooksAPI";
import PropTypes from "prop-types";

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    };
  }

  /**
   * @description Searching for new books
   * @param {object} event - search input's callback
   */
  searchForNewBooks = event => {
    let searchTerm = event.target.value;
    if (searchTerm) {
      BooksAPI.search(searchTerm)
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            const validBooks = data.filter(
              this.getValidBooksWithoutMissingData
            );
            const booksResult = validBooks.map(
              this.getBooksWithBookshelfsUpdates
            );
            this.setState({ searchResults: booksResult });
          } else {
            this.setState({ searchResults: [] });
          }
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      this.setState({ searchResults: [] });
    }
  };

  /**
   * @description Filter out books that don't have a thumbnail or/and authors
   * @param {object} book - a given book
   * @returns {boolean}
   */
  getValidBooksWithoutMissingData = book => {
    return (
      typeof book.imageLinks !== "undefined" &&
      typeof book.authors !== "undefined"
    );
  };

  /**
   * @description set bookshelfs of search results
   * @param {object} book - a given book
   * @returns {object} updated book with bookshelf set
   */
  getBooksWithBookshelfsUpdates = book => {
    let intersect = this.props.allBookshelfData.filter(
      bookshelf => bookshelf.id === book.id
    );
    intersect.length !== 0
      ? (book.shelf = intersect[0].shelf)
      : (book.shelf = "none");
    return book;
  };

  render() {
    const { searchResults } = this.state;
    const { onChangeBookshelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.searchForNewBooks}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.map(book => (
              <li key={book.id}>
                <BookComponent
                  bookId={book.id}
                  bookTitle={book.title}
                  bookAuthors={book.authors}
                  bookCoverUrl={book.imageLinks.thumbnail}
                  currentBookshelf={book.shelf}
                  onChangeBookshelf={onChangeBookshelf}
                  bookCoverWidth={128}
                  bookCoverHeight={193}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  allBookshelfData: PropTypes.array.isRequired,
  onChangeBookshelf: PropTypes.func.isRequired
};

export default SearchBooks;
