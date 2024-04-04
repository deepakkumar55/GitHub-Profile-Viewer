import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [username, setUsername] = useState('');

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {profileData && (
        <div className="card">
          <img src={profileData.avatar_url} alt="Avatar" />
          <h2>{profileData.name}</h2>
          <p>Followers: {profileData.followers}</p>
          <p>Following: {profileData.following}</p>
          <p>Public Repositories: {profileData.public_repos}</p>
          <p>Bio: {profileData.bio}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
