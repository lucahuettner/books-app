import React from 'react';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Books from './Books';
import Search from './Search';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
      console.log(this.state);
    });
  };

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(BooksAPI.getAll().then((books) => {
          this.setState({books});
          console.log(this.state);
        }));

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
                    <Books
                      books={this.state.books}
                      shelf='currentlyReading'
                      updateShelf={this.updateShelf}/>
                  </div>
                </div>
                <div className='bookshelf'>
                  <h2 className='bookshelf-title'>Want to Read</h2>
                  <div className='bookshelf-books'>
                    <Books
                      books={this.state.books}
                      shelf='wantToRead'
                      updateShelf={this.updateShelf}/>
                  </div>
                </div>
                <div className='bookshelf'>
                  <h2 className='bookshelf-title'>Read</h2>
                  <div className='bookshelf-books'>
                    <Books
                      books={this.state.books}
                      shelf='read'
                      updateShelf={this.updateShelf}/>
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
