import styled from "styled-components";

export const NavWrapper = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const Link = styled.span`
  display: block;
`;

export const Main = styled.div`
  background: ${(props) => props.theme.white};

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Icon = styled.i`
  color: #41464b;
`;
