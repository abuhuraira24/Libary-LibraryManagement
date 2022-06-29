import React, { useContext, useState, useEffect } from "react";

import "../Sidebar/index.scss";

import { useNavigate, createSearchParams } from "react-router-dom";

import { AuthContext } from "../../context/auth";

import { NavLink } from "react-router-dom";

import {
  Nav,
  NavbarContainer,
  NavbarMenu,
  NavItem,
  NavLogo,
  LargeSearch,
  MenuIcon,
  NavLarge,
  Form,
  Button,
  Icon,
  SmallAccount,
  Ul,
  Li,
  NavAvatar,
  Avatar,
  SearchBar,
  UserIconn,
  LeftBar,
  Logo,
  LogoImg,
  RightMenu,
  Icons,
  Iconn,
  Count,
} from "./NavbarElements";

import { Input } from "../../Styles/ElementsStyles";

import { useTheme } from "styled-components";
import { gql, useQuery } from "@apollo/client";

import logo from "../Navbar/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const [isToggle, setToggle] = useState(false);

  const [sticky, setSticky] = useState(false);

  const [searchQuery, setQuery] = useState("");

  const [smallDevice, setSmallDevice] = useState(false);

  // Query User avata or data

  const { data } = useQuery(GET_USER_PIC);

  const { user, logout } = useContext(AuthContext);

  const isOpen = () => {
    setOpen(true);
  };
  const isClose = () => {
    setOpen(false);
  };

  const toggle = () => {
    if (isToggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
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

  // console.log(
  //   data && data.getUser && data.getUser.avatar === "false"
  //     ? "pictur not available"
  //     : "available"
  // );
  return (
    <NavLarge>
      <Nav issticky={sticky.toString()}>
        <NavbarContainer>
          <Logo>
            <NavLogo issticky={sticky.toString()} to="/">
              <LogoImg src={logo} alt="logo" />
            </NavLogo>
          </Logo>

          <LeftBar>
            <LargeSearch>
              <Form onSubmit={submitHandler}>
                <SearchBar
                  type="search"
                  placeholder="Search"
                  name="text"
                  onChange={changeHandler}
                />
                <Button type="submit">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </Button>
              </Form>
            </LargeSearch>
          </LeftBar>

          <RightMenu>
            <Icons>
              <Count>5</Count>
              {/* <i class="fa-solid fa-message"></i> */}
              <Iconn className="fa-solid fa-message"></Iconn>
            </Icons>
            <Icons>
              <Count>10</Count>
              <Iconn className="fa-solid fa-bell"></Iconn>
            </Icons>
            {user && (
              <>
                <SmallAccount onClick={toggle}>
                  <Avatar>
                    {typeof data !== "undefined" &&
                      typeof data.getUser !== "undefined" &&
                      data.getUser.avatar !== "false" && (
                        // console.log(data.getUser.avatar)
                        <NavAvatar src={data.getUser.avatar} alt="user" />
                      )}
                    {typeof data !== "undefined" &&
                      typeof data.getUser !== "undefined" &&
                      data.getUser.avatar === "false" && (
                        <UserIconn>user</UserIconn>
                      )}
                  </Avatar>
                  {/* <UserIcon className="fa-solid fa-user"></UserIcon> */}
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
              </>
            )}
          </RightMenu>

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
          <NavbarMenu issticky={sticky} toggle={open}>
            <NavItem>
              {user ? (
                ""
              ) : (
                <div className="navmenue">
                  <NavLink to="/register">Create Account</NavLink>
                  <NavLink to="/login" onClick={logout}>
                    {" "}
                    Login{" "}
                  </NavLink>
                </div>
              )}
            </NavItem>
          </NavbarMenu>
        </NavbarContainer>
      </Nav>
    </NavLarge>
  );
};

const GET_USER_PIC = gql`
  query {
    getUser {
      avatar
    }
  }
`;

export default Navbar;
