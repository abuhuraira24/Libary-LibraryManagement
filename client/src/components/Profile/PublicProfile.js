import { useState, useContext, useEffect } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";

import { Container, Col, Row } from "../../Styles/ElementsStyles";

import Axios from "axios";

import { AuthContext } from "../../context/auth";

import {
  Avatar,
  Avatars,
  Bio,
  Camera,
  Cover,
  CoverPic,
  CoverWrapper,
  EdidButton,
  EditIcon,
  Followers,
  H3,
  Header,
  Image,
  Images,
  ImageWrapper,
  Img,
  Li,
  Photos,
  ProfileAvatar,
  SeeAll,
  Span,
  Ul,
  UploadAvatar,
  UploadCover,
  UploadInput,
  UserIcon,
} from "./styles";
import { useParams } from "react-router-dom";

import Post from "../Post/Post";

import PostCart from "../Profile/Posts/Card";

import CreatePost from "../CreatePosts";

const PublicProfile = () => {
  const [cover, setCover] = useState();
  const [avatar, setAvatar] = useState();
  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState(null);

  // File Upload Mutation
  let [mutedCover] = useMutation(COVER_UPLOAD);

  // Cover Photo Upload
  const coverHandler = (e) => {
    if (e.target.validity.valid && user) {
      setCover(URL.createObjectURL(e.target.files[0]));
      let file = e.target.files[0];

      let formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      Axios.post(
        "https://api.cloudinary.com/v1_1/dza2t1htw/image/upload",
        formData
      ).then((res) => {
        mutedCover({
          variables: {
            url: res.data.url,
            userId: user.id,
          },
        });
      });
    }
  };

  let userId = useParams();
  useQuery(GET_USER_BY_ID, {
    onCompleted: (data) => {
      setProfileUser(data.getUserById);
    },
    variables: {
      userId: userId.id,
    },
  });

  const { data } = useQuery(GET_USER);
  // Avatar Upload
  let [mutate] = useMutation(FILE_UPLOAD);

  // Context api
  let { user } = useContext(AuthContext);

  // Get posts
  useQuery(GET_POSTS_BY_USERS_ID, {
    onCompleted: (data) => {
      // console.log(data.getPostsByUserId);
      setPosts(data.getPostsByUserId);
    },
    variables: {
      userId: user.id,
    },
  });

  // Submit Avatar
  const onChange = (e) => {
    if (e.target.validity.valid && user) {
      let file = e.target.files[0];
      setAvatar(URL.createObjectURL(file));

      let formData = new FormData();

      formData.append("file", file);

      formData.append("upload_preset", "ml_default");

      Axios.post(
        "https://api.cloudinary.com/v1_1/dza2t1htw/image/upload",
        formData
      ).then((res) => {
        console.log(res);
        mutate({
          variables: {
            url: res.data.url,
            userId: user.id,
          },
        });
      });
    }
  };

  useEffect(() => {
    if (data && typeof data.getUser !== "undefined") {
      setAvatar(data.getUser.avatar);
      setCover(data.getUser.cover);
      // console.log(data.getUser);
    }
  }, [data]);

  console.log(profileUser);
  return (
    <CoverWrapper>
      <Container>
        <Col w="100">
          <Cover>
            {profileUser && profileUser.cover.length !== 0 && (
              <img src={profileUser.cover[0].ulr} alt="me" />
            )}

            <Avatars>
              <Avatar file={avatar}>
                {!avatar && <UserIcon className="fa-solid fa-user"></UserIcon>}
                {profileUser && profileUser.avatars.length !== 0 && (
                  <img src={profileUser.avatars[0].avatar} alt="me" />
                )}
              </Avatar>
            </Avatars>
          </Cover>
          <ProfileAvatar>
            <H3>
              {" "}
              {profileUser && profileUser.firstName}{" "}
              {profileUser && profileUser.lastName}
            </H3>
            <Bio>Web Application Developer</Bio>
          </ProfileAvatar>

          <Followers>
            <Ul>
              <Li>
                <Span>0 </Span>
                <Span>Followers</Span>
              </Li>
              <Li>
                <Span>0 </Span>
                <Span>Following</Span>
              </Li>
            </Ul>
          </Followers>
        </Col>
      </Container>
      <Container>
        <Row>
          <Col w="30">
            <ImageWrapper>
              <Header>
                <Photos>Photos</Photos>
                <SeeAll>See All Photos</SeeAll>
              </Header>
              <Images>
                {profileUser &&
                  profileUser.avatars.length !== 0 &&
                  profileUser.avatars.map((img, index) => (
                    <Image key={index}>
                      <Img src={img.avatar} alt="abu" />
                    </Image>
                  ))}
                {profileUser &&
                  profileUser.cover.length !== 0 &&
                  profileUser.cover.map((img, index) => (
                    <Image key={index}>
                      <Img src={img.url} alt="abu" />
                    </Image>
                  ))}
              </Images>
            </ImageWrapper>
          </Col>
          <Col w="50">
            <PostCart />
          </Col>
          <Col w="20"></Col>
        </Row>
      </Container>
    </CoverWrapper>
  );
};

const FILE_UPLOAD = gql`
  mutation ($url: String!, $userId: ID!) {
    uploadIamge(url: $url, userId: $userId) {
      url
    }
  }
`;

const COVER_UPLOAD = gql`
  mutation ($url: String!, $userId: ID!) {
    uploadCover(url: $url, userId: $userId) {
      url
    }
  }
`;

const GET_USER = gql`
  query {
    getUser {
      avatar
      cover
    }
  }
`;

const GET_USER_BY_ID = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      firstName
      lastName
      avatars {
        avatar
      }
      cover {
        url
      }
    }
  }
`;

export const GET_POSTS_BY_USERS_ID = gql`
  query ($userId: ID!) {
    getPostsByUserId(userId: $userId) {
      firstName
      lastName
      body
      userId
      createdAt
      likes {
        userId
      }
      userId
      comments {
        body
        createdAt
        userId
        username
      }
    }
  }
`;

export default PublicProfile;
