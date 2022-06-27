import { Icon, Link, Main, NavWrapper } from "./mobile";

import { NavLink } from "react-router-dom";

const MobileMenu = () => {
  return (
    <NavWrapper>
      <Main>
        <NavLink to="/">
          <Icon className="fa-solid fa-house-chimney"></Icon>
        </NavLink>
        <NavLink to="/">
          <Icon className="fa-solid fa-user-group"></Icon>
        </NavLink>
        <NavLink to="/">
          <Icon className="fa-brands fa-facebook-messenger"></Icon>
        </NavLink>
        <NavLink to="/">
          <Icon className="fa-solid fa-bell"></Icon>
        </NavLink>
      </Main>
    </NavWrapper>
  );
};

export default MobileMenu;
