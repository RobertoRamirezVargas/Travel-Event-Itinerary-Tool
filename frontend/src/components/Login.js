import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginContainer = styled.div`
  text-align: center;
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin: 0.5rem 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
`;

const Message = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const BackToHomeLink = styled(Link)`
  font-size: 1rem;
  margin-top: 1rem;
  text-decoration: none;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      const { message, token, user } = response.data;
      setMessage(message);
      setUser(user);

      if (token) {
        localStorage.setItem("token", token);

        navigate("/Profile");
      }
    } catch (error) {
      console.error(error);
      setMessage("Login failed. Please try again.");
    }
  };
  return (
    <LoginContainer>
      <Title>Login</Title>

      <Form>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Login</Button>
        <p>{message}</p>
      </Form>
      <p>{message}</p>
      <Link to="/">Back to Home</Link>
    </LoginContainer>
  );
};
export default Login;
