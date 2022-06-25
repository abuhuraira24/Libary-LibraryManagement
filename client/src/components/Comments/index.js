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

import Avatar from "../Helper/helper";

const SingleComment = (dataa) => {
  const { user } = useContext(AuthContext);

  let avatar = Avatar(dataa.data.userId);

  return (
    <Wrapper>
      <CommentWrapper>
        <UserImage>
          <Image>
            <Picture src={avatar} alt="abu" />
          </Image>
        </UserImage>
        <CommentBody>
          <P>
            <Name>
              {dataa.data.username}
              <Author>{dataa.data.author === "true" && "author"}</Author>
            </Name>
            {dataa.data.body}
          </P>
          <TimeLine>
            <Like>
              <Span>{moment(dataa.data.createdAt).fromNow(true)}</Span>
            </Like>
          </TimeLine>
        </CommentBody>
      </CommentWrapper>
    </Wrapper>
  );
};

export default SingleComment;
