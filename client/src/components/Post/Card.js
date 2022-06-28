import { useContext, useState, useEffect } from "react";

import { gql, useQuery, useLazyQuery } from "@apollo/client";

import Post from "./Post";

import { Card } from "./CartStyles";

import { AuthContext } from "../../context/auth";

import Loading from "../Loading";

const PostCart = () => {
  const [values, setValues] = useState({
    limit: 2,
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
  console.log(posts);
  const scrollHandler = () => {
    let heightSize = Math.floor(window.innerHeight);
  };

  useEffect(() => {
    scrollHandler();
  });

  window.addEventListener("scroll", scrollHandler);
  return <p onClick={() => getDog()}>load</p>;
  // return !posts ? (
  //   <Loading />
  // ) : (
  //   <div className="i">
  //     <Card className="mb-4">
  //       {posts &&
  //         typeof posts !== "undefined" &&
  //         Object.keys(posts).length !== 0 &&
  //         posts.map((post, index) => {
  //           return <Post key={index} data={post} />;
  //         })}
  //     </Card>
  //     <p onClick={() => getDog()}>Load</p>
  //   </div>
  // );
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
