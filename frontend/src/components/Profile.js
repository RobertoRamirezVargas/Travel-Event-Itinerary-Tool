import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const ProfileContent = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  text-align: center;
`;

const ProfileHeader = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
`;

const ProfileInfo = styled.p`
  font-size: 18px;
  margin: 12px 0;
`;

const LogoutButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
`;

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();

  if (!user) {
    return <p>Loading User Data...</p>;
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); // Clear the user state
    navigate("/login");
  };

  return (
    <ProfileContainer>
      <ProfileContent>
        <ProfileHeader>User Profile</ProfileHeader>
        <ProfileInfo>Username: {user.username}</ProfileInfo>
        <ProfileInfo>Email: {user.email}</ProfileInfo>
        <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
        <br />
        <Link to="/">Back to Home</Link>
      </ProfileContent>
    </ProfileContainer>
  );
};
export default Profile;
