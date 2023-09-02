import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const ProfileHeader = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #007bff;
`;

const ProfileInfo = styled.p`
  font-size: 18px;
  margin: 12px 0;
  color: #333;
`;

const ItineraryList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ItineraryItem = styled.li`
  margin: 16px 0;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const LogoutButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;
const SectionHeader = styled.h3`
  font-size: 24px;
  margin: 20px 0;
`;

const ListItem = styled.li`
  margin: 16px 0;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
  &:hover {
    background-color: #dcdcdc;
  }
`;

const ItemTitle = styled.h4`
  font-size: 18px;
  margin-bottom: 8px;
`;

const ItemDescription = styled.p`
  font-size: 16px;
`;

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await axios.get("/getItinerary", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("API Response:", response.data);

        setItinerary(response.data.selectedEvents);
        setSelectedRestaurants(response.data.selectedRestaurants);
      } catch (error) {
        console.error("Error fetching itinerary:", error);
      }
    };

    fetchItinerary();
  }, []);

  if (!user) {
    navigate("/login");
    return <p>Loading User Data...</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <ProfileContainer>
      <ProfileContent>
        <ProfileHeader>User Profile</ProfileHeader>
        <ProfileInfo>Username: {user.username}</ProfileInfo>
        <ProfileInfo>Email: {user.email}</ProfileInfo>

        {itinerary.length > 0 && (
          <div>
            <SectionHeader>Your Saved Events:</SectionHeader>
            <ul>
              {itinerary.map((event, index) => (
                <ListItem key={index}>
                  <ItemTitle>{event.name}</ItemTitle>
                  <ItemDescription>Type: {event.type}</ItemDescription>
                  <a href={event.url} target="_blank" rel="noopener noreferrer">
                    Event Details
                  </a>
                </ListItem>
              ))}
            </ul>
          </div>
        )}

        {selectedRestaurants.length > 0 && (
          <div>
            <SectionHeader>Your Selected Restaurants:</SectionHeader>
            <ul>
              {selectedRestaurants.map((restaurant, index) => (
                <ListItem key={index}>
                  <ItemTitle>{restaurant.name}</ItemTitle>
                  <ItemDescription>
                    Cuisine: {restaurant.cuisine}
                  </ItemDescription>
                  <a
                    href={restaurant.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Restaurant Details
                  </a>
                </ListItem>
              ))}
            </ul>
          </div>
        )}

        <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
        <br />
        <Link to="/">Back to Home</Link>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default Profile;
