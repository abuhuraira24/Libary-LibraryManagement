import React, { useState, useEffect, useContext } from "react";

import { useParams } from "react-router-dom";

import { CommentBox, Button, CommentInput, Form } from "../Post/CartStyles";

import { gql, useQuery, useMutation } from "@apollo/client";

import io from "socket.io-client";

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

import { Avatar } from "../Helper/helper";

import CommentBar from "../commentInput/CommentInput";

import { CommentsArea, UserPic, CircleImage } from "../Post/CartStyles";

import getAvatar from "../../hooks/useAvatar";

let socket;

const PostDetails = () => {
  // Commet value
  const [post, setPost] = useState(null);

  let [image, setImage] = useState(null);

  const { getComments, comments, user } = useContext(AuthContext);
  const postId = useParams().id;

  // const { data } = useQuery(FETCH_POST, {
  //   variables: {
  //     postId,
  //   },
  // });

  // Query User avata or data

  useQuery(GET_USER_PIC, {
    onCompleted: (data) => {
      const { images } = getAvatar(data);
      setImage(images);
    },
  });

  // Get single post
  useQuery(GET_POST, {
    onCompleted: (data) => {
      console.log(data.getSinglePost);
      setPost(data.getSinglePost);
    },
    variables: {
      postId: postId,
    },
  });

  useQuery(GET_COMMENTS, {
    onCompleted: (data) => {
      getComments(data.getSinglePost.comments);
    },
    variables: {
      postId: postId,
    },
  });

  let avatar = Avatar(post && post.userId);

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
                <H5>{post && post.firstName + " " + post.lastName}</H5>
                <Span>{post && moment(post.createdAt).fromNow(true)}</Span>
              </AuthorName>
            </UserProfile>
            {/* <PostTitle>{typeof post !== "undefined" && post.title}</PostTitle> */}
            <PostBody>
              <P>{post && post.body}</P>
            </PostBody>
            <Comments>
              {/* <h2>
                Discussion (
                {comments && typeof comments !== "undefined" && comments.length}
                )
              </h2> */}
              {/* <CommentBox>
                <Form>
                  {!user && (
                    <CommentInput
                      type="body"
                      disabled
                      placeholder="Write an answere..."
                      name="body"
                      value={value.body}
                    />
                  )}
                  {user && (
                    <CommentInput
                      type="body"
                      placeholder="Write an answere..."
                      name="body"
                      value={value.body}
                    />
                  )}

                  <Button type="submit"></Button>
                </Form>
              </CommentBox> */}

              {/* <CommentBar postId={postId} /> */}
              <CommentsArea>
                <UserPic>
                  {image && image.avatar && (
                    <CircleImage src={image.avatar} alt="user" />
                  )}
                </UserPic>
                <CommentBar postId={postId} />
              </CommentsArea>

              {/* {comments &&
                typeof comments !== "undefined" &&
                comments.map((itm, index) => (
                  <SingleComment key={index} data={itm} />
                ))} */}
              {comments?.map((c, index) => (
                <SingleComment key={index} c={c} />
              ))}
            </Comments>
          </Col>
          <Col w="30" sm="100">
            {/* <Profile
              // data={post}
              avata={typeof avatar !== "function" && avatar}
            /> */}
            {/* {typeof avatar !== "function" && (
              <Profile
                // data={post}
                avata={typeof avatar !== "function" && avatar}
              />
            )} */}
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

const GET_POST = gql`
  query ($postId: ID!) {
    getSinglePost(postId: $postId) {
      userId
      firstName
      lastName
      avatar
      body
      createdAt
    }
  }
`;

const GET_COMMENTS = gql`
  query ($postId: ID!) {
    getSinglePost(postId: $postId) {
      comments {
        body
        userId
        username
        createdAt
      }
    }
  }
`;
const GET_USER_PIC = gql`
  query {
    getUser {
      avatar
      cover
    }
  }
`;
export default PostDetails;
