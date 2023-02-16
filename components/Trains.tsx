import React, { useEffect, useState } from "react";

const Trains = () => {
  const [trainTimes, setTrainTimes] = useState({});
  const [northBoundTrains, setNorthBoundTrains] = useState([]);
  const [southBoundTrains, setSouthBoundTrains] = useState([]);

  function getTrains() {
    fetch("/api/trains")
      .then((res) => res.json())
      .then((data) => {
        JSON.stringify(data);
        setTrainTimes(data);
        setNorthBoundTrains(data.details1);
        setSouthBoundTrains(data.details2);
      });
    console.log("It ran..");
  }

  useEffect(() => {
    getTrains();
  }, [trainTimes, northBoundTrains, southBoundTrains]);

  return (
    <>
      <div>{trainTimes.heading1}</div>
      <div>
        {northBoundTrains.map((e) => {
          return (
            <div key={e.eta}>
              <div>{e.destination}</div>
              <div>{e.duein}</div>
            </div>
          );
        })}
      </div>
      <div>{trainTimes.heading2}</div>
      <div>
        {southBoundTrains.map((e) => {
          return (
            <div key={e.eta}>
              <div>{e.destination}</div>
              <div>{e.duein}</div>
            </div>
          );
        })}
      </div>
      <button onClick={getTrains}>Get Next Trains</button>
    </>
  );
};

export default Trains;
