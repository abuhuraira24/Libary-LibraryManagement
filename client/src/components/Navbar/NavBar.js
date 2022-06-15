import React,{useContext,useState, useEffect} from "react"

import '../Sidebar/index.scss'

import {useNavigate,createSearchParams} from 'react-router-dom';

import { AuthContext } from "../../context/auth";


import {NavLink} from "react-router-dom"


import { Nav,NavbarContainer, NavbarMenu, NavItem, NavLogo, LargeSearch,MenuIcon,NavLarge, Form, SearchInput,Button, UserIcon, Icon,SmallAccount, List, Ul, Li } from "./NavbarElements";

import {Input} from "../../Styles/ElementsStyles"


const Navbar = () => {

    const [open, setOpen] = useState(false);

    const [isToggle, setToggle] = useState(false)
    const [sticky, setSticky] = useState(false);

    const [searchQuery, setQuery] = useState("");
    
    const [smallDevice, setSmallDevice] = useState(false);


    const {user,logout,searchText} = useContext(AuthContext);


    const isOpen = () => {
        setOpen(true)
    }
    const isClose = () => {
        setOpen(false)
    }

    const toggle = () => {
        if(isToggle){
            setToggle(false)
        }else{
            setToggle(true)
        }
    }

    const isHeaderSticky = () => {
       if(window.scrollY >= 1000){
           setSticky(true)
       }else if(window.innerWidth < 576){
           setSmallDevice(true)
       } else{
           setSticky(false)
       }

    }
    useEffect(() => {
    isHeaderSticky()
    },[])
   
    window.addEventListener('scroll', isHeaderSticky)



      const changeHandler = (e) => {
      setQuery({
          ...searchQuery,
          [e.target.name] : e.target.value
      })
  }
    const context = useContext(AuthContext);
      const navigate = useNavigate();
     const submitHandler = (e) => {
      e.preventDefault();

      context.queryText(searchQuery.text, navigate,createSearchParams)
      
  }

    return (
        <NavLarge>
         <Nav issticky={sticky.toString()}>
          <NavbarContainer>
              <NavLogo issticky={sticky.toString()} to='/'>
                  .JS
              </NavLogo>

              <LargeSearch>
                <Form onSubmit={submitHandler} >
    
                    <Input 
                        type="search" 
                        placeholder="Search" 
                        name="text"
                        onChange={changeHandler}/>
                   <Button 
                     type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                   </Button>
                </Form>
                
              </LargeSearch>
                 {user && (
                    <>
                     <SmallAccount onClick={toggle}>
                      <UserIcon className="fa-solid fa-user"></UserIcon>
                       <Ul isToggle={isToggle} className="scrollbar-hidden">
                        <Li mone="1" bbottom="true" to={`/profile/${user.id}`}>
                            {user.username}
                         </Li>
                         <Li to="/dashboard">
                             Dashboard
                         </Li>
                         <Li to="/createpost">
                           Create Post
                         </Li>
                         <Li to="/setting">
                           Setting
                         </Li>

                         <Li to='' onClick={logout}>
                           Logout
                         </Li>
                       </Ul>
                     </SmallAccount>
                    </>
                 )}
              <MenuIcon>
                 
                {open ? <span onClick={() => isClose()}>
                 <i class="fa-solid fa-xmark"></i>
                </span> : <span onClick={() => isOpen()}> 
               
                   <Icon className="fa-solid fa-bars"></Icon>
                 </span>}
              </MenuIcon>
              <NavbarMenu issticky={sticky} toggle={open}>
                  <NavItem>
                   {user ? "": (
                      <div className="navmenue">
                       <NavLink to='/register' className="createAccount">Create Account</NavLink>
                       <NavLink to='/login' onClick={logout}> Login </NavLink>
                      </div>
                   )}
                  </NavItem>
            
              </NavbarMenu>
          </NavbarContainer>
         </Nav>
        </NavLarge>
    )
}

export default Navbar