import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookComp from "./components/BookComp";
import BookshelfTitleComp from "./components/BookshelfTitleComp";
import ListBooksTitleComponent from "./components/ListBooksTitleComponent.js";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    currentlyReadingBookshelfData: [],
    wandToReadBookshelfData: [],
    readBookshelfData: []
  };

  componentDidMount() {
    this.fetchCurrentlyReadingBooks("currentlyReading");
    this.fetchWandToReadBooks("wantToRead");
    this.fetchReadBooks("read");
  }

  fetchCurrentlyReadingBooks = bookshelf => {
    BooksAPI.getAll().then(res => {
      let fetchedCurrentlyReadingBooks = res.filter(
        book => book.shelf === bookshelf
      );
      this.setState({
        currentlyReadingBookshelfData: fetchedCurrentlyReadingBooks
      });
    });
  };

  fetchWandToReadBooks = bookshelf => {
    BooksAPI.getAll().then(res => {
      let fetchedWandToReadBooks = res.filter(book => book.shelf === bookshelf);
      this.setState({
        wandToReadBookshelfData: fetchedWandToReadBooks
      });
    });
  };

  fetchReadBooks = bookshelf => {
    BooksAPI.getAll().then(res => {
      let fetchedReadBooks = res.filter(book => book.shelf === bookshelf);
      this.setState({
        readBookshelfData: fetchedReadBooks
      });
    });
  };

  onChangeBookshelf = (bookId, newShelf) => {
    BooksAPI.update({ id: bookId }, newShelf);
    this.fetchCurrentlyReadingBooks("currentlyReading");
    this.fetchWandToReadBooks("wantToRead");
    this.fetchReadBooks("read");
  };

  render() {
    const {
      currentlyReadingBookshelfData,
      wandToReadBookshelfData,
      readBookshelfData
    } = this.state;

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <ListBooksTitleComponent title="MyReads" />
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <BookshelfTitleComp title="Currently Reading" />
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {currentlyReadingBookshelfData.map(book => (
                        <li key={book.id}>
                          <BookComp
                            bookId={book.id}
                            bookTitle={book.title}
                            bookAuthors={book.authors[0]}
                            bookCoverUrl={book.imageLinks.thumbnail}
                            currentBookshelf={book.shelf}
                            onChangeBookshelf={this.onChangeBookshelf}
                            bookCoverWidth={128}
                            bookCoverHeight={193}
                          />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <BookshelfTitleComp title="Want to Read" />
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {wandToReadBookshelfData.map(book => (
                        <li key={book.id}>
                          <BookComp
                            bookId={book.id}
                            bookTitle={book.title}
                            bookAuthors={book.authors[0]}
                            bookCoverUrl={book.imageLinks.thumbnail}
                            currentBookshelf={book.shelf}
                            onChangeBookshelf={this.onChangeBookshelf}
                            bookCoverWidth={128}
                            bookCoverHeight={193}
                          />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <BookshelfTitleComp title="Read" />
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {readBookshelfData.map(book => (
                        <li key={book.id}>
                          <BookComp
                            bookId={book.id}
                            bookTitle={book.title}
                            bookAuthors={book.authors[0]}
                            bookCoverUrl={book.imageLinks.thumbnail}
                            currentBookshelf={book.shelf}
                            onChangeBookshelf={this.onChangeBookshelf}
                            bookCoverWidth={128}
                            bookCoverHeight={193}
                          />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
