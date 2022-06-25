import { gql, useQuery } from "@apollo/client";

import Popup from "./Popup";

import { Avatar, FakeInput, Img, PostWrapper, Span, Wrapper } from "./styles";

const CreatePost = () => {
  let { data } = useQuery(GET_USER);

  return (
    <Wrapper>
      <PostWrapper>
        <Avatar>
          {data && typeof data.getUser !== "undefined" && (
            <Img src={data.getUser.avatar} alt="user" />
          )}
        </Avatar>
        <FakeInput>
          <Popup>
            <Span>What's on your mind? </Span>
          </Popup>
        </FakeInput>
      </PostWrapper>
    </Wrapper>
  );
};
const GET_USER = gql`
  query {
    getUser {
      avatar
      cover
    }
  }
`;
export default CreatePost;
