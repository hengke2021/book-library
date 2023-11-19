// api.js
const apiUrl = 'http://localhost:3001'; // Set your API endpoint here

export const getBooks = async () => {
  const response = await fetch(`${apiUrl}/books`);
  const data = await response.json();
  return data;
};

export const addBook = async (newBook) => {
  const response = await fetch(`${apiUrl}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBook),
  });
  const data = await response.json();
  return data;
};

export const markBookAsBorrowed = async (id) => {
  const response = await fetch(`${apiUrl}/books/${id}`, {
    method: 'PATCH',
  });
  const data = await response.json();
  return data;
};

export const deleteBook = async (id) => {
  const response = await fetch(`${apiUrl}/books/${id}`, {
    method: 'DELETE',
  });
  return response;
};


