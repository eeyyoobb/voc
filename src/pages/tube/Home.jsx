import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Card from "../../components/components-Tube/Card";
import axios from "axios";
import { lightTheme, darkTheme } from "../../utils/Theme";

const Home = ({ type, darkMode }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/api/videos/${type}`);
      setVideos(res.data);
      console.log("Fetched videos:", res.data);
    };
    fetchVideos();
  }, [type]);

  // Dynamically define theme based on darkMode state
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {videos.map((video) => (
          <Card key={video._id} video={video} />
        ))}
      </Container>
    </ThemeProvider>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;
