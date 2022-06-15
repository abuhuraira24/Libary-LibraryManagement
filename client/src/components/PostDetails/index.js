import React,{useState, useEffect, useContext} from 'react';

import {useParams} from "react-router-dom";

import {CommentBox,Button,CommentInput,Form} from "../Post/CartStyles"

import { gql, useQuery, useMutation } from '@apollo/client';

import { AuthorName, Comments, H5, P, PostBody, PostTitle, Span, UserImage, UserProfile, Wrapper } from './Styles';

import {Container, Row, Col} from "../../Styles/ElementsStyles"

import moment from 'moment'


import SingleComment from '../Comments';

import {AuthContext} from "../../context/auth"

import Profile from './Profile';

const PostDetails = () => {

    // Commet value
    const [value, setValues] = useState({
      body : ""
    });

    const {getComments,comments,user} = useContext(AuthContext)
   const postId = useParams().id;

    const {data } = useQuery(FETCH_POST,{
      variables : {
         postId
      }
    });

    let post;

    if(data){
      post = data.getSinglePost
    }

    useEffect(() => {
      if(post){
        getComments(post.comments)
      }
      // getComments(post)
    },[post])

    const [addComment, {loading}] = useMutation(COMMENTS, {
      update(_, result){
        getComments(result.data.createComment.comments)
     
      },
      onError(error){
        console.log(error)
      },
      variables : {
       ...value,
        postId
      }
    })  
  
     const changeHandler = (e) => {
        setValues({
          ...value,
          [e.target.name] : e.target.value
        })
     }
  

    const submitHandler = (e) => {
      e.preventDefault();
      addComment()
      setValues({
        body : ""
      })
    }

console.log(postId)
    return (
        <Wrapper>
            <Container>
              <Row>
                <Col w="70" sm="100">
                  <UserProfile>
                     <UserImage>
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg>
                     </UserImage>
                     <AuthorName>
                        <H5>
                        {typeof post !== 'undefined' && post.firstName + " " + post.lastName}
                        </H5>
                        <Span>
                        {typeof post !== 'undefined' && moment(post.createdAt).fromNow(true)}
                        </Span>
                     </AuthorName>
                  </UserProfile>
                   <PostTitle>
                     {typeof post !== 'undefined' && post.title}
                   </PostTitle>
                   <PostBody>
                     <P>
                      {typeof post !== 'undefined' && post.body}
                     </P>
                   </PostBody>
                   <Comments>
                   <h2>Discussion ({comments && typeof comments !== 'undefined' && comments.length})</h2>
                    <CommentBox>
                    <Form onSubmit={submitHandler}>
                      {!user && (
                        <CommentInput 
                        type='body' 
                        disabled
                        placeholder='Write an answere...' 
                        name='body'
                        value={value.body}
                        onChange={changeHandler}
                        />
                      )}
                      {user && (
                        <CommentInput 
                        type='body' 
                        placeholder='Write an answere...' 
                        name='body'
                        value={value.body}
                        onChange={changeHandler}
                        />
                      )}
                   
                    <Button type='submit'></Button>
                    </Form>
                 </CommentBox>
                   
                   {comments && typeof comments !== 'undefined' && comments.map(itm => (
                        <SingleComment data={itm} />
                   ))}
                     
                   </Comments>
                </Col>
                <Col w="30" none="true">
                  <Profile data={post} />
                </Col>
              </Row>
            </Container>
        </Wrapper>
    );
}

// const FETCH_POST = gql`
//    query{
//       getPosts{
//         title,
//         firstName,
//         lastName,
//         _id,
//         body,
//         comments {
//         username,
//         body
//         createdAt
//         }
//         readTime,
//         createdAt
//       }
//    }
// `;

const FETCH_POST = gql`
  query($postId: ID!){
  getSinglePost(postId: $postId) {
   firstName
   lastName
   title
   body
   createdAt
    comments {
      body,
      username
      createdAt
    }
  }
}
`

const COMMENTS = gql`
mutation createComment($postId: ID!, $body: String!){
  createComment(postId: $postId, body: $body) {
    comments {
      body,
      username,
      createdAt
    }
  }
}
`

export default PostDetails;