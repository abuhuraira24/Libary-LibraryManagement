import { useContext } from "react";

import { useParams } from "react-router-dom";

import { Wrapper } from "./styles";

import UserProfile from "../Profile/index";

import PrivateProfile from "./PrivateProfile";

import PublicProfile from "./PublicProfile";

import { AuthContext } from "../../context/auth";

const Profile = () => {
  let userId = useParams();

  let { user } = useContext(AuthContext);

  return userId.id === user.id ? <PrivateProfile /> : <PublicProfile />;
};

export default Profile;
