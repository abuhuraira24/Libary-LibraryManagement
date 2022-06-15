import { useState, useContext} from "react";

import {useNavigate} from "react-router-dom"

import {Form, } from "react-bootstrap"

import { gql, useMutation } from '@apollo/client';

import {AuthContext} from "../../context/auth"

import { H2, LogginWrapper } from "./Styles";

import { Input,Button } from "../../Styles/ElementsStyles";

const Login = () => {
  
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({}) 
     const [values, setValues] =  useState({
         email : "",
         password : ""
        })

        const onChange = (e) => {
            setValues({
                ...values,
                [e.target.name] : e.target.value
            })
        }

        const navigate = useNavigate()
        const [addUser, {loading}] = useMutation(LOGIN_USER,{
            update(_, result) {
                const token = result.data.login.token;
                context.login(token)
                navigate('/')
           },
           onError(err) {
             console.log(err.graphQLErrors)
               if(err.graphQLErrors[0]){
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
      <LogginWrapper>
        <H2>Login Here</H2>
         <Form onSubmit={submitHandle}>
                <Form.Group className="mb-3">
                    <Form.Label>* Email</Form.Label>
                    <Input 
                      type="email" 
                      placeholder="Enter Email Name" 
                      onChange={onChange}
                      name="email"
                      />
                    
                    { Object.keys(errors).length !== 0 && !loading && (
                        <Form.Text className="text-red">
                          {errors.email}
                       </Form.Text>
                    )}
                </Form.Group>

        

                <Form.Group className="mb-3">
                    <Form.Label>*Password</Form.Label>
                    <Input 
                      type="Password" 
                      placeholder="Password" 
                      onChange={onChange}
                      name="password"
                      />
                      {Object.keys(errors).length !== 0 &&!loading && (
                        <Form.Text className="text-red">
                          {errors.password}
                       </Form.Text>
                    )}
                     {Object.keys(errors).length !== 0 &&!loading && (
                        <Form.Text className="text-red">
                          {errors.genaral}
                       </Form.Text>
                    )}
                </Form.Group>
            
                <Button bg="#2c51ca" color="#fff" type="submit">
                    Submit
                </Button>
          </Form>
      </LogginWrapper>
    );
}



const LOGIN_USER = gql`
  mutation($email: String!, $password: String!){
  login(email: $email, password: $password) {
    token
  }
}
`

export default Login;