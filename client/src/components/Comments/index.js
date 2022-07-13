import { gql, useQuery } from "@apollo/client";

import {
  CommentBody,
  CommentWrapper,
  UserImage,
  Image,
  TimeLine,
  Span,
  Like,
  Wrapper,
  P,
  Name,
  Picture,
  Author,
} from "./CommentsStyles";

import { AuthContext } from "../../context/auth";

import { useContext } from "react";

import moment from "moment";

import { Avatar } from "../Helper/helper";

import { getCommnetAvatar } from "../Helper/helper";
const SingleComment = ({ c }) => {
  // const { user } = useContext(AuthContext);

  // let avatar = Avatar(dataa.data.userId);
  useQuery(GET_USER, {
    onCompleted: (data) => {
      getCommnetAvatar(c.userId, data.getUsers);
    },
  });

  return (
    <Wrapper>
      <CommentWrapper>
        <UserImage>
          <Image>
            {/* <Picture src={avatar} alt="abu" /> */}
            img
          </Image>
        </UserImage>
        <CommentBody>
          <P>
            <Name>
              {c.username}
              <Author>{c.author === "true" && "author"}</Author>
              authot
            </Name>
            {c.body}
            body text
          </P>
          <TimeLine>
            <Like>
              <Span>{moment(c.createdAt).fromNow(true)}</Span>
              titme
            </Like>
          </TimeLine>
        </CommentBody>
      </CommentWrapper>
    </Wrapper>
  );
};

const GET_USER = gql`
  query {
    getUsers {
      id
      avatars
    }
  }
`;

export default SingleComment;
