import { useContext, useState } from "react";

import { gql, useQuery } from "@apollo/client";
import {
  Comments,
  LikeComments,
  Comment,
  SaveRead,
  Span,
  Card,
  CardBody,
  UserName,
  CardTitle,
  CardSubtitle,
  CircleImage,
  UserPic,
  More,
} from "./CartStyles";

import LikeButton from "../LikeButton";

import Popup from "../Popup/Popup";

import { NavLink } from "react-router-dom";

import { CardText } from "reactstrap";

import moment from "moment";

import { AuthContext } from "../../context/auth";

import Avatar from "../Helper/helper";

const Post = ({ ...props }) => {
  const { user } = useContext(AuthContext);

  let { data } = props;

  let avatar = Avatar(data.userId);

  let sortText;
  let text;

  if (data.body.length > 400) {
    sortText = data.body.slice(0, 400);
  } else {
    text = data.body;
  }

  return (
    <CardBody className="mb-4 ">
      <div>
        <div className="users">
          <UserPic>
            {typeof avatar !== "function" && (
              <CircleImage src={avatar} alt="user" />
            )}
          </UserPic>

          <UserName>{data.firstName + " " + data.lastName}</UserName>
        </div>
      </div>
      <CardSubtitle
        className="mb-2 mt-2 text-muted border-bottom pb-1"
        tag="h6"
      >
        {moment(data.createdAt).fromNow(true)}
      </CardSubtitle>
      {/* <CardTitle>
        <NavLink to={`/post/${data._id}`}>{data.title}</NavLink>
      </CardTitle> */}
      <CardText id="post">
        {sortText}
        {text}
        {sortText && (
          <More>
            <NavLink to={`/post/${data._id}`}>See more...</NavLink>
          </More>
        )}
      </CardText>

      <Comments>
        <LikeComments>
          {!user && <Popup>{data.likes.length + " "}Like</Popup>}
          {user && <LikeButton likes={data.likes} postId={data._id} />}

          <Comment>
            <NavLink to={`/post/${data._id}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M511.1 63.1v287.1c0 35.25-28.75 63.1-64 63.1h-144l-124.9 93.68c-7.875 5.75-19.12 .0497-19.12-9.7v-83.98h-96c-35.25 0-64-28.75-64-63.1V63.1c0-35.25 28.75-63.1 64-63.1h384C483.2 0 511.1 28.75 511.1 63.1z" />
              </svg>
              <Span> {data.comments.length} comments</Span>
            </NavLink>
          </Comment>
        </LikeComments>
        <SaveRead>
          <CardSubtitle className="text-muted" tag="h6">
            {data.readTime} min read
          </CardSubtitle>
        </SaveRead>
      </Comments>
    </CardBody>
  );
};

const FET_ALL_USERS = gql`
  query {
    getUsers {
      id
      avatars {
        avatar
      }
    }
  }
`;

export default Post;
