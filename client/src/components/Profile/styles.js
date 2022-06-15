import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 10rem;
  @media (max-width: 768px) {
    margin-top: 13rem;
  }
`

export const H3 = styled.h3`
 color: ${(props) => props.theme.light.color};
`