import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  min-height: 100vh;
  position: relative; /* Add this line */

  @media screen and (min-width: 768px) {
    flex-direction: row;
    gap: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
`;

const StyledLink = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s;
  margin: 0.5rem;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>Welcome to Virtual Travel Planner</Title>
      <Subtitle>To continue Please register or Login</Subtitle>
      <StyledLink to="/registration">Sign up</StyledLink>
      <StyledLink to="/login">Login</StyledLink>
      <StyledLink to="/Profile">Profile</StyledLink>
      <StyledLink to="/itinerary">Create Itinerary</StyledLink>
      <StyledLink to="/map">View Map</StyledLink>
      <StyledLink to="/weather">Check Weather</StyledLink>
      <StyledLink to="/events">Local Events</StyledLink>
    </HomeContainer>
  );
};

export default Home;
