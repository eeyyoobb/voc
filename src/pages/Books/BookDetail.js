import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BookDetail = () => {
  const [inputs, setInputs] = useState({
    name: "",
    author: "",
    description: "",
    price: "",
    image: "",
    download: "",
  });
  const id = useParams().id;
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`/api/books/${id}`)
        .then((res) => res.data)
        .then((data) => {
          setInputs(data.book);
          setChecked(data.book.available);
        });
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`/api/books/${id}`, {
        name: String(inputs.name),
        author: String(inputs.author),
        description: String(inputs.description),
        price: Number(inputs.price),
        image: String(inputs.image),
        available: Boolean(checked),
        download: String(inputs.download),
      })
      .then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate("/book"));
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          maxWidth={700}
          alignContent="center"
          alignSelf="center"
          marginLeft="auto"
          marginRight="auto"
          marginTop={10}
        >
          <FormLabel>Name</FormLabel>
          <TextField
            value={inputs.name}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="name"
          />
          <FormLabel>Author</FormLabel>
          <TextField
            value={inputs.author}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="author"
          />
          <FormLabel>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="description"
          />
          <FormLabel>Price</FormLabel>
          <TextField
            value={inputs.price}
            onChange={handleChange}
            type="number"
            margin="normal"
            fullWidth
            variant="outlined"
            name="price"
          />
          <FormLabel>Image</FormLabel>
          <TextField
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="image"
          />
          <FormLabel>Download</FormLabel>
          <TextField
            value={inputs.download}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="download"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            }
            label="Available"
          />

          <Button variant="contained" type="submit">
            Update Book
          </Button>
        </Box>
      </form> 
    </div>
  );
};

export default BookDetail;
