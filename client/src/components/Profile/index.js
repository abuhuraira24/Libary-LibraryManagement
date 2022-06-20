import { useState } from "react";

import { gql, useMutation } from "@apollo/client";

import { Container, Row, Col } from "../../Styles/ElementsStyles";

import img from "./avatar.jpg";

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
  ProfileHeader,
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

  // const [uploadFile] = useMutation(FILE_UPLOAD, {
  //   onCompleted: (data) => console.log(data),
  //   onError(error) {
  //     console.log(error);
  //   },
  // });

  const coverHandler = (e) => {
    console.log(e.target.files);
    setCover(URL.createObjectURL(e.target.files[0]));
  };

  // const onChange = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  //   console.log(file);
  //   uploadFile({ variables: { file } });
  // };
  const [mutate] = useMutation(FILE_UPLOAD, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError(err) {
      console.log(err.graphQLErrors);
    },
  });
  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    console.log(file);
    if (validity.valid) mutate({ variables: { file } });
  };

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
            <H3>Abu Huraira</H3>
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
  mutation ($file: Upload!) {
    uploadIamge(file: $file) {
      filename
    }
  }
`;
export default Profile;
