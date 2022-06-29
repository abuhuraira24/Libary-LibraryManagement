import { useEffect, useState } from "react";

import Posts from "../Post";

import { Container, Row, Col } from "../../Styles/ElementsStyles";
import { PostWrapper } from "./styles";

import Profile from "../Home/Profile";

import CreatePost from "../CreatePosts";

import Follower from "../Home/Followers";

import io from "socket.io-client";

let socket;

const Home = () => {
  let [value, setValue] = useState("Hello Abu");

  useEffect(() => {
    socket = io("http://localhost:5000");

    // Send data client to server
    socket.emit("join", { value });

    // get data server to client
    socket.on("welcome", (data) => {
      setValue(data.message);
    });
  }, [value]);

  console.log(value);
  return (
    <PostWrapper>
      <Container>
        <Row>
          <Col w="25" md="30" none="true">
            <Profile />
          </Col>
          <Col w="50" md="40" sm="100">
            <CreatePost />
            {value}
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
