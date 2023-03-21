import Head from "next/head";
import { Inter } from "@next/font/google";
import React, { useState, useRef, useEffect } from "react";
//import { useVariants, spring } from "@/lib/cursor-variants";
import { GetStaticProps } from "next";
import prisma from "../lib/prisma";
import Event, { EventProps } from "../components/Event";
import Image from "next/image";
import { useRouter } from "next/router";
import themeImg from "../public/static/skez-tide.jpg";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
//import { motion } from "framer-motion";
import { MdWaves, MdTrain } from "react-icons/md";
import { TiWeatherPartlySunny } from "react-icons/ti";
const inter = Inter({ subsets: ["latin"] });

const Trains = dynamic(() => import("@/components/Trains"), {
  loading: () => <div className="fixed invisible">Loading Train Times...</div>,
});

const Tides = dynamic(() => import("@/components/Tides"), {
  loading: () => <div className="fixed invisible">Loading Tide Times...</div>,
});

const Weather = dynamic(() => import("@/components/Weather"), {
  loading: () => <div className="fixed invisible">Loading Weather Data...</div>,
});

export const getStaticProps: GetStaticProps = async () => {
  let feed = await prisma.event.findMany({
    take: 6,
    where: {
      published: true,
      eventDate: {
        gte: new Date(),
      },
    },
    include: {
      author: {
        select: { name: true },
      },
    },
    orderBy: {
      eventDate: "asc",
    },
  });
  feed = JSON.parse(JSON.stringify(feed));
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: EventProps[];
};

const Home: React.FC<Props> = (props) => {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");

  const ref = useRef(null);

  // const variants = useVariants(ref);

  const [showTrains, setShowTrains] = useState(false);
  const [showTides, setShowTides] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const router = useRouter();
  const handleEventsClick = (e) => {
    e.preventDefault();
    router.push("/events");
  };
  const handleEventsKeyUp = (e) => {
    if (e.key == "Enter") {
      router.push("/events");
    }
  };

  return (
    <div className="relative bg-black" ref={ref}>
      <Head>
        <title>Skez Life</title>
        <meta name="description" content="Skerries Community App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex"></meta>
      </Head>
      <Header />

      {/*
      <motion.div
        variants={variants}
        className="fixed z-50 flex justify-center content-center top-0 left-0 w-[10px] h-[10px] bg-slate-400 rounded-[200px] pointer-events-none"
        animate={cursorVariant}
        transition={spring}
      >
        <span className="cursorText">{cursorText}</span>
      </motion.div>
      */}
      <div className="relative lg:fixed lg:h-full lg:w-full" role="contentinfo">
        <Image
          className="z-0 absolute w-full h-full object-cover"
          src={themeImg}
          quality={50}
          loading="eager"
          alt="Skerries Rules"
        />
        <div className="absolute z-10  w-full h-full bg-gradient-to-b from-transparent to-black"></div>
        <div className="relative pt-16 pb-6 px-6 z-20 lg:hidden">
          <h1 className="text-6xl 2xl:text-8xl text-slate-100 text-center">
            SkezLife
          </h1>
          <p className="text-slate-100 text-2xl text-center">
            Today in the Town
          </p>
          <img
            className="py-4 mx-auto"
            src="/static/wiggle-wave.png"
            width="205"
            height="22"
            alt="Skerries Rules"
          />
          <p className="text-slate-100 text-base text-center">
            It's got nothing to do with Vorsprung durch Technik, you know?
          </p>
        </div>
      </div>
      <main>
        <div className="relative flex flex-col 2xl:place-content-center lg:min-h-screen">
          <div className="relative pt-12 pb-16 container mx-auto flex z-20 px-4">
            <div className="hidden lg:flex w-1/3 flex-col place-content-end pr-10 pb-16">
              <h1 className="text-6xl 2xl:text-8xl text-slate-100">SkezLife</h1>
              <p className="text-slate-100 text-3xl">Today in the Town</p>
              <img
                className="py-4"
                src="/static/wiggle-wave.png"
                width="205"
                height="22"
                alt="Skerries Rules"
              />
              <p className="text-slate-100 text-xl pr-8">
                It's got nothing to do with Vorsprung durch Technik, you know?
              </p>
            </div>
            <div className="w-full lg:w-2/3">
              <h2 className="text-slate-100 text-4xl pb-3">What's On</h2>
              <div className="lg:grid lg:grid-cols-4 lg:grid-rows-6 gap-2">
                {props.feed.map((event, index) => (
                  <div
                    key={event.id}
                    className={`mb-2 lg:mb-0 col-span-2 col-start-1 row-start-${
                      index + 1
                    }`}
                  >
                    <Event event={event} />
                  </div>
                ))}
                <div className="row-start-7">
                  <button
                    className="inline-flex mb-2 md:mb-0 w-full md:w-auto cursor-pointer justify-center rounded-lg text-sm font-semibold py-2 px-4 bg-sky-700 text-white hover:bg-sky-900"
                    onClick={handleEventsClick}
                    onKeyUp={handleEventsKeyUp}
                    tabIndex="0"
                  >
                    VIEW ALL EVENTS
                  </button>
                </div>
                <div className="relative hidden lg:block col-span-2 row-span-3 col-start-3 row-start-1">
                  <div className="flex flex-col place-content-end relative rounded-md w-full h-full mb-2 lg:mb-0 bg-sky-700 hover:bg-sky-800">
                    <img
                      src="/static/skez-drone.jpg"
                      className="absolute z-0 rounded-md w-full h-full object-cover"
                      alt="Skez Drone"
                    />
                  </div>
                </div>
                <div className="mb-2 lg:mb-0 row-span-1 col-start-3 row-start-4">
                  <div
                    className="relative flex py-2 flex-col justify-center content-center cursor-pointer rounded-md w-full h-full bg-sky-700 hover:bg-sky-800"
                    onClick={() => setShowTrains(true)}
                    onKeyUp={(e) => {
                      e.key === "Enter" && setShowTrains(true);
                      console.log("Key up ", e.key);
                    }}
                    tabIndex="0"
                  >
                    <div className="flex justify-center text-4xl text-white">
                      <MdTrain />
                    </div>
                    <div className="flex justify-center text-white">
                      TRAIN TIMES
                    </div>
                  </div>
                </div>
                <div className="mb-2 lg:mb-0 row-span-1 col-start-3 row-start-5">
                  <div
                    className="relative flex flex-col py-2 justify-center content-center cursor-pointer rounded-md w-full h-full bg-sky-700 hover:bg-sky-800"
                    onClick={() => setShowTides(true)}
                    onKeyUp={(e) => {
                      e.key === "Enter" && setShowTides(true);
                      console.log("Key up ", e.key);
                    }}
                    tabIndex="0"
                  >
                    <div className="flex justify-center text-4xl text-white">
                      <MdWaves />
                    </div>
                    <div className="flex justify-center text-white">
                      TIDE TIMES
                    </div>
                  </div>
                </div>
                <div className="mb-2 lg:mb-0 row-span-1 col-start-3 row-start-6">
                  <div
                    className="relative flex flex-col py-2 justify-center content-center cursor-pointer rounded-md w-full h-full bg-sky-700 hover:bg-sky-800"
                    onClick={() => {
                      setShowWeather(true);
                    }}
                    onKeyUp={(e) => {
                      e.key === "Enter" && setShowTides(true);
                      console.log("Key up ", e.key);
                    }}
                    tabIndex="0"
                  >
                    <div className="flex justify-center text-4xl text-white">
                      <TiWeatherPartlySunny />
                    </div>
                    <div className="flex justify-center text-white">
                      WEATHER
                    </div>
                  </div>
                </div>
                <div className="row-span-3 col-start-4 hidden lg:block  row-start-4">
                  <div className="flex flex-col place-content-end relative rounded-md w-full h-full bg-slate-500">
                    <img
                      src="/static/skez-night.jpg"
                      className="absolute z-0 rounded-md w-full h-full object-cover"
                      alt="Skez Drone"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {showTrains && (
        <Trains showTrains={showTrains} setShowTrains={setShowTrains} />
      )}
      {showTides && <Tides showTides={showTides} setShowTides={setShowTides} />}
      {showWeather && (
        <Weather
          showWeather={showWeather}
          setShowWeather={setShowWeather}
          weatherData
        />
      )}
    </div>
  );
};

export default Home;
