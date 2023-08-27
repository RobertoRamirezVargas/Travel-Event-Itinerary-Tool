import React from "react";

const Profile = ({ user }) => {
  if (!user) {
    return <p>Loading User Data...</p>;
  }
  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};
export default Profile;
