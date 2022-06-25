import { gql, useQuery, useMutation } from "@apollo/client";

import Posts from "../Post";

import { Container, Row, Col } from "../../Styles/ElementsStyles";
import { PostWrapper } from "./styles";

import Profile from "../Home/Profile";

import CreatePost from "../CreatePosts";

import Follower from "../Home/Followers";

const Home = () => {
  return (
    <PostWrapper>
      <Container>
        <Row>
          <Col w="25" sm="100">
            <Profile />
          </Col>
          <Col w="50" sm="100">
            <CreatePost />
            <Posts />
          </Col>
          <Col w="25" sm="100">
            <Follower />
          </Col>
        </Row>
      </Container>
    </PostWrapper>
  );
};

export default Home;
