/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the API module
jest.mock('./api', () => ({
  getBooks: jest.fn(() => Promise.resolve([])),
  addBook: jest.fn(() => Promise.resolve({ _id: '1', name: 'Mock Book', author: 'Mock Author', status: 'Available' })),
  markBookAsBorrowed: jest.fn((id) => Promise.resolve({ _id: id, name: 'Mock Book', author: 'Mock Author', status: 'Borrowed' })),
  deleteBook: jest.fn(() => Promise.resolve()),
}));

describe('App Component', () => {
  test('renders App component', async () => {
    render(<App />);

    // Ensure the initial loading state is working
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for the initial fetchBooks function to complete
    await waitFor(() => expect(screen.queryByText(/loading/i)).toBeNull());

    // Ensure the Book Library title is rendered
    expect(screen.getByText(/Book Library/i)).toBeInTheDocument();
  });

  test('adds a new book', async () => {
    render(<App />);

    // Wait for the initial fetchBooks function to complete
    await waitFor(() => expect(screen.queryByText(/loading/i)).toBeNull());

    // Fill out the form and add a new book
    fireEvent.change(screen.getByLabelText(/Book Name/i), { target: { value: 'New Book' } });
    fireEvent.change(screen.getByLabelText(/Author/i), { target: { value: 'New Author' } });
    fireEvent.click(screen.getByText(/Add Book/i));

    // Ensure the new book is in the list
    await waitFor(() => expect(screen.getByText(/New Book by New Author/i)).toBeInTheDocument());
  });

  test('marks a book as borrowed', async () => {
    render(<App />);

    // Wait for the initial fetchBooks function to complete
    await waitFor(() => expect(screen.queryByText(/loading/i)).toBeNull());

    // Click the "Mark as Borrowed" button on a book
    fireEvent.click(screen.getByText(/Mark as Borrowed/i));

    // Ensure the book is marked as borrowed
    await waitFor(() => expect(screen.getByText(/Borrowed/i)).toBeInTheDocument());
  });

  test('deletes a book', async () => {
    render(<App />);

    // Wait for the initial fetchBooks function to complete
    await waitFor(() => expect(screen.queryByText(/loading/i)).toBeNull());

    // Click the "Delete" button on a book
    fireEvent.click(screen.getByText(/Delete/i));

    // Ensure the book is no longer in the list
    await waitFor(() => expect(screen.queryByText(/Mock Book by Mock Author/i)).toBeNull());
  });
});
