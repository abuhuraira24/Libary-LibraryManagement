import styled from "styled-components";

export const Comments = styled.div`
  margin-top: 2rem;
  border-top: 1px solid #ddd ;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
`;

export const LikeComments = styled.div`
 width: 50%;
 display: flex;
 justify-content: space-around;

`
export const SaveRead = styled.div`
 width: 50%;
 display: flex;
 justify-content: center;
`
export const Like = styled.div`
cursor: pointer;
 i{
   font-size : 22px;
    height: 21px;
    color: ${(props) => props.liked ? "#2c51ca": "#212529"};
    cursor: pointer;
 }
`

export const Comment = styled.div`
  svg{
    color: black;
    font-size: 75px;
    height: 21px;
    fill: #2c51ca;
    cursor: pointer;
  }
`

export const Span = styled.span`
 margin-left: 8px;
`

export const CommentBox = styled.div`
 margin: 1rem 0;
`;

export const Form = styled.form``

export const CommentInput = styled.input`
    background: #f0f2f5;
    border: none;
    border-radius: 50px;
    height: 50px;
`

export const Button = styled.button`
 display: none;
`;
export const Card = styled.div`


`

export const CardBody = styled.div`
    padding: 1rem;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: 0.25rem;
`