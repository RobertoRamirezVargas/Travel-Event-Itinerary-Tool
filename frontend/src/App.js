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
const App = () => {
  const [user, setUser] = useState(null);
  console.log("user state:", user);
  console.log("setUser function:", setUser);
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/registration"
          element={<Registration setUser={setUser} />}
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/map" element={<Map />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
