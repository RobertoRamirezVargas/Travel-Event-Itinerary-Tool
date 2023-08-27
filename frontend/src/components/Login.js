import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;
const Title = styled.h2`
  font-size: 1.8rem;
  color: #333;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin: 0.5rem;
  width: 100%;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
        // Store the token in localStorage
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
