import styled from "styled-components";

export const Comments = styled.div`
  margin-top: 2rem;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
`;

export const LikeComments = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;
`;
export const SaveRead = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`;
export const Like = styled.div`
  cursor: pointer;
  i {
    font-size: 22px;
    height: 21px;
    color: ${(props) => (props.liked ? "#2c51ca" : props.theme.color)};
    cursor: pointer;
  }
`;

export const Comment = styled.div`
  svg {
    color: black;
    font-size: 75px;
    height: 21px;
    fill: #2c51ca;
    cursor: pointer;
  }
`;

export const Span = styled.span`
  margin-left: 8px;
  color: ${(props) => props.theme.color};
`;

export const CommentBox = styled.div`
  margin: 1rem 0;
`;

export const Form = styled.form``;

export const CommentInput = styled.input`
  background: ${(props) => props.theme.gray};
  border: none;
  border-radius: 50px;
  height: 50px;
`;

export const Button = styled.button`
  display: none;
`;
export const Card = styled.div``;

export const CardBody = styled.div`
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background: ${(props) => props.theme.gray};
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
`;

export const UserName = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 40px;
  color: ${(props) => props.theme.color};
`;

export const CardTitle = styled.div`
  font-weight: 700;
  font-size: 30px;
  a {
    color: ${(props) => props.theme.color};
  }
`;

export const CardSubtitle = styled.h6`
  color: ${(props) => props.theme.color} !important;
`;
export const CircleImage = styled.img`
  width: 100%;
`;

export const UserPic = styled.div`
  background: #ddd;
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-right: 1rem;
  overflow: hidden;
`;
