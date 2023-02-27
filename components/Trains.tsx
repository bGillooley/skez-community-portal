import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const Trains = ({ showTrains, setShowTrains }) => {
  const [northBoundTrains, setNorthBoundTrains] = useState([]);
  const [southBoundTrains, setSouthBoundTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  function getTrains() {
    setLoading(true);
    console.log("is loading");
    fetch("/api/trains", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data) => {
        JSON.stringify(data);
        setNorthBoundTrains(data.details1);
        setSouthBoundTrains(data.details2);
        setLoading(false);
        console.log("finished loading");
      });
  }

  useEffect(() => {
    getTrains();
  }, []);

  if (loading) {
    return (
      <AnimatePresence>
        <div className="fixed left-0 top-0 w-full h-full z-50">
          <motion.div
            className="fixed w-full h-full bg-black opacity-50 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
          ></motion.div>
          <div className="w-full h-full  text-white flex justify-center items-center">
            <div className="relative z-20 text-3xl">Loading...</div>
          </div>
        </div>
      </AnimatePresence>
    );
  }

  return (
    <>
      <AnimatePresence>
        <div className="fixed left-0 top-0 w-full h-full z-50">
          <motion.div
            className="fixed w-full h-full bg-black opacity-50 z-10"
            onClick={() => setShowTrains(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
          ></motion.div>
          <div className="flex w-screen h-screen items-center justify-center">
            <motion.div
              className="mx-2 md:w-[480px] h-auto z-50"
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="p-4 text-center text-xl bg-sky-700 text-white rounded-t-lg">
                Next Trains from Skerries Station
              </div>
              <div className="bg-white">
                <div className="p-4">
                  <h2 className="text-2xl text-center">Northbound</h2>
                  <table className="w-full mb-4">
                    <thead>
                      <tr>
                        <th className="text-left p-1">Destination</th>
                        <th className="text-right p-1">Departure Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {northBoundTrains === undefined && (
                        <tr>
                          <td>No trains scheduled at this time</td>
                        </tr>
                      )}

                      {northBoundTrains !== undefined &&
                        northBoundTrains.map((e) => {
                          return (
                            <tr
                              className="odd:bg-slate-100 even:bg-white"
                              key={e.eta}
                            >
                              <td className="text-left p-1">{e.destination}</td>
                              <td className="text-right p-1">{e.eta}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>

                  <h2 className="text-2xl text-center">Southbound</h2>

                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-1">Destination</th>
                        <th className="text-right p-1">Departure Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {southBoundTrains === undefined && (
                        <tr>
                          <td>No trains scheduled at this time</td>
                        </tr>
                      )}

                      {southBoundTrains !== undefined &&
                        southBoundTrains.map((e) => {
                          return (
                            <tr
                              className="odd:bg-slate-100 even:bg-white"
                              key={e.eta}
                            >
                              <td className="text-left p-1">{e.destination}</td>
                              <td className="text-right p-1">{e.eta}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="py-4 text-center bg-slate-50 rounded-b-lg">
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
                <a
                  className="inline-flex justify-center cursor-pointer rounded-lg text-sm font-semibold py-2.5 px-4 bg-red-900 text-white hover:bg-red-700  ml-4"
                  onClick={() => setShowTrains(false)}
                >
                  DISMISS
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default Trains;
