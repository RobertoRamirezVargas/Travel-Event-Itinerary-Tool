import React from "react";
import styled from "styled-components";

const MapContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #333;
`;

const Map = () => {
  return (
    <MapContainer>
      <Title>View Map</Title>
      {/* How to make the map view? */}
    </MapContainer>
  );
};

export default Map;
