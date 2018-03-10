import React from 'react';
import {Route, Link} from 'react-router-dom';
import Search from './Search';
import Shelves from './Shelves';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  async componentDidMount() {
    //get all books on pageload
    const books = await BooksAPI.getAll();
    this.setState({books});
  }

  updateShelf = (book, shelf) => {
    const self = this;
    // update the shelf in the api
    BooksAPI.update(book, shelf).then(setTimeout(() => {
      BooksAPI.getAll().then((books) => {
          // load new book array
          self.setState({books});
        });
    }, 300)
);

  };

  render() {
    const shelves = [
      {
      title: 'Currently Reading',
      filter: 'currentlyReading'
    },{
      title: 'Want to Read',
      filter: 'wantToRead'
    },{
      title: 'Read',
      filter: 'read'
    }];

    return (
      <div className='app'>
        <Route path='/search' render={() => (
            <Search
              updateShelf={this.updateShelf}
              books={this.state.books}/>
          )}/>
        <Route exact path='/' render={() => (
          <div className='list-books'>
            <div className='list-books-title'>
              <h1>MyReads</h1>
            </div>
            <div className='list-books-content'>
              <div>
                <Shelves
                  books={this.state.books}
                  updateShelf={this.updateShelf}
                  shelves={shelves}/>
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
