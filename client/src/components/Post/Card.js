import { useContext, useState } from "react";

import { CardText } from "reactstrap";

import { Container, Row, Col } from "../../Styles/ElementsStyles";

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

  return !data ? (
    <Loading />
  ) : (
    <div className="i">
      <Card className="mb-4">
        {data &&
          Object.keys(data.getPosts).length > 0 &&
          data.getPosts.map((post, index) => {
            return <Post key={index} data={post} />;
          })}
      </Card>
    </div>
  );
};

const FETCH_POST = gql`
  query {
    getPosts {
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
