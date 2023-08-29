import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Itinerary from "./components/Itinerary";
import Map from "./components/Map";
import Weather from "./components/Weather";
import Events from "./components/Events";
import GlobalStyle from "./globalStyle";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/registration"
          element={<Registration setUser={setUser} />}
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/profile"
          element={<Profile user={user} setUser={setUser} />}
        />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/map" element={<Map />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
