import React, { Component } from 'react';

class Books extends Component {
  render() {
    const {updateShelf, books} = this.props;
    console.log(books);
    return (
      <ol className='books-grid'>
        // loop over each book
        {books.map((book) => (
          <li key={book.id}>
            <div className='book'>
              <div className='book-top'>
                <div className='book-cover' style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                <div className='book-shelf-changer'>
                  // set the current shelf as the default value of the dropdown menu
                  <select defaultValue={book.shelf} onChange={(e) => updateShelf(book, e.target.value)}>
                    <option value='none' disabled>Move to...</option>
                    <option value='currentlyReading'>Currently Reading</option>
                    <option value='wantToRead'>Want to Read</option>
                    <option value='read'>Read</option>
                    <option value='none'>None</option>
                  </select>
                </div>
              </div>
              <div className='book-title'>{book.title}</div>
              <div className='book-authors'>{book.authors[0]} <br/> {book.authors[1]}</div>
            </div>
          </li>
        ))}
      </ol>
    );
  }
}

export default Books;
