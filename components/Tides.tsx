import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Tides = ({ showTides, setShowTides }) => {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [tideData, setTideData] = useState([]);

  function getTides() {
    fetch("/api/tides", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data) => {
        const tideStuff = JSON.parse(JSON.stringify(data));
        setTideData(tideStuff);
      });
    console.log("It ran..");
  }

  useEffect(() => {
    setInitialRenderComplete(true);
    getTides();
  }, []);

  if (!initialRenderComplete) {
    return null; // this is because a mismatch occurs when getting date from server rather than client
  } else {
    const dayToday = new Date();
    const dayTomorrow = new Date();
    dayTomorrow.setDate(dayToday.getDate() + 1);
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayToday.getDate() + 2);
    return (
      <AnimatePresence>
        <div className="fixed left-0 top-0 w-full h-full z-50">
          <motion.div
            className="fixed w-full h-full bg-black opacity-50 z-10"
            onClick={() => setShowTides(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
          ></motion.div>
          <div className="flex w-screen h-screen items-center justify-center">
            <motion.div
              className="bg-white  h-auto z-50 px-2 py-2 lg:px-10 lg:py-10"
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div>
                <h2 className="text-2xl">Skez Tide Times</h2>
                <table>
                  <thead>
                    <tr>
                      <th className="text-left uppercase text-sm">
                        {dayToday.toLocaleString("en-En", {
                          weekday: "long",
                        })}
                      </th>
                      <th className="text-left uppercase text-sm">
                        {dayTomorrow.toLocaleString("en-En", {
                          weekday: "long",
                        })}
                      </th>
                      <th className="text-left uppercase text-sm">
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
                          <td key={i} className="align-top pr-4 text-sm">
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
              <button
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-2 py-1 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                onClick={() => setShowTides(false)}
              >
                DISMISS
              </button>
            </motion.div>
          </div>
        </div>
      </AnimatePresence>
    );
  }
};

export default Tides;
