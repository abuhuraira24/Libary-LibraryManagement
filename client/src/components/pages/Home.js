import { gql, useQuery, useMutation } from "@apollo/client";

import Posts from "../Post";

import { Container, Row, Col } from "../../Styles/ElementsStyles";
import { Left, PostWrapper } from "./styles";

import Profile from "../Home/Profile";

import CreatePost from "../CreatePosts";

import Follower from "../Home/Followers";

const Home = () => {
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

export default Home;
