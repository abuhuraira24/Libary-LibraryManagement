import React, { useEffect } from "react";

import SingleNoti from "./SingleNoti";
import { Wrapper } from "./styles";

import socket from "../../hooks/socketio";

import { Header, New, SeeAll, SubHeader, Title } from "./styles";
const Notification = () => {
  return (
    <Wrapper>
      <Header>
        <Title>Notifications</Title>
        <SubHeader>
          <New>New</New>
          <SeeAll>See All</SeeAll>
        </SubHeader>
      </Header>
      <SingleNoti />
      <SingleNoti />
    </Wrapper>
  );
};

export default Notification;
