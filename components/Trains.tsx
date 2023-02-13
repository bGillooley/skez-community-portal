import React, { useState } from "react";

const Trains = () => {
  const [trains, setTrains] = useState([]);
  const fetchTrains = async () => {
    const response = await fetch("http://localhost:3000/api/trains", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const trains = await response.json();
    setTrains(trains);
    return;
  };

  fetchTrains();
  return (
    <div>
      <h2>Next Trains</h2>
      <small>From Skerries Train Station</small>
      {trains.map((train, index) => (
        <div className="text-white" key={index}>
          <p>Destination: {train.destination}</p>
          <p>Arrives{train.arrival}</p>
        </div>
      ))}
    </div>
  );
};

export default Trains;
