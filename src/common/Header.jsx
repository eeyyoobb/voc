import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdKeyboardArrowDown, MdMenu, MdBrightness4 } from "react-icons/md";
import { images } from '../constants';
import { logout } from "../store/actions/user";

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const navigateAndClose = (path) => {
    setProfileDropdown(false);
    setMobileMenuOpen(false);
    navigate(path);
  };

  const logoutHandler = () => {
    dispatch(logout());
    setProfileDropdown(false);
    setMobileMenuOpen(false);
  };

  return (
    <Container>
      <Background blur={darkMode ? "blur(10px)" : "none"} />
      <Wrapper>
        <Logo>
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <img src={images.Voc} alt="Logo" />
          </NavLink>
        </Logo>
        <NavLinks className={mobileMenuOpen ? 'open' : ''}>
          <StyledNavLink to="/" onClick={() => setMobileMenuOpen(false)} end>
            Home
          </StyledNavLink>
          <StyledNavLink to="/blog" onClick={() => setMobileMenuOpen(false)}>
            Blog
          </StyledNavLink>
          <StyledNavLink to="/tube" onClick={() => setMobileMenuOpen(false)}>
            Tube
          </StyledNavLink>
          <StyledNavLink to="/quiz" onClick={() => setMobileMenuOpen(false)}>
            Quiz
          </StyledNavLink>
          <StyledNavLink to="/book" onClick={() => setMobileMenuOpen(false)}>
            Library
          </StyledNavLink>
        </NavLinks>
        {userInfo ? (
          <User>
          <Avatar src={userInfo.img} />
          {userInfo.name.includes(' ') ? userInfo.name.split(' ')[0] : userInfo.name}
          <ProfileGroup>
            <AccountButton
              onClick={() => setProfileDropdown(!profileDropdown)}
              aria-expanded={profileDropdown}
            >
             <MdKeyboardArrowDown />
            </AccountButton>
            <ProfileDropdown className={profileDropdown ? 'showDropdown' : ''}>
              <DropdownMenu>
                {userInfo.admin && (
                  <DropdownItem onClick={() => navigateAndClose("/admin")}>
                    Admin Dashboard
                  </DropdownItem>
                )}
                <DropdownItem onClick={() => navigateAndClose("/profile")}>
                  Profile Page
                </DropdownItem>
                <DropdownItem onClick={logoutHandler}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </ProfileDropdown>
          </ProfileGroup>
        </User>       
        ) : (
          <Button
            onClick={() => navigateAndClose("/login")}
          >
            Sign in
          </Button>
        )}
        <IconWrapper>
          <MdBrightness4 onClick={() => setDarkMode(!darkMode)} />
        </IconWrapper>
        <MenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <MdMenu />
        </MenuButton>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgblur};
  height: 46px;
  z-index: 100;
  width: 100%;
  transition: 0.3s ease-in-out;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);  
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.bg};
  filter: blur(100px); 
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
  position: relative;
  transition: padding 0.3s ease-in-out, background 0.3s ease-in-out;  /* Add transitions */
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  width: 60px;

  img {
    width: 100%;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 120px;
  color: ${({ theme }) => theme.text};

  a {
    color: ${({ theme }) => theme.text};
    font-weight: 500;
    text-decoration: none;
    position: relative;

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
  }

  @media (max-width: 768px) {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 56px;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.bgLighter};
    padding: 10px 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    &.open {
      display: flex;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  text-decoration: none;
  position: relative;

  &.active {
    color: #F97300;

    &::after {
      content: "";
      width: 30%;
      height: 2px;
      background: #F97300;
      position: absolute;
      bottom: -2px;
      left: 2px;
    }
  }

  &:hover {
    color: #17cf97;
  }

  &:hover::after {
    content: "";
    width: 30%;
    height: 2px;
    background: #17cf97;
    position: absolute;
    bottom: -2px;
    left: 2px;
  }
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  position: relative;
  margin-right:-240px;
   
    @media (max-width: 768px) {
    margin-right:0px;
  }
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const ProfileGroup = styled.div`
  position: relative;
`;

const AccountButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right:5px;
`;

const ProfileDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.textSoft};
  border-radius: 5px;
  margin-top: 10px;
  display: none;

  &.showDropdown {
    display: block;
  }
`;

const DropdownMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DropdownItem = styled.button`
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  padding: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};

  &:hover {
    background: ${({ theme }) => theme.soft};
  }
`;

const IconWrapper = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 24px;

  @media (max-width: 768px) {
    display: block;
  }
`;
