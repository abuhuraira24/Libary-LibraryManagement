import styled from "styled-components";

export const Close = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  i {
    color: ${(props) => props.theme.text};
  }
`;

export const H5 = styled.h5`
  color: ${(props) => props.theme.text};
`;

export const P = styled.p`
  color: ${(props) => props.theme.text};
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Button = styled.button`
  color: ${(props) => props.theme.text};
`;
