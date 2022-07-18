import { useState } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";

import {
  H5,
  Users,
  Avatar,
  Img,
  Name,
  Span,
  Button,
  Icon,
  UserIcon,
  Empty,
  Avatars,
} from "./FollowerStyles";
import { NavLink } from "react-router-dom";

import getAvatarById from "../../hooks/avatarById";

const User = (user) => {
  let [isFollow, setFollow] = useState(false);

  let { data, loading } = useQuery(GET_AVATAE_BY_ID, {
    variables: {
      userId: user.user.id,
    },
  });

  let avatar = getAvatarById(data, loading);

  let [addFollower, { data: info }] = useMutation(ADD_FOLLOWER);
  let followHandler = (id) => {
    addFollower({ variables: { userId: id } });
    if (isFollow) {
      setFollow(false);
    } else {
      setFollow(true);
    }
  };

  return (
    <Users>
      <Avatars>
        <NavLink to={`profile/${user.id}`}>
          <Avatar>
            {avatar.images && <Img src={avatar.images.avatar} alt="user" />}

            <Empty>
              <UserIcon className="fa-solid fa-user"></UserIcon>
            </Empty>
          </Avatar>
        </NavLink>
      </Avatars>
      <Name>
        <NavLink to={`profile/${user.id}`}>
          <H5>
            {user.user.firstName} {user.user.lastName}
          </H5>
        </NavLink>

        <Span>Web Application Developer</Span>

        {isFollow ? (
          <Button onClick={() => followHandler(user.user.id)}>
            <Icon className="fa-solid fa-check"></Icon>
            Following
          </Button>
        ) : (
          <Button onClick={() => followHandler(user.user.id)}>
            <Icon className="fa-solid fa-plus"></Icon>
            Follow
          </Button>
        )}
      </Name>
    </Users>
  );
};

const ADD_FOLLOWER = gql`
  mutation ($userId: String!) {
    addFollow(userId: $userId) {
      name
      userId
    }
  }
`;

const GET_AVATAE_BY_ID = gql`
  query ($userId: ID!) {
    getUserById(userId: $userId) {
      avatars {
        avatar
      }
    }
  }
`;

export default User;
