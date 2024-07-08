
import styled from "styled-components";
import Menu from "../../components/components-Tube/Menu";
import Navbar from "../../components/components-Tube/Tube-bar";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Video from "./Video";

import Search from "./Search";


const Container = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.body};
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.body};
`;

const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App({darkMode}) {
  

  return (
      <Container>
        <Menu/>
        <Main>
          <Navbar />
          <Wrapper>
            <Routes>
              <Route path="/" element={<Home darkMode={darkMode} type="random" />} />
              <Route path="trends" element={<Home darkMode={darkMode} type="trend" />} />
              <Route path="subscriptions" element={<Home  darkMode={darkMode} type="sub" />} />
              <Route path="search" element={<Search darkMode={darkMode} />} />
              <Route path="video/:id" element={<Video darkMode={darkMode} />} />
            </Routes>
          </Wrapper>
        </Main>
      </Container>

  );
}

export default App;
