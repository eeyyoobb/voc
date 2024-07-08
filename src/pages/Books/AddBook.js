import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { lightTheme, darkTheme } from "../../utils/Theme";

const Container = styled.div`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledFormLabel = styled.label`
  color: ${({ theme }) => theme.text};
  margin: 10px 0 5px;
`;

const StyledInput = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

const StyledTextArea = styled.textarea`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.body};
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 20%;

`;

const AddBook = ({ darkMode }) => {
  const theme = darkMode ? darkTheme : lightTheme;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    price: "",
    author: "",
    image: "",
    download: "",
  });
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    await axios.post("/api/books", {
      name: String(inputs.name),
      author: String(inputs.author),
      description: String(inputs.description),
      price: Number(inputs.price),
      image: String(inputs.image),
      available: Boolean(checked),
      download: String(inputs.download),
    }).then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate("/book"));
  };

  return (
    <Container theme={theme}>
      <form onSubmit={handleSubmit}>
        <StyledFormLabel theme={theme}>Name</StyledFormLabel>
        <StyledInput
          type="text"
          name="name"
          value={inputs.name}
          onChange={handleChange}
          theme={theme}
        />
        <StyledFormLabel theme={theme}>Author</StyledFormLabel>
        <StyledInput
          type="text"
          name="author"
          value={inputs.author}
          onChange={handleChange}
          theme={theme}
        />
        <StyledFormLabel theme={theme}>Description</StyledFormLabel>
        <StyledTextArea
          name="description"
          value={inputs.description}
          onChange={handleChange}
          theme={theme}
        />
        <StyledFormLabel theme={theme}>Price</StyledFormLabel>
        <StyledInput
          type="number"
          name="price"
          value={inputs.price}
          onChange={handleChange}
          theme={theme}
        />
        <StyledFormLabel theme={theme}>Image</StyledFormLabel>
        <StyledInput
          type="text"
          name="image"
          value={inputs.image}
          onChange={handleChange}
          theme={theme}
        />
        <StyledFormLabel theme={theme}>Download</StyledFormLabel>
        <StyledInput
          type="text"
          name="download"
          value={inputs.download}
          onChange={handleChange}
          theme={theme}
        />
        <StyledFormLabel theme={theme}>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          Available
        </StyledFormLabel>
        <StyledButton type="submit" theme={theme}>
          Add Book
        </StyledButton>
      </form>
    </Container>
  );
};

export default AddBook;
