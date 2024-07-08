import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Book from "./Book";

const fetchBooks = async () => {
  try {
    const response = await axios.get('/api/books');
    return response.data.books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

const BooksContainer = styled.div`
  margin: 20px;
  background-color: ${({ theme }) => theme.body}; 
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  
`;

const BooksList = styled.ul`
  list-style-type: none;
  padding: 0;
  display:flex;
  gap:20px
  
`;
const H2 = styled.text`
  color: ${({ theme }) => theme.text};
`;

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks().then((data) => setBooks(data));
  }, []);

  return (
    <BooksContainer>
      <H2>Book List</H2>
      <BooksList>
        {books.map((book, index) => (
          <li key={index}>
            <Book book={book} />
          </li>
        ))}
      </BooksList>
    </BooksContainer>
  );
};

export default Books;
