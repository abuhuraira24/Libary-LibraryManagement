import { useContext, useEffect, useState } from "react";

import { gql, useMutation } from "@apollo/client";

import { Like, Span } from "../Post/CartStyles";

import { AuthContext } from "../../context/auth";

import socket from "../../hooks/socketio";

const LikeButton = ({ postId, likes, userId }) => {
  const [liked, setLiked] = useState(false);

  const { getLikes, user } = useContext(AuthContext);

  useEffect(() => {
    if (user && likes.find((like) => like.userId === user.id)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [addLike, { loading }] = useMutation(LIKE_POST, {
    update(_, result) {},
    variables: { postId },
  });

  const likeHandler = (id) => {
    addLike();

    if (userId) {
      socket.emit("sendNotification", { resiverId: userId, text: "Welcome" });
    }
  };

  return (
    <Like onClick={likeHandler} liked={liked}>
      <i className="fa-solid fa-thumbs-up"></i>
      <Span>
        {likes.length + " "}

        {liked ? "like" : "like"}
      </Span>
    </Like>
  );
};

const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      _id
      likes {
        createdAt
        userId
      }
    }
  }
`;

export default LikeButton;
