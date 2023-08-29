import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const EventsContainer = styled.div`
  padding: 2rem;
`;

const EventCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const EventTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const EventDate = styled.p`
  color: #666;
  margin-bottom: 0.25rem;
`;

const EventVenue = styled.p`
  color: #888;
`;

const LocationInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 1rem;
`;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState("Montreal");

  useEffect(() => {
    fetchEvents(location);
  }, [location]);

  const fetchEvents = async (location) => {
    try {
      const response = await axios.get(`/events?location=${location}`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  return (
    <EventsContainer>
      <h2>Event Recommendations</h2>
      <LocationInput
        type="text"
        placeholder="Enter a location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <div>
        {events.map((event) => (
          <EventCard key={event.id}>
            <EventTitle>{event.name}</EventTitle>
            <EventDate>{event.dates.start.localDate}</EventDate>
            <EventVenue>{event._embedded.venues[0].name}</EventVenue>
          </EventCard>
        ))}
      </div>
    </EventsContainer>
  );
};

export default Events;
