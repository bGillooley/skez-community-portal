import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowForwardIos, MdWaves } from "react-icons/md";

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
          {showTides && (
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
          )}
        </AnimatePresence>
      );
    }

    return (
      <AnimatePresence>
        {showTides && (
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
                className="relative w-full md:w-[520px] h-auto pointer-events-auto"
                initial={{ y: 500, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.25 }}
                exit={{ y: 500, opacity: 0 }}
              >
                <div className="relative w-full pt-0  md:p-0 text-white">
                  <div className="relative bg-sky-700 rounded-t-lg p-4 pt-6 md:mx-1">
                    <button
                      className="flex absolute right-4 top-2 flex-col place-content-center mb-2  z-50"
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
                    <h2 className="flex items-center text-lg  md:text-2xl pr-14">
                      <div className="mr-1 text-4xl">
                        <MdWaves />
                      </div>
                      <div className="font-semibold">Skerries Tide Times</div>
                    </h2>
                  </div>
                </div>
                <div className="bg-white pb-96 md:pb-2">
                  <div className="p-4">
                    {tideData.slice(0, 2).map((elm, i) => {
                      let billy = elm.tides;
                      let id = "tideDay" + i;
                      billy = billy.replace(/<\/?strong>/g, "");
                      billy = billy.replace(/(<br ?\/?>)/g, "<span>");
                      billy = billy.replace(/(<\/li>)/g, "</span></li>");

                      return (
                        <div key={i} id={id} className="">
                          <div className="p-1 border-2 rounded-md mb-4">
                            {i === 0 && (
                              <div className="text-center text-lg font-semibold pb-1">
                                TODAY
                              </div>
                            )}
                            {i === 1 && (
                              <div className="text-center font-semibold pb-1">
                                TOMORROW
                              </div>
                            )}

                            <div dangerouslySetInnerHTML={{ __html: billy }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="hidden md:block bg-sky-700 p-1 rounded-b-2xl mx-1"></div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    );
  }
};

export default Tides;
