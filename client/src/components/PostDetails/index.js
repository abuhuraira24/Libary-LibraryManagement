import React, { useState, useEffect, useContext } from "react";

import { useParams } from "react-router-dom";

import { CommentBox, Button, CommentInput, Form } from "../Post/CartStyles";

import { gql, useQuery, useMutation } from "@apollo/client";

import {
  AuthorName,
  Comments,
  H5,
  P,
  PostAvatar,
  PostBody,
  PostTitle,
  Span,
  UserImage,
  UserProfile,
  Wrapper,
} from "./Styles";

import { Container, Row, Col } from "../../Styles/ElementsStyles";

import moment from "moment";

import SingleComment from "../Comments";

import { AuthContext } from "../../context/auth";

import Profile from "./Profile";

import Avatar from "../Helper/helper";

const PostDetails = () => {
  // Commet value
  const [value, setValues] = useState({
    body: "",
  });

  const { getComments, comments, user } = useContext(AuthContext);
  const postId = useParams().id;

  const { data } = useQuery(FETCH_POST, {
    variables: {
      postId,
    },
  });

  let post;

  if (data) {
    post = data.getSinglePost;
  }

  useEffect(() => {
    if (post) {
      getComments(post.comments);
    }
    // getComments(post)
  }, [post]);

  const [addComment, { loading }] = useMutation(COMMENTS, {
    update(_, result) {
      getComments(result.data.createComment.comments);
    },
    onError(error) {
      console.log(error);
    },
    variables: {
      ...value,
      postId,
    },
  });

  const changeHandler = (e) => {
    setValues({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addComment();
    setValues({
      body: "",
    });
  };

  let avatar = Avatar(data && data.getSinglePost.userId);

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col w="70" sm="100">
            <UserProfile>
              <UserImage>
                {typeof avatar !== "function" && (
                  <PostAvatar src={avatar} alt="post" />
                )}
              </UserImage>
              <AuthorName>
                <H5>
                  {typeof post !== "undefined" &&
                    post.firstName + " " + post.lastName}
                </H5>
                <Span>
                  {typeof post !== "undefined" &&
                    moment(post.createdAt).fromNow(true)}
                </Span>
              </AuthorName>
            </UserProfile>
            <PostTitle>{typeof post !== "undefined" && post.title}</PostTitle>
            <PostBody>
              <P>{typeof post !== "undefined" && post.body}</P>
            </PostBody>
            <Comments>
              <h2>
                Discussion (
                {comments && typeof comments !== "undefined" && comments.length}
                )
              </h2>
              <CommentBox>
                <Form onSubmit={submitHandler}>
                  {!user && (
                    <CommentInput
                      type="body"
                      disabled
                      placeholder="Write an answere..."
                      name="body"
                      value={value.body}
                      onChange={changeHandler}
                    />
                  )}
                  {user && (
                    <CommentInput
                      type="body"
                      placeholder="Write an answere..."
                      name="body"
                      value={value.body}
                      onChange={changeHandler}
                    />
                  )}

                  <Button type="submit"></Button>
                </Form>
              </CommentBox>

              {comments &&
                typeof comments !== "undefined" &&
                comments.map((itm, index) => (
                  <SingleComment key={index} data={itm} />
                ))}
            </Comments>
          </Col>
          <Col w="30" sm="100">
            {/* <Profile
              data={post}
              avata={typeof avatar !== "function" && avatar}
            /> */}
            {typeof avatar !== "function" && (
              <Profile
                data={post}
                avata={typeof avatar !== "function" && avatar}
              />
            )}
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

const FETCH_POST = gql`
  query ($postId: ID!) {
    getSinglePost(postId: $postId) {
      firstName
      lastName
      avatar
      title
      userId
      body
      createdAt
      comments {
        body
        username
        userId
        avatar
        author
        createdAt
      }
    }
  }
`;

const COMMENTS = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      comments {
        body
        username
        avatar
        userId
        createdAt
        author
      }
    }
  }
`;

export default PostDetails;
