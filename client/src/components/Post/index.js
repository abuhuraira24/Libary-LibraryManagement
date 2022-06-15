import { useContext } from "react";

import PostCart from "./Card";

import { AuthContext } from "../../context/auth";

const Posts = () => {

    const {getComments} = useContext(AuthContext);
    return (
        <>
         <PostCart />
        </>
    );
}



export default Posts;