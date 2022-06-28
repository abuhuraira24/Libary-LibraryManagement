import { useContext, useState } from "react";

import { gql, useLazyQuery } from "@apollo/client";

import Posts from "../Post";

import { Container, Row, Col } from "../../Styles/ElementsStyles";
import { Left, PostWrapper } from "./styles";

import Profile from "../Home/Profile";

import CreatePost from "../CreatePosts";

import Follower from "../Home/Followers";

const Home = () => {
  const [values, setValues] = useState({
    limit: 5,
    offset: 0,
  });

  // Lazy Query
  let [getDog, { loading }] = useLazyQuery(FETCH_POST, {
    onCompleted: (data) => {
      console.log(data);
    },
    variables: {
      ...values,
      values,
    },
  });

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

const FETCH_POST = gql`
  query ($limit: Int!, $offset: Int!) {
    infinitePost(limit: $limit, offset: $offset) {
      body
    }
  }
`;

export default Home;
