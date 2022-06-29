import styled from "styled-components";

export const Wrapper = styled.div`
  background: ${(props) => props.theme.white};
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #ddd;
  position: fixed;
`;

export const Followers = styled.div``;

export const Title = styled.div`
  margin-bottom: 2rem;
`;

export const H5 = styled.h5`
  font-weight: 600;
  font-size: 16px;
  color: ${(props) => props.theme.color};
  margin: 0;
`;

export const Users = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Avatars = styled.div`
  width: 20%;
`;

export const Avatar = styled.div`
  max-width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
`;

export const Img = styled.img`
  width: 100%;
`;

export const Name = styled.div`
  width: 80%;
`;

export const Span = styled.span`
  color: ${(props) => props.theme.text};
  margin-bottom: 4px;
  display: inline-block;
`;

export const Button = styled.button`
  padding: 4px 10px;
  border: 1px solid #ddd;
  border-radius: 50px;
`;

export const Icon = styled.i`
  margin-right: 1rem;
`;

export const Empty = styled.div`
  background: ${(props) => props.theme.input};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ddd;
`;

export const UserIcon = styled.i``;
