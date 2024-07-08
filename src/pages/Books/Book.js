import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@mui/material";

const Card = styled.div`
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 300px;
`;

const Photo = styled.div`
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  width: 150px;
  height: 210px;
  overflow: hidden; 
`;

const H3 = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  margin-top: 10px;
`;

const Article = styled.div`
  color: ${({ theme }) => theme.text};
  font-style: italic;
  margin-top: 5px;
`;

const H4 = styled.div`
  color: ${({ theme }) => theme.text};
  margin-top: 5px;
`;
const Text = styled.div`
  alignitem:left;
  width-max:120px:
 
`;
const Part = styled.div`
 display:flex;
 
 gap:20px;
`;
const Butt = styled.div`
 display:flex;
 gap:20px;
 margin-top:10px;
`;

const Book = (props) => {
  const navigate = useNavigate();
  const { _id, name, author, description, price, image } = props.book;

  const deleteHandler = async () => {
    try {
      await axios.delete(`/api/books/${_id}`);
      navigate("/book"); // Navigate to the book listing page after deletion
    } catch (error) {
      console.error("Error deleting the book:", error);
    }
  };

  return (
    <Card>
      <Part>
      <Photo>
        <img src={image} alt={name} />
      </Photo>
      <Text>
      <Article>By {author}</Article>
      <H3>{name}</H3>
      <H4>{description}</H4>
      <H3>Rs {price}</H3>
      </Text>
      </Part>
      <Butt>
      <StyledButton component={Link} to={`/book/${_id}`} variant="contained" color="primary">
        Update
      </StyledButton>
      <StyledButton variant="contained" color="error" onClick={deleteHandler}>
        Delete
      </StyledButton>
      </Butt>
    </Card>
  );
};

const StyledButton = styled(Button)`
  display:flex;
  && {
    margin-top: auto;
  }
`;

export default Book;
