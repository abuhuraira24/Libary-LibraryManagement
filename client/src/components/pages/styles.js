import styled from "styled-components";

export const PostWrapper = styled.div`
  padding-top: 10rem;
  background: ${(props) => props.theme.bg};
  @media (max-width: 768px) {
    padding-top: 13rem;
  }
`