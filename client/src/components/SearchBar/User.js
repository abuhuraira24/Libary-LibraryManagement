import img from "../Profile/avatar.jpg";
import { H6 } from "./Styles";

import {
  Users,
  Avatar,
  Img,
  Name,
  UserIcon,
  Empty,
  Avatars,
} from "../Home/FollowerStyles";

const User = ({ user }) => {
  return (
    <Users>
      <Avatars>
        <Avatar>
          <Img src={user.avatars[0].avatar} alt="user" />

          <Empty>
            <UserIcon className="fa-solid fa-user"></UserIcon>
          </Empty>
        </Avatar>
      </Avatars>
      <Name>
        <H6>
          {user.firstName} {user.lastName}
        </H6>
      </Name>
    </Users>
  );
};

export default User;
