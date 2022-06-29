import { gql, useQuery } from "@apollo/client";

import {
  H5,
  Title,
  Wrapper,
  Followers,
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

const Follower = () => {
  let { data } = useQuery(FETCH_USERS);

  return (
    <Wrapper>
      <Followers>
        <Title>
          <H5>Add to your feed</H5>
        </Title>

        {data &&
          typeof data.users !== "undefined" &&
          data.users.slice(0, 3).map((user, index) => {
            return (
              <Users key={index}>
                <Avatars>
                  <Avatar>
                    {typeof user.avatars !== "undefined" &&
                      Object.keys(user.avatars).length > 0 && (
                        <Img src={user.avatars[0].avatar} alt="user" />
                      )}
                    {typeof user.avatars !== "undefined" &&
                      Object.keys(user.avatars).length === 0 && (
                        <Empty>
                          <UserIcon className="fa-solid fa-user"></UserIcon>
                        </Empty>
                      )}
                  </Avatar>
                </Avatars>
                <Name>
                  <H5>
                    {user.firstName} {user.lastName}
                  </H5>
                  <Span>Web Application Developer</Span>
                  <Button>
                    <Icon className="fa-solid fa-plus"></Icon>
                    Follow
                  </Button>
                </Name>
              </Users>
            );
          })}
      </Followers>
    </Wrapper>
  );
};

const FETCH_USERS = gql`
  query {
    users {
      firstName
      lastName
      avatars {
        avatar
      }
    }
  }
`;

export default Follower;
// (
//   <Users>
//     <Avatar>
//       <Img src={img} alt="user" />
//     </Avatar>
//     <Name>
//       <H5>Abu Huraira</H5>
//       <Span>Web Application Developer</Span>
//       <Button>
//         <Icon className="fa-solid fa-plus"></Icon>
//         Follow
//       </Button>
//     </Name>
//   </Users>
// )
