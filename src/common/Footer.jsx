import React from 'react';
import { AiOutlineTwitter, AiFillYoutube, AiFillInstagram } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import { BsTelegram } from 'react-icons/bs';
import { images } from '../constants';
import styled from 'styled-components';

const Footer = ({ darkMode }) => {
  return (
    <Container>
      <Sec>
        <Logo>
          <img
            src={darkMode ? images.Voc : images.Vocb}
            alt="logo"
            className="logo"
          />
          <p>Jesus is the Son of the living God!</p>
        </Logo>
        <StyledUl>
          <li>
            <StyledLink href="https://t.me/dawitfassil">
              <AiOutlineTwitter className="icon" /> Twitter
            </StyledLink>
          </li>
          <li>
            <StyledLink href="https://www.youtube.com/@voiceofchristian">
              <AiFillYoutube className="icon" /> Youtube
            </StyledLink>
          </li>
          <li>
            <StyledLink href="https://www.facebook.com/p/Dawit-Fassil-Ministry-100064395113270/">
              <FaFacebook className="icon" /> Facebook
            </StyledLink>
          </li>
          <li>
            <StyledLink href="/">
              <BsTelegram className="icon" /> Telegram
            </StyledLink>
          </li>
          <li>
            <StyledLink href="https://t.me/dawitfassil">
              <AiFillInstagram className="icon" /> Instagram
            </StyledLink>
          </li>
        </StyledUl>
      </Sec>
    </Container>
  );
};

export default Footer;

const Container = styled.section`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
`;

const Sec = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  padding: 10px 5px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: auto 1fr; /* Adjusted grid columns for responsiveness */
    padding: 20px 10px;
    align-items: center;
  }
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    justify-content: flex-start;
    margin-right: 10px;
    margin-bottom: 0;
  }

  @media (max-width: 767px) {
    align-self: flex-start;
    margin-top: 15px;
  }

  img {
    width: 80px;
  }

  p {
    text-align: center;
    font-size: 14px;
    margin-top: 10px;

    @media (min-width: 768px) {
      text-align: left;
      font-size: 16px;
      margin-top: 0;
    }

    @media (max-width: 767px) {
      display: none; /* Hide the <p> element on small screens */
    }
  }
`;

const ulStyles = `
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  padding: 0;
  margin-top: 10px;

  @media (min-width: 768px) {
    flex-direction: row; /* Align items in a row on larger screens */
    justify-content: flex-start;
    margin-top: 0;
    gap: 10px; /* Adjust the gap between items */
    flex-wrap: unwrap; /* Ensure items wrap on smaller screens */
  }

  li {
    display: flex;
    align-items: center;
    margin-right: 10px;
    flex-wrap: unwrap;

    &:last-child {
      margin-right: 0;
    }

    .icon {
      margin-right: 5px;
    }
  }
`;

const StyledUl = styled.ul`
  ${ulStyles}
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.textSoft};
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #F97300;
  }

  &:hover::after {
    content: "";
    width: 30%;
    height: 2px;
    background: #F97300;
    position: absolute;
    bottom: -2px;
    left: 2px;
  }
`;
