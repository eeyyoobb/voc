import React from "react";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: ${({ theme }) => theme.body};
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const Tabss = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;

  & > svg {
    color: ${({ theme }) => theme.text}; /* Ensure icon color matches text color */
  }

  & > span {
    margin-left: 8px;
    color: ${({ theme }) => theme.text}; /* Ensure text color matches theme */
  }
`;

const Tabs = styled.div`
  margin-left: auto;
  display: flex;
  color: ${({ theme }) => theme.text}; /* Ensure text color matches theme */
`;

const NavLink = styled(Link)`
  padding: 6px 12px;
  color: ${({ theme }) => theme.text}; /* Ensure text color matches theme */
  text-decoration: none;
  cursor: pointer;

  &.active {
    font-weight: bold;
  }
`;

const Header = () => {
  return (
    <Container>
      <Wrapper>
        <Tabss>
          <LibraryBooksOutlinedIcon />
          <span>Book Store</span>
        </Tabss>
        <Tabs>
          <NavLink to="/book">Books</NavLink>
          <NavLink to="/book/add">Add Product</NavLink>
        </Tabs>
      </Wrapper>
    </Container>
  );
};

export default Header;
