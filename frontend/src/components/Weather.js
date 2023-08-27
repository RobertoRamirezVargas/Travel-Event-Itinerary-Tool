import React from "react";
import styled from "styled-components";

const WeatherContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #333;
`;

const Weather = () => {
  return (
    <WeatherContainer>
      <Title>Check Weather</Title>
      {/* weather display */}
    </WeatherContainer>
  );
};

export default Weather;
