import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookComp from "./components/BookComp";
import * as BooksAPI from "./BooksAPI";

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    };
  }

  componentDidMount() {}

  searchForNewBooks = event => {
    let searchTerm = event.target.value;
    if (searchTerm) {
      BooksAPI.search(searchTerm)
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            this.setState({ searchResults: data });
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
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
                <BookComp
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

export default SearchBooks;
