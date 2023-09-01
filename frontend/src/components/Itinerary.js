import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import axios from "axios";

const ItineraryContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const SelectionsContainer = styled.div`
  text-align: center;
  padding: 1rem;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 0.5rem;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#f0f0f0" : "white")};
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const CheckIcon = styled(FaCheck)`
  font-size: 1.5rem;
  color: #007bff;
  margin-bottom: 0.5rem;
`;
const SaveButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
`;

const Itinerary = () => {
  const [events, setEvents] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Montreal");
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);

  const navigate = useNavigate();

  const saveItinerary = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      await axios.post(
        "/saveItinerary",
        {
          selectedEvents: selectedEvents,
          selectedRestaurants: selectedRestaurants,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/profile");
    } catch (error) {
      console.error("Error saving itinerary", error);
    }
  };

  useEffect(() => {
    fetchEvents(selectedCity);
    fetchRestaurants(selectedCity);
  }, [selectedCity]);

  const fetchEvents = async (city) => {
    try {
      const response = await axios.get(`/events?location=${city}`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  const fetchRestaurants = async (city) => {
    try {
      const response = await axios.get(
        `/restaurants?location=${city}&term=food`
      );
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants", error);
    }
  };

  const toggleEventSelection = (event) => {
    if (selectedEvents.includes(event)) {
      setSelectedEvents(
        selectedEvents.filter((selectedEvent) => selectedEvent !== event)
      );
    } else {
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  const toggleRestaurantSelection = (restaurant) => {
    if (selectedRestaurants.includes(restaurant)) {
      setSelectedRestaurants(
        selectedRestaurants.filter(
          (selectedRestaurant) => selectedRestaurant !== restaurant
        )
      );
    } else {
      setSelectedRestaurants([...selectedRestaurants, restaurant]);
    }
  };

  return (
    <ItineraryContainer>
      <h2>My Itinerary</h2>

      <label>
        Select City:{" "}
        <input
          type="text"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        />
      </label>
      <SaveButton onClick={saveItinerary}>Save Itinerary</SaveButton>

      <SelectionsContainer>
        <h3>Your Itinerary Selections</h3>
        {selectedEvents.length > 0 && (
          <p>
            Selected Events:{" "}
            {selectedEvents.map((event) => event.name).join(", ")}
          </p>
        )}
        {selectedRestaurants.length > 0 && (
          <p>
            Selected Restaurants:{" "}
            {selectedRestaurants
              .map((restaurant) => restaurant.name)
              .join(", ")}
          </p>
        )}
      </SelectionsContainer>

      <h3>Events</h3>
      <CardContainer>
        {events.map((event) => (
          <Card
            key={event.id}
            isSelected={selectedEvents.includes(event)}
            onClick={() => toggleEventSelection(event)}
          >
            {selectedEvents.includes(event) && <CheckIcon />}
            <h4>{event.name}</h4>
          </Card>
        ))}
      </CardContainer>

      <h3>Restaurants</h3>
      <CardContainer>
        {restaurants.map((restaurant) => (
          <Card
            key={restaurant.id}
            isSelected={selectedRestaurants.includes(restaurant)}
            onClick={() => toggleRestaurantSelection(restaurant)}
          >
            {selectedRestaurants.includes(restaurant) && <CheckIcon />}
            <h4>{restaurant.name}</h4>
          </Card>
        ))}
      </CardContainer>
      <SaveButton onClick={saveItinerary}>Save Itinerary</SaveButton>
    </ItineraryContainer>
  );
};

export default Itinerary;
