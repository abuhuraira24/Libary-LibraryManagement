import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";

import { Button, Buttons } from "./PopupStyles";

import { AuthContext } from "../../context/auth";

const DeletePost = ({ postId, closeModal }) => {
  const navigate = useNavigate();

  const { getPosts } = useContext(AuthContext);

  const [deletePost, { loading }] = useMutation(DELETE, {
    onCompleted: (data) => {
      console.log(data.deletePost);

      getPosts(data.deletePost);
      closeModal();
      navigate("/");
    },
    onError(error) {
      console.log(error);
    },
  });

  const deleteHandler = () => {
    deletePost({ variables: { postId } });
  };

  return (
    <Buttons>
      <Button>No</Button>
      <Button onClick={deleteHandler}>Yes</Button>
    </Buttons>
  );
};

const DELETE = gql`
  mutation ($postId: ID!) {
    deletePost(postId: $postId) {
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
export default DeletePost;
