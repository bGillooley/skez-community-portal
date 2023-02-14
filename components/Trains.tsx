import React, { useState } from "react";

const Trains = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [userFollowers, setUserFollowers] = React.useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/followers", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ TWuser: inputValue }),
    })
      .then((res) => res.json())
      .then((userData) => {
        setUserFollowers(userData);
      });
  };

  return (
    <main>
      <h1>Fetch A Twitter Follower</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a Twitter username
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
      {userFollowers.followerCount >= 0 ? (
        <p>Followers: {userFollowers.followerCount}</p>
      ) : (
        <p>{userFollowers.error}</p>
      )}
    </main>
  );
};

export default Trains;
