import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowForwardIos } from "react-icons/md";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { getWeatherData } from "@/lib/getWeather";

const Weather = ({ showWeather, setShowWeather }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [currentWeather, setCurrentWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const today = new Date();
  useEffect(() => {
    const fetchWeather = async () => {
      const results = await getWeatherData("forecast");
      const current = await getWeatherData("current");
      setWeatherData(results);
      setCurrentWeather(current);
      setLoading(false);
    };
    fetchWeather();
  }, []);

  const handleHideWeatherClick = (e) => {
    e.preventDefault();
    setShowWeather(false);
  };

  const handleHideWeatherKeyUp = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setShowWeather(false);
    }
  };

  if (loading) {
    return (
      <AnimatePresence>
        {showWeather && (
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
      {showWeather && (
        <div className="fixed left-0 top-0 w-full h-full z-50">
          <motion.div
            className="absolute w-full h-full bg-black opacity-50 z-10"
            onClick={handleHideWeatherClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
          ></motion.div>
          <div className="relative pointer-events-none flex md:w-screen md:h-screen md:items-center md:justify-center z-50">
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
                    className="flex absolute right-4 top-2 flex-col place-content-center mb-2  z-50"
                    onClick={handleHideWeatherClick}
                    onKeyUp={handleHideWeatherKeyUp}
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
                  <h2 className="flex items-center text-lg md:text-2xl pr-14">
                    <div className="mr-1 text-4xl">
                      <TiWeatherPartlySunny />
                    </div>
                    <div className="font-semibold">Skerries Weather</div>
                  </h2>
                </div>
              </div>
              <div className="bg-slate-100 pb-96 md:pb-4 relative">
                <div className="bg-white">
                  <div className="text-center font-semibold py-4">
                    CURRENTLY
                  </div>
                  <div className="grid grid-cols-6 sm:grid-cols-5">
                    <div className="-translate-y-2 sm:-translate-y-6 col-span-2 sm:col-span-2">
                      {!loading && (
                        <div className="flex place-content-end">
                          <img
                            className="hidden sm:block"
                            src={currentWeather.condition.icon.replace(
                              "64x64",
                              "128x128"
                            )}
                          />
                          <img
                            className="block sm:hidden"
                            src={currentWeather.condition.icon}
                          />
                        </div>
                      )}
                    </div>
                    <div className="text-4xl sm:text-5xl text-center col-span-1 sm:col-span-1">
                      <div className="translate-x-1">
                        {" "}
                        {!loading && currentWeather.temp_c}
                        <span>&#176;</span>
                      </div>
                      <span className="block text-xs">
                        {currentWeather.condition.text}
                      </span>
                    </div>
                    <div className="flex flex-col text-sm px-4 col-span-3 sm:col-span-2">
                      <div className="">
                        <span>Precipitation: </span>
                        <span className="font-semibold">
                          {currentWeather.precip_mm}mm
                        </span>
                      </div>
                      <div className="">
                        <span>Humidity: </span>
                        <span className="font-semibold">
                          {currentWeather.humidity}
                        </span>
                      </div>
                      <div className="">
                        <span>Pressure: </span>
                        <span className="font-semibold">
                          {currentWeather.pressure_mb}mb
                        </span>
                      </div>
                      <div className="">
                        <span>Wind: </span>
                        <span className="font-semibold">
                          {currentWeather.wind_kph} km/h{" "}
                          {currentWeather.wind_dir}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="block uppercase text-center pb-4 pt-4 md:pt-0 text-xs font-normal text-slate-400">
                    Last update: {currentWeather.last_updated.split(" ")[1]}
                  </div>
                </div>
                <div className="flex pt-4 border-t-2 border-slate-300">
                  {weatherData.map((weather, index) => {
                    let weekday = new Date();
                    weekday.setDate(today.getDate() + index);
                    return (
                      <div
                        className="relative flex flex-1 flex-col"
                        key={weather.id}
                      >
                        <div className="text-center font-semibold uppercase">
                          {weekday.toLocaleString("en-En", {
                            weekday: "short",
                          })}
                        </div>
                        <div className="flex w-full justify-center">
                          <img className="margin-auto" src={weather.icon} />
                        </div>
                        <div className="text-center">
                          <span className="font-medium text-black">
                            {Math.round(parseFloat(weather.maxtemp))}&#176;
                          </span>
                          <span className="font-medium text-slate-400">
                            {" "}
                            /{" "}
                          </span>
                          <span className="font-medium text-slate-400">
                            {Math.round(parseFloat(weather.mintemp))}&#176;
                          </span>
                        </div>
                        <div className="text-xs text-center">
                          {weather.condition}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="relative block text-center font-light text-sm text-slate-500 pt-8">
                  Powered by{" "}
                  <a
                    href="https://www.weatherapi.com/"
                    title="Free Weather API"
                    target="_blank"
                  >
                    WeatherAPI.com
                  </a>
                </div>
              </div>
              <div className="hidden md:block bg-sky-700 p-1 rounded-b-2xl mx-1"></div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Weather;
