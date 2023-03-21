import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowForwardIos } from "react-icons/md";

const Tides = ({ showTides, setShowTides }) => {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [tideData, setTideData] = useState([]);
  const [loading, setLoading] = useState(false);

  function getTides() {
    setLoading(true);
    fetch("/api/tides", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data) => {
        const tideStuff = JSON.parse(JSON.stringify(data));
        setTideData(tideStuff);
        setLoading(false);
      });
    console.log("It ran..");
  }

  useEffect(() => {
    setInitialRenderComplete(true);
    getTides();
  }, []);

  const handleHideTidesClick = (e) => {
    e.preventDefault();
    setShowTides(false);
  };

  const handleHideTidesKeyUp = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setShowTides(false);
    }
  };

  if (!initialRenderComplete) {
    return null; // this is because a mismatch occurs when getting date from server rather than client
  } else {
    const dayToday = new Date();
    const dayTomorrow = new Date();
    dayTomorrow.setDate(dayToday.getDate() + 1);
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayToday.getDate() + 2);

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
      <AnimatePresence>
        <div className="fixed left-0 top-0 w-full h-full z-50">
          <motion.div
            className="absolute w-full h-full bg-black opacity-50 z-10"
            onClick={handleHideTidesClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
          ></motion.div>
          <div className="relative pointer-events-none flex md:w-screen md:h-screen md:items-center md:justify-center z-50">
            <motion.div
              className="w-full md:w-[520px] h-auto pointer-events-auto"
              initial={{ y: 1500, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeOut", duration: 0.25 }}
              exit={{ y: 1500, opacity: 0 }}
            >
              <div className="w-full pt-0  md:p-0  md:bg-sky-700 text-white md:rounded-t-lg">
                <div className="bg-sky-700 rounded-t-2xl pb-4">
                  <button
                    className="flex w-full flex-col place-content-center mb-2 pt-2  z-50"
                    onClick={handleHideTidesClick}
                    onKeyUp={handleHideTidesKeyUp}
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
                  <h2 className="text-center mx-2 text-xl md:text-2xl">
                    Skerries Tide Times
                  </h2>
                </div>
              </div>
              <div className="bg-slate-100">
                <div className="">
                  <table className="w-full border-separate border-spacing-2">
                    <thead>
                      <tr>
                        <th className="text-center uppercase font-medium text-slate-500 rounded-md bg-white p-1 border-slate-200 border">
                          {dayToday.toLocaleString("en-En", {
                            weekday: "long",
                          })}
                        </th>
                        <th className="text-center uppercase font-medium text-slate-500 rounded-md bg-white p-1 border-slate-200 border">
                          {dayTomorrow.toLocaleString("en-En", {
                            weekday: "long",
                          })}
                        </th>
                        <th className="text-center uppercase font-medium text-slate-500 rounded-md bg-white p-1 border-slate-200 border">
                          {dayAfterTomorrow.toLocaleString("en-En", {
                            weekday: "long",
                          })}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {tideData.slice(0, 3).map((elm, i) => {
                          return (
                            <td
                              key={i}
                              className="align-top pr-2 bg-white p-2 text-center border-slate-200 border rounded-md"
                            >
                              <div
                                dangerouslySetInnerHTML={{ __html: elm.tides }}
                              />
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="hidden md:block bg-sky-700 p-1 rounded-b-2xl"></div>
            </motion.div>
          </div>
        </div>
      </AnimatePresence>
    );
  }
};

export default Tides;
