import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  FaUserCircle,
  FaHome,
  FaCalendar,
  FaMap,
  FaCloudSun,
  FaCalendarAlt,
} from "react-icons/fa";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #f5f5f5;
  }
`;

const ProfileDropdown = styled.div`
  position: relative;
`;

const ProfileIcon = styled(FaUserCircle)`
  width: 30px;
  height: 30px;
  color: #fff;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: none;
  ${ProfileDropdown}:hover & {
    display: block;
  }
`;

const DropdownItem = styled(Link)`
  display: block;
  text-decoration: none;
  color: #333;
  padding: 0.5rem;
  transition: background-color 0.2s;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo to="/">VTP</Logo>
      <NavLinks>
        <NavLink to="/">
          <FaHome /> Home
        </NavLink>
        <NavLink to="/itinerary">
          <FaCalendarAlt /> Create Itinerary
        </NavLink>
        <NavLink to="/map">
          <FaMap /> View Map
        </NavLink>
        <NavLink to="/weather">
          <FaCloudSun /> Check Weather
        </NavLink>
        <NavLink to="/events">
          <FaCalendar /> Local Events
        </NavLink>
        <ProfileDropdown>
          <ProfileIcon />
          <DropdownMenu>
            <DropdownItem to="/Profile">Profile</DropdownItem>
            <DropdownItem to="/login">Log In</DropdownItem>
            <DropdownItem to="/registration">Register</DropdownItem>
          </DropdownMenu>
        </ProfileDropdown>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
