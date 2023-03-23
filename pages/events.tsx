import Head from "next/head";
import { Inter } from "@next/font/google";
import React, { useState } from "react";
import { GetStaticProps } from "next";
import prisma from "../lib/prisma";
import Event, { EventProps } from "../components/Event";
import Image from "next/image";
import themeImg from "../public/static/skerries-drone-view.jpg";
import { useRouter } from "next/router";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

const inter = Inter({ subsets: ["latin"] });

function addHours(date, hours) {
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);

  return date;
}

export const getStaticProps: GetStaticProps = async () => {
  let feed = await prisma.event.findMany({
    where: {
      published: true,
      eventDate: {
        gte: addHours(new Date(), -6),
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

const Events: React.FC<Props> = (props) => {
  const router = useRouter();
  const [filter, setFilter] = useState("");

  const searchFilter = (array) => {
    return array.filter((el) => el.category.toLowerCase().includes(filter));
  };

  const handleSelectFilterKeyUp = (filter) => {
    setFilter(filter);
  };

  const filtered = searchFilter(props.feed);

  const handleBackClick = (e) => {
    e.preventDefault();
    router.push("/");
  };
  const handleBackKeyUp = (e) => {
    if (e.key === "Enter") {
      router.push("/");
    }
  };

  return (
    <div className="relative bg-black pb-24">
      <Head>
        <title>SkezLife - Events</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex"></meta>
      </Head>

      <div className="absolute z-50 top-4 left-4 md:top-8 md:left-8 text-3xl text-slate-100">
        <a href="/" onClick={handleBackClick} onKeyUp={handleBackKeyUp}>
          <MdArrowBackIos />
        </a>
      </div>

      <div className="relative md:h-full md:w-full overflow-visible">
        <Image
          className="brightness-40 z-0 absolute w-full h-full object-cover"
          src={themeImg}
          quality={50}
          loading="eager"
          alt="Skerries Rules"
          priority
        />
        <div className="absolute z-10  w-full h-full bg-gradient-to-t from-black"></div>
        <div className="relative z-20">
          <div className="relative pt-24 pb-4 md:pb-8 px-6">
            <h1 className="text-3xl md:text-6xl text-slate-100 text-center">
              What's On in Skerries
            </h1>
          </div>
          <div className="md:hidden relative z-20 text-center text-lg pb-4 text-white">
            <div className="inline-block px-2">Filter: </div>
            <div className="inline-block px-2" onClick={() => setFilter("")}>
              <span className={filter === "" ? "font-bold" : "font-normal"}>
                All Events
              </span>
            </div>
            <div
              className="inline-block px-2"
              onClick={() => setFilter("culture")}
            >
              <span
                className={filter === "culture" ? "font-bold" : "font-normal"}
              >
                Culture
              </span>
            </div>
            <div
              className="inline-block px-2"
              onClick={() => setFilter("music")}
            >
              <span
                className={filter === "music" ? "font-bold" : "font-normal"}
              >
                Music
              </span>
            </div>
            <div
              className="inline-block px-2"
              onClick={() => setFilter("sport")}
            >
              <span
                className={filter === "sport" ? "font-bold" : "font-normal"}
              >
                Sport
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full pb-16 z-50">
        <div className="relative container max-w-5xl mx-auto z-50">
          <div className="flex flex-col md:flex-row md:space-between px-4">
            <main className="grow">
              {filtered.map((event) => (
                <div key={event.id} className="mb-2">
                  <Event event={event} />
                </div>
              ))}
            </main>
            <nav role="navigation" aria-labelledby="filter-by-category">
              <div className="hidden md:block  md:w-[380px] drop-shadow sticky top-0">
                <div className="w-full p-4 mb-2 ml-2 bg-white rounded-md">
                  <h2
                    id="filter-by-category"
                    className="text-2xl mb-4 font-semibold text-center"
                  >
                    FILTER BY CATEGORY
                  </h2>
                  <ul className="text-sky-700">
                    <li
                      className="flex justify-between px-4 py-2 border-b border-slate-400 hover:bg-slate-100 cursor-pointer"
                      onClick={() => setFilter("")}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          setFilter("");
                        }
                      }}
                      tabIndex="0"
                    >
                      <div className="font-semibold">
                        <span
                          className={
                            filter === "" ? "text-black" : "text-sky-700"
                          }
                        >
                          All Events
                        </span>
                      </div>
                      <div className="flex justify-center items-center">
                        <MdArrowForwardIos />
                      </div>
                    </li>
                    <li
                      className="flex justify-between px-4 py-2 border-b border-slate-400 hover:bg-slate-100 cursor-pointer"
                      onClick={() => setFilter("culture")}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          setFilter("culture");
                        }
                      }}
                      tabIndex="0"
                    >
                      <div className="font-semibold">
                        <span
                          className={
                            filter === "culture" ? "text-black" : "text-sky-700"
                          }
                        >
                          Culture
                        </span>
                      </div>
                      <div className="flex justify-center items-center text-sky-700">
                        <MdArrowForwardIos />
                      </div>
                    </li>
                    <li
                      className="flex justify-between px-4 py-2 border-b border-slate-400 hover:bg-slate-100 cursor-pointer"
                      onClick={() => setFilter("music")}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          setFilter("music");
                        }
                      }}
                      tabIndex="0"
                    >
                      <div className="font-semibold">
                        <span
                          className={
                            filter === "music" ? "text-black" : "text-sky-700"
                          }
                        >
                          Music
                        </span>
                      </div>
                      <div className="flex justify-center items-center text-sky-700">
                        <MdArrowForwardIos />
                      </div>
                    </li>
                    <li
                      className="flex justify-between px-4 py-2 border-b border-slate-400 hover:bg-slate-100 cursor-pointer"
                      onClick={() => setFilter("sport")}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          setFilter("music");
                        }
                      }}
                      tabIndex="0"
                    >
                      <div className="font-semibold">
                        <span
                          className={
                            filter === "sport" ? "text-black" : "text-sky-700"
                          }
                        >
                          Sport
                        </span>
                      </div>
                      <div className="flex justify-center items-center text-sky-700">
                        <MdArrowForwardIos />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
