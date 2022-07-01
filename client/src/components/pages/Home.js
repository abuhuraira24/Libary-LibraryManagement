import { useEffect, useState } from "react";

import Posts from "../Post";

import { Container, Row, Col } from "../../Styles/ElementsStyles";
import { PostWrapper } from "./styles";

import Profile from "../Home/Profile";

import CreatePost from "../CreatePosts";

import Follower from "../Home/Followers";

import socket from "../../hooks/socketio";

// import io from "socket.io-client";
// let socket;
const Home = () => {
  // let [value, setValue] = useState("Hello Abu");

  // useEffect(() => {
  //   socket = io("http://localhost:5000/");

  //   socket.emit("addcomment", value);

  //   socket.on("sendComment", (data) => {
  //     console.log(data);
  //   });
  // }, [value]);

  useEffect(() => {
    socket.on("getMessage", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <PostWrapper>
      <Container>
        <Row>
          <Col w="25" md="30" none="true">
            <Profile />
          </Col>
          <Col w="50" md="40" sm="100">
            <CreatePost />

            <Posts />
          </Col>
          <Col w="25" md="30" none="true">
            <Follower />
          </Col>
        </Row>
      </Container>
    </PostWrapper>
  );
};

// const FETCH_POST = gql`
//   query ($limit: Int!, $offset: Int!) {
//     infinitePost(limit: $limit, offset: $offset) {
//       body
//     }
//   }
// `;

export default Home;
