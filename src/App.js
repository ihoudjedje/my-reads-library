import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import BookComponent from "./components/bookcomponent";
import BookshelfTitleComp from "./components/bookshelftitlecomponent";
import ListBooksTitleComponent from "./components/listbookstitlecomponent";
import SearchBooks from "./screens/searchbooks";
import SearchButtonComponent from "./components/searchbuttoncomponent";

class BooksApp extends React.Component {
  state = {
    currentlyReadingBookshelfData: [],
    wandToReadBookshelfData: [],
    readBookshelfData: [],
    allBookshelfData: []
  };

  componentDidMount() {
    this.fetchCurrentlyReadingBooks("currentlyReading");
    this.fetchWandToReadBooks("wantToRead");
    this.fetchReadBooks("read");
    this.fetchAllBookshelfs();
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

  fetchAllBookshelfs = () => {
    BooksAPI.getAll().then(allBookshelfs => {
      this.setState({
        allBookshelfData: allBookshelfs
      });
    });
  };

  onChangeBookshelf = (bookId, newShelf) => {
    BooksAPI.update({ id: bookId }, newShelf);
    this.fetchCurrentlyReadingBooks("currentlyReading");
    this.fetchWandToReadBooks("wantToRead");
    this.fetchReadBooks("read");
    this.fetchAllBookshelfs();
  };

  render() {
    const {
      currentlyReadingBookshelfData,
      wandToReadBookshelfData,
      readBookshelfData,
      allBookshelfData
    } = this.state;

    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              onChangeBookshelf={this.onChangeBookshelf}
              allBookshelfData={allBookshelfData}
            />
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
                            <BookComponent
                              bookId={book.id}
                              bookTitle={book.title}
                              bookAuthors={book.authors}
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
                            <BookComponent
                              bookId={book.id}
                              bookTitle={book.title}
                              bookAuthors={book.authors}
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
                            <BookComponent
                              bookId={book.id}
                              bookTitle={book.title}
                              bookAuthors={book.authors}
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
              <SearchButtonComponent title="Add a book" />
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
