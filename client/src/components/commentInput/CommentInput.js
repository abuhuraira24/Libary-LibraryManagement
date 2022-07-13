import { useState, useContext } from "react";

import { CommentBox, Button, CommentInput, Form } from "../Post/CartStyles";

import { AuthContext } from "../../context/auth";

import socket from "../../hooks/socketio";

const CommentBar = () => {
  // Commet value
  const [value, setValues] = useState({
    body: "",
  });

  const { user } = useContext(AuthContext);

  const changeHandler = (e) => {
    setValues({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();

    setValues({
      body: "",
    });
  };
  return (
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
            autocomplete="nope"
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
  );
};

export default CommentBar;
