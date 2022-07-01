import React from "react";
import {
  Avatar,
  Body,
  NotWrapper,
  Img,
  Single,
  Avatars,
  Name,
  Text,
  Time,
} from "./styles";
import im from "../Profile/avatar.jpg";

const SingleNoti = () => {
  return (
    <NotWrapper>
      <Single>
        <Avatars>
          <Avatar>
            <Img src={im} alt="use" />
          </Avatar>
        </Avatars>
        <Body>
          <Name>Abu Huraira : </Name>
          <Text>In software development, staging </Text>
          <Time>2 hours ago</Time>
        </Body>
      </Single>
    </NotWrapper>
  );
};

export default SingleNoti;
