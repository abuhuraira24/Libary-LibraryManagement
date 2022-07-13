import React, { useContext, useState, useEffect } from "react";

import "../Sidebar/index.scss";

import { useNavigate, createSearchParams } from "react-router-dom";

import { AuthContext } from "../../context/auth";

import { NavLink } from "react-router-dom";

import Notification from "../Notifications";

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
  HeaderItem,
} from "./NavbarElements";

import { gql, useQuery } from "@apollo/client";

import logo from "../Navbar/logo.png";

import socket from "../../hooks/socketio";

import useAvatar from "../../hooks/useAvatar";

import notiHook from "../../hooks/userNotification";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // Toggler
  const [isToggle, setToggle] = useState(false);

  // Stickey Hader
  const [sticky, setSticky] = useState(false);

  // Search query Handler
  const [searchQuery, setQuery] = useState("");

  // Toggler Notification
  const [toggleNoti, setToggleNoti] = useState(false);

  // Smal Device Handle
  const [smallDevice, setSmallDevice] = useState(false);

  // Set Notifications
  const [realtTimeNoti, setRealTime] = useState([]);

  // Get Notification
  const [notifications, setNotifications] = useState([]);

  const { user, logout, notification, getRealTimeNoti } =
    useContext(AuthContext);
  let noti = useQuery(GET_NOTIFICATIONS, {
    onCompleted: (data) => {
      if (data) {
        // console.log(data.notifications);
        setNotifications(...notifications, data.notifications);
      }
      // if (data && notifications) {
      //   getNotification(data.notifications);
      // }
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   socket.on("getNotification", (data) => {
  //     // setRealTime({ ...realtTimeNoti.data }, data);
  //     // getRealTimeNoti(data);
  //     console.log(data);
  //   });
  // }, []);

  // Query User avata or data

  const { data } = useQuery(GET_USER_PIC);

  const { images } = useAvatar(data);

  const isOpen = () => {
    setOpen(true);
  };
  const isClose = () => {
    setOpen(false);
  };

  // User account Toggler
  const toggle = () => {
    if (isToggle) {
      setToggle(false);
    } else {
      setToggle(true);
      setToggleNoti(false);
    }
  };

  // Notification Toggler

  const notificationToggler = () => {
    if (toggleNoti) {
      setToggleNoti(false);
    } else {
      setToggleNoti(true);
      setToggle(false);
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
              <Count>1</Count>
              {/* <i class="fa-solid fa-message"></i> */}
              <Iconn className="fa-solid fa-message"></Iconn>
            </Icons>
            <HeaderItem>
              <Icons onClick={notificationToggler}>
                <Count>1</Count>
                <Iconn className="fa-solid fa-bell"></Iconn>
              </Icons>
              {toggleNoti && (
                <Notification
                  // realtTimeNoti={realtTimeNoti}
                  notification={noti.data ? noti : []}
                />
              )}
            </HeaderItem>

            {user && (
              <>
                <SmallAccount onClick={toggle}>
                  <Avatar>
                    {images.avatar && (
                      <NavAvatar src={images.avatar} alt="user" />
                    )}
                    {/* <i class="fa-solid fa-user"></i> */}
                    {!images.avatar && (
                      <UserIconn className="fa-solid fa-user"></UserIconn>
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
              <span onClick={isClose}>
                <i class="fa-solid fa-xmark"></i>
              </span>
            ) : (
              <span onClick={isOpen}>
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
      cover
    }
  }
`;

const GET_NOTIFICATIONS = gql`
  query {
    notifications {
      name
      text
      avatar
      createdAt
    }
  }
`;

export default Navbar;
