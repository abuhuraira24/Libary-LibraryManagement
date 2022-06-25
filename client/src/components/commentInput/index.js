import { useState } from "react";

import { gql, useQuery, useMutation } from "@apollo/client";

import { useNavigate, useParams } from "react-router-dom";

import { Comment, CommentBox, Form, Button } from "../Post/CartStyles";

const CommentInput = () => {
  const [value, setValues] = useState({
    body: "",
  });

  const postId = useParams().id;

  const [addComment, { loading }] = useMutation(COMMENTS, {
    update(_, result) {
      console.log(result);
    },
    onError(error) {
      console.log(error);
    },
    variables: postId,
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
  };

  return (
    <CommentBox>
      <Form>
        <CommentInput
          type="body"
          placeholder="Write an answere..."
          name="body"
          // onChange={changeHandler}
        />
        <Button type="submit"></Button>
      </Form>
    </CommentBox>
  );
};

const COMMENTS = gql`
  mutation createComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      comments {
        body
        username
        createdAt
        author
      }
    }
  }
`;

export default CommentInput;
