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
} from "./CommentsStyles";

import moment from "moment";

const SingleComment = (dataa) => {
  const { data } = useQuery(GET_USER_DATA);

  return (
    <Wrapper>
      <CommentWrapper>
        <UserImage>
          <Image>
            <Picture src={dataa.data.avatar} alt="abu" />
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
            </svg> */}
          </Image>
        </UserImage>
        <CommentBody>
          <P>
            <Name>{dataa.data.username}</Name>
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

const GET_USER_DATA = gql`
  query {
    getUser {
      avatar
      createdAt
    }
  }
`;

export default SingleComment;
