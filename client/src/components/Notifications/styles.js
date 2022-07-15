import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  background: #fff;
  top: 100%;
  width: 400px;
  box-shadow: 0px 5px 20px rgb(0 0 0 / 15%);
  border-radius: 10px;
  padding: 1rem;
  right: 0px;
  padding-bottom: 2rem;
`;

export const Header = styled.header``;

export const Title = styled.h4`
  font-weight: 700;
  font-size: 18px;
`;

export const SubHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const New = styled.span``;

export const SeeAll = styled.span``;

export const NotWrapper = styled.div`
  margin-top: 1rem;
`;

export const Avatars = styled.div``;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 4px;
`;

export const Body = styled.div`
  width: 100%;
  background: "";
  margin-left: 5px;
`;

export const Img = styled.img`
  width: 100%;
`;

export const Single = styled.div`
  display: flex;
`;

export const Name = styled.span`
  color: ${(props) => props.theme.text};
`;

export const Text = styled.span`
  color: ${(props) => props.theme.color};
`;

export const Time = styled.div`
  color: ${(props) => props.theme.text};
  font-size: 14px;
`;

export const Empty = styled.p`
  text-align: center;
`;
