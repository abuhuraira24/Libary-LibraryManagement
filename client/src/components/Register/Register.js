import { useState, useContext } from "react";

import {useNavigate} from "react-router-dom"

import {Form, Button} from "react-bootstrap"

import { gql, useMutation } from '@apollo/client';

import {AuthContext} from '../../context/auth';

import { RegisterWrapper,H2 } from "./styles";

import {Input} from "../../Styles/ElementsStyles"

const Register = () => {
  const context = useContext(AuthContext)
    const [errors, setErrors] = useState({}) 
     const [values, setValues] =  useState({
         firstName : "",
         lastName : "",
         email : "",
         password : "",
         confirmPassword: "" 
        })

        const onChange = (e) => {
            setValues({
                ...values,
                [e.target.name] : e.target.value
            })
        }

        const navigate = useNavigate()
        const [addUser, {loading}] = useMutation(REGISTER_USER,{
            update(_, result) {
                const token = result.data.register.token;
                context.login(token)
  
                navigate('/')
           },
           onError(err) {
             console.log(err.graphQLErrors[0])
            if(err.graphQLErrors){
              setErrors(err.graphQLErrors[0].extensions.errors);
            }
          },
           variables: values
        })

       
        const submitHandle = (e) => {
            e.preventDefault();
            addUser()
        }

    return (
      <RegisterWrapper>
         <H2>Create Account</H2>
        <Form onSubmit={submitHandle}>
                <Form.Group className="mb-3">
                    <Form.Label>* First Name</Form.Label>
                    <Input
                      type="text" 
                      placeholder="Enter First Name" 
                      onChange={onChange}
                      name="firstName"
                      />
                    
                    { typeof errors !== 'undefined' && Object.keys(errors).length !== 0 && !loading && (
                        <Form.Text className="text-red">
                          {errors.firstName}
                       </Form.Text>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>* Last Name</Form.Label>
                    <Input 
                      type="text" 
                      placeholder="Enter Last Name" 
                      onChange={onChange}
                      name="lastName"
                      />
                    
                    { typeof errors !== 'undefined' && Object.keys(errors).length !== 0 && !loading && (
                        <Form.Text className="text-red">
                          {errors.lastName}
                       </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Input 
                      type="email" 
                      placeholder="Email" 
                      onChange={onChange}
                      name="email"
                      />
                      { typeof errors !== 'undefined' && Object.keys(errors).length !== 0 &&!loading && (
                        <Form.Text className="text-red">
                          {errors.email}
                       </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Input 
                      type="Password" 
                      placeholder="Password" 
                      onChange={onChange}
                      name="password"
                      />
                      { typeof errors !== 'undefined' && Object.keys(errors).length !== 0 &&!loading && (
                        <Form.Text className="text-red">
                          {errors.password}
                       </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Input
                      type="Password" 
                      placeholder="Confirm Password" 
                      onChange={onChange}
                      name="confirmPassword"
                      />
                      {  typeof errors !== 'undefined' && Object.keys(errors).length !== 0 &&!loading && (
                        <Form.Text className="text-red">
                          {errors.confirmPassword}
                       </Form.Text>
                    )}
                </Form.Group>
            
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
      </RegisterWrapper>
    );
}



const REGISTER_USER = gql`
  mutation register(
    $firstName : String!
    $lastName : String!
    $email :  String!
    $password :  String!
    $confirmPassword :  String!
  ) {
    register (registerInput : {
      firstName : $firstName
      lastName : $lastName
      email : $email
      password : $password
      confirmPassword : $confirmPassword
    }
    ){
      token
    }
  }
`

export default Register;