import { gql, useQuery } from "@apollo/client";

import React, { useState } from "react";

import Modal from "react-modal";

import {
  Avatar,
  Button,
  Close,
  ClosedModal,
  H4,
  Img,
  Header,
  Privacy,
  Privat,
  Global,
  Name,
  H5,
} from "./styles";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    borderRadius: "15px",
    transition: ".5s",
    transitionDelay: "2s",
  },
};

Modal.setAppElement("#root");

const Popup = ({ children }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState("");

  useQuery(GET_USER, {
    onCompleted: (data) => {
      // console.log(data);
      setAvatar(data.getUser.avatar);
    },
  });

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Button onClick={openModal}>{children}</Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ClosedModal>
          <H4>Create a post</H4>
          <Close onClick={closeModal} className="fa-solid fa-xmark"></Close>
        </ClosedModal>
        <Header>
          <Avatar>{avatar && <Img src={avatar} alt="avatar" />}</Avatar>
          <Privacy>
            <Name>
              <H5></H5>
            </Name>
            <Privat>
              {/* <i class="fa-solid fa-earth-asia"></i> */}
              <Global className="fa-solid fa-earth-asia"></Global>
              Public
            </Privat>
          </Privacy>
        </Header>
      </Modal>
    </div>
  );
};

const GET_USER = gql`
  query {
    getUser {
      avatar
      cover
    }
  }
`;

export default Popup;
