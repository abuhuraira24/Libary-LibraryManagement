import { useContext, useState } from "react";

import { Container, Row, Col, CardText } from "reactstrap";

import { gql, useQuery } from "@apollo/client";

import { NavLink } from "react-router-dom";

import moment from "moment";

import Post from "./Post";

import { Card } from "./CartStyles";

import { AuthContext } from "../../context/auth";

import Loading from "../Loading";

const PostCart = () => {
  const { user } = useContext(AuthContext);

  // Fetch post data
  const { data } = useQuery(FETCH_POST);

  // Fetch all User

  // useQuery(FET_ALL_USERS, {
  //   onCompleted: (data) => {
  //     setUsers(data.getUsers);
  //   },
  // });

  return !data ? (
    <Loading />
  ) : (
    <div className="posts">
      <Container>
        <Row>
          <Col className="col-12 mb-4">
            <Card>
              {data &&
                Object.keys(data.getPosts).length > 0 &&
                data.getPosts.map((post, index) => {
                  return <Post key={index} data={post} />;
                })}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const FETCH_POST = gql`
  query {
    getPosts {
      title
      avatar
      firstName
      userId
      lastName
      _id
      body
      comments {
        username
        body
        createdAt
      }
      likes {
        userId
        createdAt
      }
      readTime
      createdAt
    }
  }
`;

export default PostCart;
