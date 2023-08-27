import React from "react";
import styled from "styled-components";

const EventsContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #333;
`;

const Events = () => {
  return (
    <EventsContainer>
      <Title>Local Events</Title>
      {/* code ... */}
    </EventsContainer>
  );
};

export default Events;
