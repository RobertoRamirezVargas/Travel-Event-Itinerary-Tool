import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const MapContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #333;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 300px;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Map = () => {
  const [apiKey] = useState("AIzaSyB8c5lZda-nCqUcLkH-hOw1BmwpQ7FZpMA");
  const [mapMode] = useState("place");
  const [searchQuery, setSearchQuery] = useState("Montreal");
  const [apiUrl, setApiUrl] = useState("");

  const initialRender = useRef(false);
  useEffect(() => {
    if (!initialRender.current) {
      setApiUrl(
        `https://www.google.com/maps/embed/v1/${mapMode}?key=${apiKey}&q=${searchQuery}`
      );
    } else {
      initialRender.current = false;
    }
  }, [searchQuery, apiKey, mapMode]);

  const handleSearch = () => {
    setApiUrl(
      `https://www.google.com/maps/embed/v1/${mapMode}?key=${apiKey}&q=${searchQuery}`
    );
  };

  return (
    <MapContainer>
      <Title>View Map</Title>
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Enter a location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchBar>
      <iframe
        width="800"
        height="600"
        src={apiUrl}
        allowFullScreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </MapContainer>
  );
};

export default Map;
