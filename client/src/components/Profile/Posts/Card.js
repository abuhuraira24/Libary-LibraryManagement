import { useContext, useState, useEffect } from "react";

import { gql, useQuery, useLazyQuery } from "@apollo/client";

import Post from "./Post";

import { Card, Load, LoadMore } from "./CartStyles";

import { AuthContext } from "../../../context/auth";
import { useParams } from "react-router-dom";

const PostCart = () => {
  const [values, setValues] = useState({
    limit: 10,
    offset: 0,
  });

  const [allPost, setPosts] = useState();

  let userParams = useParams();

  let { getPosts, posts, user } = useContext(AuthContext);

  // Lazy Query
  let [getDog, { loading }] = useLazyQuery(FETCH_POSTT, {
    onCompleted: (data) => {
      getPosts(data.infinitePost);
    },

    variables: {
      ...values,
      values,
    },
  });

  useEffect(() => {
    getDog();
  }, [getDog]);

  const morePost = () => {
    setValues({
      ...values,
      limit: values.limit + 1,
    });
    getDog();
  };

  return (
    <div className="i">
      <Card className="mb-4">
        {posts &&
          typeof posts !== "undefined" &&
          Object.keys(posts).length !== 0 &&
          posts.map(
            (post, index) =>
              post.userId === userParams.id && <Post key={index} data={post} />
          )}
      </Card>
      {posts && typeof posts !== "undefined" && posts.length > 9 && (
        <LoadMore>
          <Load type="button" onClick={morePost}>
            See more post
          </Load>
        </LoadMore>
      )}
    </div>
  );
};

// const FETCH_POST = gql`
//   query {
//     getPosts {
//       firstName
//       userId
//       lastName
//       _id
//       body
//       comments {
//         username
//         body
//         createdAt
//       }
//       likes {
//         userId
//         createdAt
//       }
//       readTime
//       createdAt
//     }
//   }
// `;

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
        userId
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