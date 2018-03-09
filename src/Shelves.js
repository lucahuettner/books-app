import React, { Component } from 'react';
import Books from './Books';

class Shelves extends Component {

  render() {
    return (<div>{this.props.shelves.map((shelf) => (
    <div className='bookshelf' key={shelf.filter}>
      <h2 className='bookshelf-title'>{shelf.title}</h2>
      <div className='bookshelf-books'>
        <Books
          books={this.props.books.filter((book) => (
            book.shelf === shelf.filter
          ))}
          updateShelf={this.props.updateShelf}/>
      </div>
    </div>
  ))}</div>
      );
  }
}

export default Shelves;
