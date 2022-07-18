import "./App.css";

import NavBar from "./components/Navbar/NavBar";

import Register from "./components/Register/Register";

import { useState, useEffect, useContext } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";

import Login from "./components/Login/Login";

import PublicRouter from "./hooks/PublicRouter";

import { AuthProvider } from "./context/auth";

import QueryPage from "./components/SearchPage/QueryPage";

import People from "./components/People";

import PostDetails from "./components/PostDetails";

import SmallNavbar from "./components/Navbar/SmallNavbar";

import Profile from "./components/Profile/Profile";

import { useTheme } from "styled-components";
import MobileMenu from "./components/Navbar/MobileMenu";

import PrivatRouter from "./hooks/PrivetRouter";

import { AuthContext } from "./context/auth";

import socket from "./hooks/socketio";

import decoder from "jwt-decode";

import PrivateProfile from "./components/Profile/PrivateProfile";

import PublicProfile from "./components/Profile/PublicProfile";

function App() {
  const [user, setUser] = useState();

  const theme = useTheme();

  useEffect(() => {
    const body = document.getElementsByTagName("body");
    body[0].style.backgroundColor = theme.bg;
  });

  useEffect(() => {
    let toke = localStorage.getItem("jwtToken");
    if (toke) {
      let decoded = decoder(toke);
      setUser(decoded);
    }
  }, []);

  useEffect(() => {
    if (user) {
      socket.emit("join", { userId: user.id });
    }
  }, [user]);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivatRouter rediredct="/login">
                <Home />
              </PrivatRouter>
            }
          />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/search" element={<QueryPage />} />
          <Route path="/search/people" element={<People />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/search/post/:id" element={<PostDetails />} />
          {/* <Route path="profile/:id" element={PublicProfile} /> */}
          {/* <Route path="profile/:id" element={PrivateProfile} /> */}
          {/* <Route path='*' element={<NotFound />} /> */}
          <Route
            path="/register"
            element={
              <PublicRouter rediredct="/">
                <Register />
              </PublicRouter>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRouter rediredct="/">
                <Login />
              </PublicRouter>
            }
          />
        </Routes>
        {/* <MobileMenu /> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
