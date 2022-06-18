import React, { useContext, useState, useEffect } from "react";

import "../Sidebar/index.scss";

import { useNavigate, createSearchParams } from "react-router-dom";

import { AuthContext } from "../../context/auth";

import { NavLink } from "react-router-dom";

import {
  Nav,
  NavbarContainer,
  CreatrAccount,
  NavbarMenu,
  NavItem,
  NavLogo,
  NavSm,
  MenuIcon,
  SearchBar,
  Form,
  SearchInput,
  Button,
  MyAccount,
  UserIcon,
  Icon,
  SmallAccount,
  AccountMneu,
  Logo,
  RightNav,
  SmallForm,
  Ul,
  Li,
} from "./NavbarElements";

const SmallNavbar = () => {
  const [isToggle, setToggle] = useState(false);

  const [open, setOpen] = useState(false);

  const [sticky, setSticky] = useState(false);

  const [searchQuery, setQuery] = useState("");

  const [smallDevice, setSmallDevice] = useState(false);

  const { user, logout, searchText } = useContext(AuthContext);

  const toggle = () => {
    if (isToggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  const isOpen = () => {
    setOpen(true);
  };
  const isClose = () => {
    setOpen(false);
  };

  const isHeaderSticky = () => {
    if (window.scrollY >= 1000) {
      setSticky(true);
    } else if (window.innerWidth < 576) {
      setSmallDevice(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    isHeaderSticky();
  }, []);

  window.addEventListener("scroll", isHeaderSticky);

  const changeHandler = (e) => {
    setQuery({
      ...searchQuery,
      [e.target.name]: e.target.value,
    });
  };
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();

    context.queryText(searchQuery.text, navigate, createSearchParams);
  };

  return (
    <NavSm>
      <Nav issticky={sticky.toString()}>
        <NavbarContainer>
          <Logo>
            <NavLogo issticky={sticky.toString()} to="/">
              .JS
            </NavLogo>
          </Logo>
          <RightNav>
            {user ? (
              <AccountMneu>
                <SmallAccount
                  isToggle={isToggle}
                  className="scrollbar-hidden"
                  onClick={toggle}
                >
                  <UserIcon className="fa-solid fa-user"></UserIcon>
                  <Ul isToggle={isToggle} className="scrollbar-hidden">
                    <Li mone="1" bbottom="true" to={`/profile/${user.id}`}>
                      {user.username}
                    </Li>
                    <Li to="/dashboard">Dashboard</Li>
                    <Li to="/createpost">Create Post</Li>
                    <Li to="/setting">Setting</Li>

                    <Li to="" onClick={logout}>
                      Logout
                    </Li>
                  </Ul>
                </SmallAccount>
              </AccountMneu>
            ) : (
              <>
                <CreatrAccount to="/register">Create Account</CreatrAccount>
              </>
            )}
            <MenuIcon>
              {open ? (
                <span onClick={() => isClose()}>
                  <i class="fa-solid fa-xmark"></i>
                </span>
              ) : (
                <span onClick={() => isOpen()}>
                  <Icon className="fa-solid fa-bars"></Icon>
                </span>
              )}
            </MenuIcon>
          </RightNav>

          {/* Menu */}
          <NavbarMenu issticky={sticky} toggle={open}>
            <NavItem>
              {user ? (
                <>
                  <NavLink to="/account"></NavLink>
                  <NavLink to="" onClick={logout}>
                    {" "}
                    Logout{" "}
                  </NavLink>
                </>
              ) : (
                <NavLink to="/login" onClick={logout}>
                  {" "}
                  Login{" "}
                </NavLink>
              )}
            </NavItem>
          </NavbarMenu>
        </NavbarContainer>

        <NavbarContainer>
          <SmallForm smNav="true" onSubmit={submitHandler}>
            <SearchInput
              type="search"
              placeholder="Search"
              name="text"
              onChange={changeHandler}
            />
            <Button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
          </SmallForm>
        </NavbarContainer>
      </Nav>
    </NavSm>
  );
};

export default SmallNavbar;
