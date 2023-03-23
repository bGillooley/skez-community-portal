import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowForwardIos, MdTrain, MdInfoOutline } from "react-icons/md";

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
        console.log(data.details1);
      });
  }

  useEffect(() => {
    getTrains();
  }, []);

  const handleHideTrainsClick = (e) => {
    e.preventDefault();
    setShowTrains(false);
  };

  const handleHideTrainsKeyUp = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setShowTrains(false);
    }
  };

  if (loading) {
    return (
      <AnimatePresence>
        {showTrains && (
          <div className="absolute left-0 top-0 w-full h-full z-50">
            <motion.div
              className="absolute w-full h-full bg-black opacity-50 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
            ></motion.div>
            <div className="absolute w-full h-full  text-white flex justify-center items-center">
              <div className="relative z-20 text-3xl">Loading...</div>
            </div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <>
      <AnimatePresence>
        {showTrains && (
          <div className="fixed left-0 top-0 w-full h-full z-50">
            <motion.div
              className="fixed w-full h-full bg-black opacity-50 z-10"
              onClick={() => setShowTrains(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
            ></motion.div>
            <div className="relative md:flex pointer-events-none md:w-screen md:h-screen md:items-center md:justify-center z-50">
              <motion.div
                className="w-full md:w-[520px] h-auto pointer-events-auto"
                initial={{ y: 500, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.25 }}
                exit={{ y: 500, opacity: 0 }}
              >
                <div className="w-full pt-0  md:p-0 text-white">
                  <div className="relative bg-sky-700 rounded-t-lg p-4 pt-6 md:mx-1">
                    <button
                      className="flex absolute right-6 top-2 flex-col place-content-center mb-2  z-50"
                      onClick={handleHideTrainsClick}
                      onKeyUp={handleHideTrainsKeyUp}
                      aria-label="close"
                      tabIndex={0}
                      autoFocus
                    >
                      <div className="rotate-90 mx-auto origin-center text-3xl text-slate-300">
                        <MdArrowForwardIos />
                      </div>
                      <div className="w-full text-slate-400 text-xs text-center">
                        close
                      </div>
                    </button>
                    <h2 className="flex items-center text-2xl pr-14 pt-2">
                      <div className="mr-1 text-4xl">
                        <MdTrain />
                      </div>
                      <div>Next Trains from Skerries Station</div>
                    </h2>
                  </div>
                </div>
                <div className="bg-white">
                  <div className="p-4">
                    <div className="p-1 border-2 rounded-md mb-4">
                      <h2 className="text-md uppercase  text-center font-semibold">
                        Northbound
                      </h2>
                      <table className="w-full mb-4">
                        <thead>
                          <tr>
                            <th className="text-left text-xs uppercase tracking-wider font-semibold p-1">
                              Destination
                            </th>
                            <th className="text-right text-xs uppercase tracking-wider font-semibold p-1">
                              Departure Time
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {northBoundTrains === undefined && (
                            <tr>
                              <td colSpan="2">
                                No trains scheduled at this time
                              </td>
                            </tr>
                          )}

                          {northBoundTrains !== undefined &&
                            northBoundTrains.map((e) => {
                              return (
                                <tr
                                  className="odd:bg-slate-100 even:bg-white"
                                  key={e.eta}
                                >
                                  <td className="relative text-left p-1">
                                    <span>{e.destination}</span>
                                    <span className="text-xs"> {e.info}</span>
                                  </td>
                                  <td className="text-right p-1">{e.eta}</td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-1 border-2 rounded-md">
                      <h2 className="text-md uppercase text-center font-semibold">
                        Southbound
                      </h2>

                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="text-left text-xs uppercase tracking-wider font-semibold p-1">
                              Destination
                            </th>
                            <th className="text-right text-xs uppercase tracking-wider font-semibold p-1">
                              Departure Time
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {southBoundTrains === undefined && (
                            <tr>
                              <td colSpan="2">
                                No trains scheduled at this time
                              </td>
                            </tr>
                          )}

                          {southBoundTrains !== undefined &&
                            southBoundTrains.map((e) => {
                              return (
                                <tr
                                  className="odd:bg-slate-100 even:bg-white"
                                  key={e.eta}
                                >
                                  <td className="relative text-left p-1">
                                    <div>{e.destination}</div>
                                    {e.info !== "" && (
                                      <div>
                                        {" "}
                                        <MdInfoOutline className="inline text-lg text-slate-500" />
                                        <span className="ml-1 text-xs text-slate-500">
                                          {e.info}
                                        </span>
                                      </div>
                                    )}
                                  </td>
                                  <td className="text-right p-1">
                                    <span>{e.eta}</span>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="py-4 pb-96 md:pb-4 text-center bg-slate-100 border-t-2 border-slate-300">
                  <button
                    className="inline-flex cursor-pointer justify-center rounded-lg text-xs font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700"
                    onClick={getTrains}
                  >
                    Update Info
                  </button>
                  <a
                    className="inline-flex cursor-pointer justify-center rounded-lg text-xs font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700  ml-4"
                    href="https://www.irishrail.ie/en-ie/train-timetables/live-departure-train-times?key=skerries&REQ0JourneyStopskeyID=&HWAI%3DJS%21js=yes&HWAI%3DJS%21ajax=yes#live-departure-anchor"
                    target="_blank"
                  >
                    View on Irish Rail
                  </a>
                </div>
                <div className="hidden md:block bg-sky-700 p-1 rounded-b-2xl mx-1"></div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Trains;
