import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import SingleNoti from "./SingleNoti";
import { Empty, Wrapper } from "./styles";

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

  console.log(noti);
  return (
    <Wrapper>
      <Header>
        <Title>Notifications</Title>
        <SubHeader>
          <New>New</New>
          <SeeAll>See All</SeeAll>
        </SubHeader>

        <Empty>
          {typeof noti !== "undefined" &&
            noti.length === 0 &&
            "There is no Notification"}
        </Empty>
      </Header>
      {/* {realtTimeNoti.length !== 0 && (
        <RealTimeNotification realtTimeNoti={realtTimeNoti} />
      )} */}

      {noti &&
        noti.map((x, index) => <SingleNoti key={index} notification={x} />)}
    </Wrapper>
  );
};

export default Notification;
