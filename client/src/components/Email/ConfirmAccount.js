import { useEffect, useContext } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Button, Container, Content, Img, Link, Wrapper } from "./styles";

import email from "./email.png";

import axios from "axios";

import { AuthContext } from "../../context/auth";

const ConfirmAccount = () => {
  const navigate = useNavigate();

  const context = useContext(AuthContext);

  const { text } = useParams();

  console.log(text);
  useEffect(() => {
    axios
      .post("http://localhost:5000/activeUser", { email: text })
      .then(({ data }) => {
        context.login(data.token);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    // navigate("/");
  });

  return (
    <Wrapper>
      <Container>
        <Img src={email} alt="emai" />
      </Container>
      <Content>
        <Button>Active Account</Button>
      </Content>
    </Wrapper>
  );
};

export default ConfirmAccount;
