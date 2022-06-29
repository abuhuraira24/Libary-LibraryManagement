import { useContext, useState, useEffect } from "react";

import { gql, useQuery, useLazyQuery } from "@apollo/client";

import Post from "./Post";

import { Card, Load, LoadMore } from "./CartStyles";

import { AuthContext } from "../../context/auth";

import Loading from "../Loading";

const PostCart = () => {
  const [values, setValues] = useState({
    limit: 5,
    offset: 0,
  });

  const [posts, setPosts] = useState();

  // Fetch post data
  const { data } = useQuery(FETCH_POST);

  // Lazy Query
  let [getDog, { loading }] = useLazyQuery(FETCH_POSTT, {
    onCompleted: (data) => {
      setPosts({
        ...posts,
        data: data.infinitePost,
      });
      // setValues({
      //   ...values,
      //   limit: values.limit + 1,
      // });
    },

    variables: {
      ...values,
      values,
    },
  });

  useEffect(() => {
    getDog();
  }, [getDog]);

  let morePost = () => {
    setValues({
      ...values,
      limit: values.limit + 2,
    });
    getDog();
  };

  return !posts ? (
    <Loading />
  ) : (
    <div className="i">
      <Card className="mb-4">
        {posts &&
          typeof posts !== "undefined" &&
          Object.keys(posts).length !== 0 &&
          posts.data.map((post, index) => {
            return <Post key={index} data={post} />;
          })}
      </Card>
      <LoadMore>
        <Load onClick={morePost}>See more post</Load>
      </LoadMore>
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

const FETCH_POSTT = gql`
  query ($limit: Int!, $offset: Int!) {
    infinitePost(limit: $limit, offset: $offset) {
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
