import { useState, useContext, useEffect } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";

import { Container, Col } from "../../Styles/ElementsStyles";

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
  Li,
  ProfileAvatar,
  Span,
  Ul,
  UploadAvatar,
  UploadCover,
  UploadInput,
  UserIcon,
} from "./styles";

const Profile = () => {
  const [cover, setCover] = useState();
  const [avatar, setAvatar] = useState();

  const coverHandler = (e) => {
    console.log(e.target.validity);
    setCover(URL.createObjectURL(e.target.files[0]));
  };

  const { data } = useQuery(GET_USER);

  const [mutate] = useMutation(FILE_UPLOAD, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError(err) {
      console.log(err.graphQLErrors[0]);
    },
  });

  let { user } = useContext(AuthContext);

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
    if (data && data.getUser) {
      setAvatar(data.getUser.avatar);
    }
  }, [data]);

  return (
    <CoverWrapper>
      <Container>
        <Col w="100">
          <Cover>
            <CoverPic>
              {cover && <img src={cover} alt="me" />}
              <UploadCover>
                <UploadInput type="file" onChange={coverHandler} />
                <Camera className="fa-solid fa-camera"></Camera>
              </UploadCover>
            </CoverPic>

            <Avatars>
              <Avatar file={avatar}>
                {!avatar && <UserIcon className="fa-solid fa-user"></UserIcon>}
                {avatar && <img src={avatar} alt="me" />}
              </Avatar>
              <UploadAvatar>
                <UploadInput type="file" onChange={onChange} />
                <Camera className="fa-solid fa-camera"></Camera>
              </UploadAvatar>
            </Avatars>
          </Cover>
          <ProfileAvatar>
            <H3>
              {" "}
              {user.firstName} {user.lastName}
            </H3>
            <Bio>Web Application Developer</Bio>
          </ProfileAvatar>

          <Followers>
            <Ul>
              <Li>
                <Span>0 </Span>
                <Span>Posts</Span>
              </Li>
              <Li>
                <Span>0 </Span>
                <Span>Followers</Span>
              </Li>
              <Li>
                <Span>0 </Span>
                <Span>Following</Span>
              </Li>
            </Ul>
            <EdidButton to="/">
              <EditIcon className="fa-solid fa-pen"></EditIcon>
              Edit Profile
            </EdidButton>
          </Followers>
        </Col>
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

const GET_USER = gql`
  query {
    getUser {
      avatar
      createdAt
    }
  }
`;
export default Profile;
