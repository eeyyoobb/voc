import React from "react";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import AddBook from "./AddBook";
import Books from "./Books";
import BookDetail from "./BookDetail";
import styled from "styled-components";


const Container = styled.div`
  background-color: ${({ theme }) => theme.body};
  height:100vh;
`;

const BookApp = ({ darkMode }) => {
  return (
      <Container>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Books darkMode={darkMode} />} />
            <Route path="/add" element={<AddBook darkMode={darkMode} />} />
            <Route path="/:id" element={<BookDetail darkMode={darkMode} />} />
          </Routes>
        </main>
      </Container>
  );
};

export default BookApp;
