import styled from "styled-components";

import { Link } from "react-router-dom";

export const Wrapper = styled.div``;

export const CoverWrapper = styled.div`
  background: ${(props) => props.theme.gray};
  padding-top: 8rem;
  padding-bottom: 2rem;
  @media (max-width: 768px) {
    margin-top: 13rem;
  }
`;

export const H3 = styled.h3`
  color: ${(props) => props.theme.color};
  font-size: 44px;
  font-weight: 600;
`;

export const Bio = styled.h5`
  margin-top: 1rem;
  color: ${(props) => props.theme.color};
`;

export const Cover = styled.div`
  height: 18rem;
`;

export const CoverPic = styled.div`
  background: ${(props) => props.theme.bg};
  /* border-radius: 5px; */
  height: 18rem;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
  }
`;
export const ProfileAvatar = styled.div`
  padding: 0 2rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 12rem;
  padding-bottom: 1rem;
`;

export const Avatars = styled.div`
  position: absolute;
  top: 32%;
  left: 42%;
`;

export const Avatar = styled.div`
  background: ${(props) => props.theme.color};
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #fff;
  overflow: hidden;
  img {
    max-width: 100%;
  }
`;
export const UserIcon = styled.i`
  color: ${(props) => props.theme.bg};

  font-size: 88px;
`;

export const Name = styled.div``;

export const Followers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Ul = styled.ul`
  display: flex;
`;

export const Li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 1rem;
`;

export const Span = styled.span`
  color: ${(props) => props.theme.color};
`;

export const EdidButton = styled(Link)`
  margin-top: 2rem;
  background: #0d6efd;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 5px;
  &&:hover {
    color: #fff;
  }
`;

export const UploadCover = styled.div`
  position: absolute;
  right: 2%;
  bottom: 24%;
  background: #ddd;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #fff;
  cursor: pointer;
  z-index: 99;
`;

export const UploadAvatar = styled.div`
  position: absolute;
  right: -3%;
  bottom: 24%;
  background: #ddd;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #fff;
  cursor: pointer;
  z-index: 99;
`;

export const Camera = styled.i`
  color: #fff;
  cursor: pointer;
  position: absolute;
`;

export const UploadInput = styled.input`
  opacity: 0;
  z-index: 999;
  cursor: pointer;
`;
export const EditIcon = styled.i`
  margin-right: 1rem;
`;

export const Picture = styled.img`
  width: 100%;
`;
