import styled from "styled-components";

export const Wrapper = styled.div`
  background: ${(props) => props.theme.white};
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #ddd;
`;

export const PostWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const Avatar = styled.div`
  max-width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  cursor: pointer;
`;

export const Img = styled.img`
  width: 100%;
`;

// export const Input styled.input``

export const FakeInput = styled.div`
  width: 100%;
`;

export const Span = styled.span`
  color: ${(props) => props.theme.text};
  border: 2px solid #ddd;
  padding: 1rem;
  border-radius: 50px;
  display: block;
  cursor: pointer;
`;

export const Button = styled.div``;

export const ClosedModal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
`;

export const H4 = styled.span`
  font-size: 20px;
  font-weight: 500;
`;

export const Close = styled.i`
  font-size: 22px;
  cursor: pointer;
`;

export const Header = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const Privacy = styled.div``;

export const Name = styled.div``;
export const H5 = styled.h5``;

export const Privat = styled.span``;

export const Global = styled.i`
  margin-right: 0.5rem;
`;
