import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import SingleNoti from "./SingleNoti";
import { Wrapper } from "./styles";

import socket from "../../hooks/socketio";

import RealTimeNotification from "./RealTimeNotification";

import { Header, New, SeeAll, SubHeader, Title } from "./styles";
const Notification = ({ realtTimeNoti, notification }) => {
  const [noti, setNoti] = useState([]);

  const [realTimeNoti, setRealTimeNoti] = useState([]);

  useEffect(() => {
    if (notification) {
      setNoti(notification.data.notifications);
    }
  }, [notification]);

  console.log(realTimeNoti);
  return (
    <Wrapper>
      <Header>
        <Title>Notifications</Title>
        <SubHeader>
          <New>New</New>
          <SeeAll>See All</SeeAll>
        </SubHeader>
      </Header>
      {/* {realtTimeNoti.length !== 0 && (
        <RealTimeNotification realtTimeNoti={realtTimeNoti} />
      )} */}
      {noti && noti.map((x) => <SingleNoti notification={x} />)}
    </Wrapper>
  );
};

export default Notification;
