// TODO: Create Context or initialState

// TODO: Create Reducer

// TODO: Create Provider

import React, { createContext, useReducer } from "react";

import jwtDecode from "jwt-decode";

const AuthContext = createContext({
  user: null,
  comments: null,
  likes: null,
  posts: null,
  login: (userData) => {},
  logout: () => {},
  queryText: (text, navigate, createSearchParams) => {},
  getComments: (data) => {},
  getLikes: (data) => {},
  getPosts: (data) => {},
  getNotification: (data) => {},
  getRealTimeNoti: (data) => {},
});

const init = {
  user: null,
  searchText: null,
  comments: null,
  posts: null,
  notification: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    init.user = decodedToken;
    init.authenticate = true;
  }
}

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "QUERY":
      return {
        searchText: action.payload.text,
      };

    case "GET_COMMENTS":
      return {
        ...state,
        comments: action.payload,
        commentLoading: false,
      };

    case "GET_LIKES":
      return {
        ...state,
        likes: action.payload,
      };

    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload.posts,
      };
    case "GET_NOTI":
      return {
        ...state,
        notification: action.payload,
      };

    case "GET_REAL_TIME_NOTI":
      return {
        ...state,
        notification: action.payload,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, init);

  const login = (userData) => {
    localStorage.setItem("jwtToken", userData);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGIN" });
  };

  const queryText = (text, navigate, createSearchParams) => {
    if (text) {
      const textt = text.toLowerCase();

      init.searchText = textt;
      dispatch({
        type: "QUERY",
        payload: textt,
      });
      if (typeof text !== "undefined") {
        // navigate(`/search/${textt}`)
        navigate({
          pathname: "search",
          search: `?${createSearchParams({
            q: textt,
          })}`,
        });
      }
    }
  };

  const comLoading = () => {
    dispatch({
      type: "COM_LOAD",
    });
  };
  const getComments = (data) => {
    if (data) {
      dispatch({
        type: "GET_COMMENTS",
        payload: data,
      });
    }
  };

  const getLikes = (data) => {
    dispatch({
      type: "GET_LIKES",
      payload: data,
    });
  };

  const getPosts = (data) => {
    dispatch({
      type: "GET_POSTS",
      payload: {
        posts: data,
      },
    });
  };

  const getNotification = (data) => {
    dispatch({
      type: "GET_NOTI",
      payload: data,
    });
  };
  const getRealTimeNoti = (data) => {
    dispatch({
      type: "GET_REAL_TIME_NOTI",
      payload: data,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        getComments,
        comLoading,
        comments: state.comments,
        logout,
        queryText,
        getNotification,
        getRealTimeNoti,
        searchText: state.searchText,
        getLikes,
        likes: state.likes,
        getPosts,
        posts: state.posts,
        notification: state.notification,
      }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
