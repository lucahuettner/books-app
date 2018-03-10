import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Books from './Books';

class Search extends Component {
  state = {
    query: '',
    results: []
  };
  updateQuery = (query) => {
    const self = this;
    // update state.query
    this.setState({query: query});
    // use BooksAPI to search new Books
    if (query) {
      BooksAPI.search(query).then((results) => self.shelf(results)).catch(() => self.setState({results: []}));
    } else {
      setTimeout(() => {
        self.setState({results: []});
      }, 400);
    }
  };
  updateResult = (book, shelf) => {
    const self = this;
    this.props.updateShelf(book, shelf);
    this.state.results.forEach((result, i) => {
      if (result.id === book.id) {
        self.setState((prevState) => (
          prevState.results[i].shelf = shelf
        ));
      }
    });
  };

  // add fitting shelf to search result
  shelf = (results) => {
    // add shelf = none to every result
    results.forEach((result) => result.shelf = 'none');
    // check if book is already in a shelf and update shelf property of result
    this.props.books.forEach((book) => {
      results.forEach((result, i) => {
        if (book.id === result.id) {
          results[i].shelf = book.shelf;
        }
      });
    });
    this.setState({results: results});
  };

  render() {
    const {query} = this.state;
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link className='close-search' to='/'>Close</Link>
          <div className='search-books-input-wrapper'>
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type='text'
              placeholder='Search by title or author'
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            <Books
              books={this.state.results}
              updateShelf={this.updateResult}/>
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
