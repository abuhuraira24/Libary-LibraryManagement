import styled from "styled-components";
import { NavLink as NavLinks } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

export const Nav = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #ffffff26;
  z-index: 99;
  transition: 0.5s;
  display: ${(props) => props.smNav && 'none'};
  display: ${(props) => props.lgNav ? "none" : "block"};
  @media (max-width: 991px) {
    background: #fff;
    z-index: 99;
  }
  @media (max-width : 768px) {
     display: ${(props) => props.smNav && 'block'};
  }
  background: ${(props) => (props.issticky ? "white" : "#fff")};
  box-shadow: ${(props) =>
    props.issticky ? "0px 5px 20px rgb(0 0 0 / 15%)" : null};
  position: ${(props) => (props.issticky ? "fixed" : "absolute")};
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1450px;
  margin: auto;
  height: 80px;
  position: relative;
  @media (max-width: 1200px) {
    max-width: 960px;
    padding: 0px 28px;
  }
`;

export const Logo = styled.div`
 max-width: 20%;
`

export const NavLogo = styled(NavLinks)`
  font-size: 32px;
  font-weight: 600;
  color: ${(props) => (props.issticky ? "#000" : "#2c51ca")};
  @media (max-width: 991px) {
    color: #2c51ca !important;
  }
`;

export const RightNav = styled.div`
    width: 80%;
    display: flex;
    justify-content: end;
    align-items: center;
`
export const MenuIcon = styled.span`
  display: none;
  
  @media (max-width: 991px) {
    display: block;
    svg {
      font-size: 28px;
      transition: 0.5s;
    }
  }
`;

export const NavbarMenu = styled.ul`
  @media (max-width: 991px) {
    width: 100%;
    position: absolute;
    left: 0;
    top: 100%;
    background: #fff;
    /* height: 260px; */
    height: ${(props) => (props.toggle ? "260px" : "0px")};
    overflow: scroll;
    z-index: 99999999 !important;
    transition: 0.5s;
    li {
      a {
        color: ${(props) => (props.toggle ? "#000" : "#2c51ca")};
      }
    }
  }
`;

export const NavItem = styled.li`
  display: inline-block;
  @media (max-width: 991px) {
    display: block;
  }
`;

export const NavLink = styled(HashLink)`
  font-size: 16px;
  margin-left: 2rem;
  font-weight: 400;
  color: ${(props) => (props.issticky ? "#000" : "#2c51ca")};
  @media (max-width: 991px) {
    margin-bottom: 1rem;
    font-weight: 500;
    font-size: large;
  }
`;

export const LargeSearch = styled.div`
     width: 56%;
     /* margin-left: 2%; */
     @media (max-width: 576px) {

     }
`;

export const Form = styled.form`
 position: relative;
`;

export const SmallForm = styled.form`
 position: relative;
 width: 100%;
 display: ${(props) => props.smNav && 'none'};
 @media (max-width : 768px) {
     display: ${(props) => props.smNav && 'block'};
  }
`
export const SearchInput = styled.input`
  /* @media (max-width : 558px) {
    visibility: ${(props) => props.showSearch ? "visible" : "hidden"};
  } */
`;


export const Button = styled.button`
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    right: 2%;
    i{
      font-size: 22px;
    }
    @media (max-width: 558px) {
      margin-right: 1rem;
    }
`;

export const MyAccount = styled.div`
    width: 38px;
    height: 38px;
    background: #DDD;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 1rem;
`;

export const SmallAccount = styled.div`
    width: 38px;
    height: 38px;
    background: #DDD;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 1rem;
`

export const UserIcon = styled.i``;

export const Icon = styled.i`
font-size: 26px;
`

export const CreatrAccount = styled(Link)`
    padding: 8px 28px;
    border-radius: 7px;
    border-width: 2px;
    font-size: 18px;
    margin-right: 1rem;
    @media (max-width: 768px) {
      padding: 7px 10px;
      border-radius: 7px;
      border-width: 2px;
      font-size: 13px;
      margin-right: 1rem;
      display: inline-block;
      border: 1px solid #2c51ca;
    }
`

export const AccountMneu = styled.div``;

// TODO: Large Device

export const NavLarge = styled.div`
 display: block;

@media (max-width: 768px) {
 display: none;
}
`

//TODO: Small Device
export const NavSm = styled.div`
 display: none;

 @media (max-width: 768px) {
  display: block;
 }
`;
