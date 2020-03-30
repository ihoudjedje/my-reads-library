import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
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
        <Route
          path="/search"
          render={() => (
            <SearchBooks onChangeBookshelf={this.onChangeBookshelf} />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
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
