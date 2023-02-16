import React, { useEffect, useState } from "react";

const Trains = () => {
  const [northBoundTrains, setNorthBoundTrains] = useState([]);
  const [southBoundTrains, setSouthBoundTrains] = useState([]);

  function getTrains() {
    fetch("/api/trains", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data) => {
        JSON.stringify(data);
        setNorthBoundTrains(data.details1);
        setSouthBoundTrains(data.details2);
      });
    console.log("It ran..");
  }

  useEffect(() => {
    getTrains();
  }, []);

  return (
    <>
      <h2 className="text-2xl">Northbound</h2>

      <div>
        {northBoundTrains.map((e) => {
          return (
            <div key={e.eta}>
              <div>
                Destination: {e.destination} | Due in: {e.duein}
              </div>
            </div>
          );
        })}
      </div>
      <h2 className="text-2xl">Southbound</h2>
      <div>
        {southBoundTrains.map((e) => {
          return (
            <div key={e.eta}>
              <div>
                Destination: {e.destination} | Due in: {e.duein}
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={getTrains}>Get Next Trains</button>
    </>
  );
};

export default Trains;
