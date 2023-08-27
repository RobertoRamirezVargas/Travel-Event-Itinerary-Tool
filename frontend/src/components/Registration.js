import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const RegistrationContainer = styled.div`
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

const Registration = ({ setUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!username || !email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }
    try {
      const response = await axios.post("/register", {
        username,
        email,
        password,
      });
      //console.log("Registration Response:", response.data);
      setMessage(response.data.message);

      if (response.data.user) {
        //console.log("Registered User Data:", response.data.user);
        setUser(response.data.user);
        navigate("/Login");
      }
    } catch (error) {
      //console.error(error);
      setMessage("Registration failed. Please try again.");
    }
  };
  return (
    <RegistrationContainer>
      <Title>Register</Title>
      <Form onSubmit={handleRegister}>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <Button type="submit">Register</Button>
        <p>{message}</p>
      </Form>
      <p>{message}</p>
      <Link to="/">Back to Home</Link>
    </RegistrationContainer>
  );
};
export default Registration;
