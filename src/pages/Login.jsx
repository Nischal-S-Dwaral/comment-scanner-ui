import React, {useState} from 'react';
import styled from "styled-components";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Container = styled.div `
  width: 100vw;
  height: 100vh;
  background: wheat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div `
  padding: 20px;
  width: 25%;
  background-color: black;
  color: white;
`;

const Title = styled.h1 `
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;

const Form = styled.form `
  display: flex;
  flex-direction: column;
`;

const Input = styled.input `
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button `
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: forestgreen;
  color: black;
  cursor: pointer;
  margin: 10px 0;
  border-radius: 15px;
  transition: all 0.5s ease;
  
  &:hover {
    transform: scale(1.1);
    transform-origin: center
  }
`;

const LinkText = styled.a `
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Hr = styled.hr `
  border: none;
  width: 100%;
  height: 1px;
  color: white;
  background-color: white;
`;

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    let error = false;
    let errorMessage = "";

    const handleLoginButtonClick = (event) => {
        event.preventDefault(); // prevents the refresh of the page
    }

    const handleRegisterButtonClick = () => {
        navigate("/register");
    }

    const handleErrorDialogClose = () => {
        console.log("Error")
    };

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input type="text" placeholder="Username"
                           onChange={(e)=> setEmail(e.target.value)}
                    />
                    <Input type="password" placeholder="Password"
                           onChange={(p) => setPassword(p.target.value)}
                    />
                    <Button onClick={handleLoginButtonClick}>LOGIN</Button>
                    <LinkText>DON'T REMEMBER YOUR PASSWORD?</LinkText>
                    <Hr/>
                    <Button onClick={handleRegisterButtonClick}>
                        REGISTER
                    </Button>
                </Form>
                {
                    error &&
                    <Dialog
                        open={error}
                        onClose={handleErrorDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Error while logging into account!!"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {errorMessage}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleErrorDialogClose} autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                }
            </Wrapper>
        </Container>
    );
};

export default Login;
