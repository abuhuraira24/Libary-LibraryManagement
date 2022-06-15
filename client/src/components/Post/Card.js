import { useState, useContext } from 'react';

import {Container, Row, Col,CardText} from 'reactstrap';

import { gql, useQuery, useMutation } from '@apollo/client';

import {NavLink, useParams} from "react-router-dom";

import moment from "moment";


import { Comments, Like, LikeComments,Comment, SaveRead, Span, Card,CardBody, UserName, CardTitle,CardSubtitle } from './CartStyles';

import LikeButton from '../LikeButton';

import Popup from '../Popup/Popup';

import {AuthContext} from "../../context/auth"
const PostCart = () => {
 
  const {user} = useContext(AuthContext)
  const {data} = useQuery(FETCH_POST);
  


    return (
        <div className='posts'>
        <Container>
          <Row>
              <Col className='col-12 mb-4'>  
                <Card>
                    {data && Object.keys(data.getPosts).length > 0 && data.getPosts.map((post, index) => (
                        <CardBody className='mb-4 ' key={index}>
                          <div>
                            <div className='users'>
                              <div className='usersPic'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg>
                              </div>
                              
                              <UserName>
                               {post.firstName +" " +post.lastName}
                              </UserName>
                            </div>
                          </div>
                          <CardSubtitle
                            className="mb-2 mt-2 text-muted border-bottom pb-1"
                            tag="h6"
                          >
                            {moment(post.createdAt).fromNow(true)}
                          </CardSubtitle>
                          <CardTitle>
                            <NavLink to={`/post/${post._id}`}>
                              {post.title}
                            </NavLink>
                          </CardTitle>
                          <CardText id='post'>
                            {/* {post.body.length > 100 && "Read more..."} */}
                          </CardText>
                          <Comments>
                          
                              <LikeComments>
                                {!user && (<Popup>{post.likes.length + " "}Like</Popup>)}
                                {user && (<LikeButton likes={post.likes} postId={post._id} />)}
                               
                                <Comment>
                                    <NavLink to={`/post/${post._id}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.1 63.1v287.1c0 35.25-28.75 63.1-64 63.1h-144l-124.9 93.68c-7.875 5.75-19.12 .0497-19.12-9.7v-83.98h-96c-35.25 0-64-28.75-64-63.1V63.1c0-35.25 28.75-63.1 64-63.1h384C483.2 0 511.1 28.75 511.1 63.1z"/></svg>
                                     <Span> {post.comments.length} comments</Span>
                                   </NavLink>
                                
                                </Comment>
                              </LikeComments>
                              <SaveRead>
                                <CardSubtitle
                                  className="text-muted"
                                  tag="h6">
                                  {post.readTime} min read
                                </CardSubtitle>
                                
                              </SaveRead>
                          </Comments>

                        </CardBody>  
                      
                    ))}
                </Card>
              </Col>

          </Row>
        </Container>
      </div>
    )
}


const FETCH_POST = gql`
   query{
      getPosts{
        title,
        firstName,
        lastName,
        _id,
        body,
        comments {
        username,
        body
        createdAt
        }
        likes {
        userId,
        createdAt
        }  
        readTime,
        createdAt
      }
   }
`;



export default PostCart;
