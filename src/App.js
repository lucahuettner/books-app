import React from 'react';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Books from './Books';
import Search from './Search';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
      console.log(this.state);
    })
  };

  render() {
    return (
      <div className='app'>
        <Route path='/search' render={() => (
            <Search/>
          )}/>
        <Route exact path='/' render={() => (
          <div className='list-books'>
            <div className='list-books-title'>
              <h1>MyReads</h1>
            </div>
            <div className='list-books-content'>
              <div>
                <div className='bookshelf'>
                  <h2 className='bookshelf-title'>Currently Reading</h2>
                  <div className='bookshelf-books'>
                    <Books books={this.state.books} shelf='currentlyReading'/>
                  </div>
                </div>
                <div className='bookshelf'>
                  <h2 className='bookshelf-title'>Want to Read</h2>
                  <div className='bookshelf-books'>
                    <Books books={this.state.books} shelf='wantToRead'/>
                  </div>
                </div>
                <div className='bookshelf'>
                  <h2 className='bookshelf-title'>Read</h2>
                  <div className='bookshelf-books'>
                    <Books books={this.state.books} shelf='read'/>
                  </div>
                </div>
              </div>
            </div>
            <div className='open-search'>
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    );
  }
}

export default BooksApp;
