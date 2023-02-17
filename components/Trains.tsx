import React, { useEffect, useState } from "react";

const Trains = () => {
  const [northBoundTrains, setNorthBoundTrains] = useState([]);
  const [southBoundTrains, setSouthBoundTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  function getTrains() {
    setLoading(true);
    fetch("/api/trains", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data) => {
        JSON.stringify(data);
        setNorthBoundTrains(data.details1);
        setSouthBoundTrains(data.details2);
      });
    setLoading(false);
    console.log("It ran..");
  }

  useEffect(() => {
    getTrains();
  }, []);

  return (
    <>
      <h2 className="text-2xl">Northbound</h2>

      <div>
        {northBoundTrains === undefined && (
          <p>No trains scheduled at this time</p>
        )}
        {northBoundTrains !== undefined &&
          northBoundTrains.map((e) => {
            return (
              <div key={e.eta}>
                <div>
                  Destination: {e.destination} | Departs: {e.eta}
                </div>
              </div>
            );
          })}
      </div>
      <h2 className="text-2xl">Southbound</h2>
      <div>
        {southBoundTrains === undefined && (
          <p>No trains scheduled at this time</p>
        )}
        {southBoundTrains !== undefined &&
          southBoundTrains.map((e) => {
            return (
              <div key={e.eta}>
                <div>
                  Destination: {e.destination} | Departs: {e.eta}
                </div>
              </div>
            );
          })}
      </div>
      {loading && <div>Loading there...</div>}
      <div className="py-4">
        <button
          className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700"
          onClick={getTrains}
        >
          Update Info
        </button>
        <a
          className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700  ml-4"
          href="https://www.irishrail.ie/en-ie/train-timetables/live-departure-train-times?key=skerries&REQ0JourneyStopskeyID=&HWAI%3DJS%21js=yes&HWAI%3DJS%21ajax=yes#live-departure-anchor"
          target="_blank"
        >
          View on Irish Rail
        </a>
      </div>
    </>
  );
};

export default Trains;
