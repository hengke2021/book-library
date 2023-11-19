import React, { useState, useEffect } from 'react';
import { getBooks, addBook, markBookAsBorrowed, deleteBook as deleteBookApi } from './api';

interface Book {
  _id: string;
  name: string;
  author: string;
  status: string;
}

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({ name: '', author: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch books from the backend using the API function
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        // Handle the error, e.g., display an error message to the user
        console.error('Error fetching books:', error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []);    

  const handleAddBook = async () => {
    try {
      // Call backend API to add a new book using the API function
      const data = await addBook(newBook);
      setBooks([...books, data]);
      // ...
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const markAsBorrowed = async (id: string) => {
    try {
      // Call backend API to mark a book as borrowed using the API function
      const data = await markBookAsBorrowed(id);
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book._id === id ? { ...data } : book))
      );
      // ...
    } catch (error) {
      console.error('Error marking book as borrowed:', error);
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      // Call backend API to delete a book using the API function
      await deleteBookApi(id);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
      // ...
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      <h1>Book Library</h1>
      <form>
      <label>
        Book Name:
        <input
          type="text"
          value={newBook.name}
          onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
        />
      </label>

      <label>
        Author:
        <input
          type="text"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
      </label>
      <button type="button" onClick={handleAddBook}>
          Add Book
      </button>
      
      <ul>
        {books.map(book => (
          <li key={book._id}>
            {book.name} by {book.author} - {book.status}
            <button type="button" onClick={() => markAsBorrowed(book._id)} disabled={book.status==='borrowed'}>
              Mark as Borrowed
            </button>
            <button type="button" onClick={() => handleDeleteBook(book._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      </form>
    </div>
  );
};

export default App;