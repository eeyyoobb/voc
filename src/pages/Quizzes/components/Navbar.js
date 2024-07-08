import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

// Styled components for Navbar
const Nav = styled.nav`
  font-family: 'Poppins', sans-serif;
  max-width: 100%;
  padding: 1rem;
  @media (min-width: 640px) {
    padding: 1.25rem;
  }
  @media (min-width: 1024px) {
    padding: 1.5rem;
  }
  background-color: ${props => props.theme.body};
  color: ${props => props.theme.text};
`;

const LogoContainer = styled.div`
  text-align: center;
  @media (min-width: 640px) {
    text-align: left;
  }
`;

const LogoLink = styled.a`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

const LogoImage = styled.img`
  width: 60px;
  height: 60px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: inherit;
  display: flex;
  gap: 0.25rem;
`;

const UserInfoContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 640px) {
    margin-top: 0;
    flex-direction: row;
    align-items: center;
  }
`;

const WelcomeMessage = styled.span`
  color: inherit;
`;

const Score = styled.span`
  font-weight: bold;
  color: ${props => props.theme.primaryColor};
`;

function Navbar({ darkMode, setDarkMode }) {
  const userInfo = useSelector(state => state.user.userInfo);
  const userName = userInfo ? userInfo.name : '';

  console.log('userInfo:', userInfo); // Check console for userInfo structure

  return (
    <Nav>
      <div className="sm:flex sm:items-center sm:justify-between">
        <LogoContainer>
          <LogoLink href="/">
            <LogoImage src="/quizSpark_icon.png" alt="" />
            <Title>
              Quiz <span>Spark</span>
            </Title>
          </LogoLink>
        </LogoContainer>

        <UserInfoContainer>
          {userInfo ? (
            <div className="flex gap-2">
              <WelcomeMessage>Welcome: {userName}</WelcomeMessage>
              <Score>{userInfo.score} XP</Score>
            </div>
          ) : (
            <div className="flex gap-2">
              <WelcomeMessage>Welcome, Guest</WelcomeMessage>
            </div>
          )}
        </UserInfoContainer>
      </div>
    </Nav>
  );
}

export default Navbar;
