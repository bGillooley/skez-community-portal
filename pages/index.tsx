import Head from "next/head";
import { Inter } from "@next/font/google";
import React, { useState } from "react";
import { GetStaticProps } from "next";
import prisma from "../lib/prisma";
import Event, { EventProps } from "../components/Event";
import Image from "next/image";
import themeImg from "../public/static/skerries-windmill.jpg";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import { MdWaves, MdTrain } from "react-icons/md";
const inter = Inter({ subsets: ["latin"] });

const Trains = dynamic(() => import("@/components/Trains"), {
  loading: () => "Loading...",
});

const Tides = dynamic(() => import("@/components/Tides"), {
  loading: () => "Loading...",
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
  const [showTrains, setShowTrains] = useState(false);
  const [showTides, setShowTides] = useState(false);
  return (
    <>
      <Head>
        <title>Skez Army Knife</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex"></meta>
      </Head>
      <Header />
      <main className="bg-black relative">
        <div className="relative lg:absolute lg:h-screen lg:w-full">
          <Image
            className="z-0 absolute w-full h-full object-cover"
            src={themeImg}
            quality={50}
            loading="eager"
            alt="Skerries Rules"
          />
          <div className="absolute z-10 rounded-md w-full h-full bg-gradient-to-b from-transparent to-black"></div>
          <div className="relative pt-16 pb-6 px-6 z-20 lg:hidden">
            <h1 className="text-6xl 2xl:text-8xl text-slate-100 text-center">
              Skerries
            </h1>
            <p className="text-slate-100 text-2xl text-center">
              a local app. for local people
            </p>
            <img
              className="py-4 mx-auto"
              src="/static/wiggle-wave.png"
              width="205"
              height="22"
              alt="Skerries Rules"
            />
            <p className="text-slate-100 text-base text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              placerat porta sem sit amet ullamcorper. In nibh turpis, luctus ac
              urna vitae, efficitur bibendum ante
            </p>
          </div>
        </div>
        <div className="relative flex flex-col lg:place-content-end  lg:h-screen">
          <div className="relative flex w-full z-20 px-4 pb-6 xl:px-24 xl:pb-12 2xl:px-44 2xl:pb-24">
            <div className="hidden lg:flex w-1/3 flex-col place-content-end pr-10">
              <h1 className="text-6xl 2xl:text-8xl text-slate-100">Skerries</h1>
              <p className="text-slate-100 text-3xl">
                a local app. for local people
              </p>
              <img
                className="py-4"
                src="/static/wiggle-wave.png"
                width="205"
                height="22"
                alt="Skerries Rules"
              />
              <p className="text-slate-100 text-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent placerat porta sem sit amet ullamcorper. In nibh
                turpis, luctus ac urna vitae, efficitur bibendum ante
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
                <div className="relative col-span-2 row-span-3 col-start-3 row-start-1">
                  <div className="flex flex-col place-content-end relative rounded-md w-full h-full mb-2 lg:mb-0 bg-slate-500">
                    <img
                      src="/static/old-skez.jpg"
                      className="absolute z-0 rounded-md w-full h-full object-cover"
                      alt="Historical Photo of Skerries"
                    />
                  </div>
                </div>
                <div className="row-span-1 col-start-3 row-start-4">
                  <div
                    className="relative flex flex-col justify-center content-center cursor-pointer rounded-md w-full h-full bg-slate-500"
                    onClick={() => setShowTrains(true)}
                  >
                    <div className="flex justify-center text-4xl text-white">
                      <MdTrain />
                    </div>
                    <div className="flex justify-center text-white">
                      TRAIN TIMES
                    </div>
                  </div>
                </div>
                <div className="row-span-1 col-start-3 row-start-5">
                  <div
                    className="relative flex flex-col justify-center content-center cursor-pointer rounded-md w-full h-full bg-slate-500"
                    onClick={() => setShowTides(true)}
                  >
                    <div className="flex justify-center text-4xl text-white">
                      <MdWaves />
                    </div>
                    <div className="flex justify-center text-white">
                      TIDE TIMES
                    </div>
                  </div>
                </div>
                <div className="row-span-1 col-start-3 row-start-6">
                  <div className="relative cursor-pointer rounded-md w-full h-full bg-slate-500"></div>
                </div>
                <div className="row-span-3 col-start-4   row-start-4">
                  <div className="flex flex-col place-content-end relative rounded-md w-full h-full bg-slate-500"></div>
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
    </>
  );
};

export default Home;
