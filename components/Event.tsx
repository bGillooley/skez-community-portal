import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowForwardIos } from "react-icons/md";
import "add-to-calendar-button";
const formatDate = (dateString) => {
  const timeformat = {
    month: "short",
    day: "numeric",
    hour12: false,
  } as const;

  const options = { month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", timeformat);
};

const formatDateLong = (dateString) => {
  const timeformat = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour12: false,
  } as const;

  const options = { day: "numeric", month: "short", weekday: "short" };
  return new Date(dateString).toLocaleDateString("en-GB", timeformat);
};

const formatDateMonth = (dateString) => {
  const timeformat = {
    month: "short",
    hour12: false,
  } as const;

  const options = { month: "short" };
  return new Date(dateString).toLocaleDateString("en-GB", timeformat);
};

const formatDateDay = (dateString) => {
  const timeformat = {
    day: "numeric",
    hour12: false,
  } as const;

  const options = { day: "numeric " };
  return new Date(dateString).toLocaleDateString("en-GB", timeformat);
};

const formatDateWeekDay = (dateString) => {
  const timeformat = {
    weekday: "long",
    hour12: false,
  } as const;

  const options = { weekday: "short" };
  return new Date(dateString).toLocaleDateString("en-GB", timeformat);
};

const calendarDate = (dateStringInput) => {
  const dateString = new Date(dateStringInput);
  const year = dateString.toLocaleString("default", { year: "numeric" });
  const month = dateString.toLocaleString("defanult", { month: "2-digit" });
  const day = dateString.toLocaleString("default", { day: "2-digit" });
  return `${year}-${month}-${day}`;
};

export type EventProps = {
  id: string;
  title: string;
  category: string;
  content: string;
  address: string;
  venue: string;
  linkUrl?: string;
  linkDesc?: string;
  eventDate: string;
  eventTime: string;
  published: boolean;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["add-to-calendar-button"]: CustomElement<AddToCalendarButton>;
    }
  }
}

const Post: React.FC<{ event: EventProps }> = ({ event }) => {
  const encodedAddress = encodeURIComponent(event.address);
  const googleStaticMapURL = `https://maps.googleapis.com/maps/api/staticmap?center=${encodedAddress}&zoom=16&markers=color:red|${encodedAddress}&size=400x400&key=${process.env.NEXT_PUBLIC_GOOGLE_STATIC_MAP_KEY}`;
  const [modalVisible, setModalVisible] = useState(false);

  const handleShowModalClick = (e) => {
    e.preventDefault();
    setModalVisible(true);
  };
  const handleHideModalClick = (e) => {
    e.preventDefault();
    setModalVisible(false);
  };
  const handleShowModalKeyUp = (e) => {
    if (e.key === "Enter") {
      setModalVisible(true);
    }
  };

  const handleHideModalKeyUp = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setModalVisible(false);
    }
  };
  return (
    <>
      <a
        onClick={handleShowModalClick}
        onKeyUp={handleShowModalKeyUp}
        key={event.id}
        className="flex relative bg-white hover:bg-slate-50 drop-shadow border border-gray-100 rounded-md py-2 px-3 cursor-pointer"
        tabIndex="0"
      >
        <div className="flex flex-col pr-4">
          <div className="text-center uppercase">
            {formatDateMonth(event.eventDate)}
          </div>
          <div className="text-center text-xl">
            {formatDateDay(event.eventDate)}
          </div>
        </div>
        <div className="grow">
          <div className="text-sm text-slate-500">
            <span className="font-bold capitalize ">{event.category}</span> -
            {formatDateWeekDay(event.eventDate)} - {event.eventTime}
          </div>
          <div className="text-base text-sky-700 font-semibold">
            {event.title}
          </div>
          <div className="text-sm text-slate-500">{event.venue}</div>
        </div>
      </a>
      <AnimatePresence>
        {modalVisible && (
          <div className="fixed left-0 top-0 w-full h-full z-50">
            <motion.div
              className="fixed w-full h-full bg-black opacity-50 z-10"
              onClick={handleHideModalClick}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
            ></motion.div>
            <div className="flex md:w-screen md:h-screen md:items-center md:justify-center">
              <motion.div
                className="relative w-full md:w-[680px] h-auto z-50 rounded-lg"
                initial={{ y: 500, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.25 }}
                exit={{ y: 500, opacity: 0 }}
              >
                <div className="w-full pt-0  md:p-0 text-white">
                  <div className="bg-sky-700 rounded-t-lg p-4  md:mx-1">
                    <button
                      className="flex absolute right-4 top-2 flex-col place-content-center mb-2  z-50"
                      onClick={handleHideModalClick}
                      onKeyUp={handleHideModalKeyUp}
                      aria-label="close"
                      tabIndex={0}
                      autoFocus
                    >
                      <div className="rotate-90 mx-auto origin-center text-3xl text-slate-400 hover:text-slate-200">
                        <MdArrowForwardIos />
                      </div>
                      <div className="w-full text-slate-400 text-xs">close</div>
                    </button>
                    <div className="text-xs font-semibold uppercase text-slate-300 tracking-wider">
                      {event.category}
                    </div>
                    <h2 className=" text-2xl md:text-2xl pr-14 pb-1">
                      {event.title}
                    </h2>

                    <div className="text-xs font-semibold uppercase text-slate-300 tracking-wider">
                      {formatDateLong(event.eventDate)} | {event.eventTime}
                    </div>
                  </div>
                </div>
                <div className="relative flex flex-col  md:flex-row bg-white">
                  <div className="md:flex md:flex-col justify-between  md:flex-1">
                    <div className="p-4">
                      <div className="p-1 border-2 rounded-md">
                        <div className="md:text-left md:pt-0 text-lg">
                          <div className="text-xs tracking-wider font-semibold text-slate-400">
                            VENUE
                          </div>
                          {event.venue}
                        </div>
                        <div className="md:text-left text-xs text-slate-400">
                          {event.address}
                        </div>

                        <div className=" mt-4 mb-4 w-[50px] h-[4px] bg-sky-900"></div>

                        <div className="text-xs tracking-wider font-semibold text-slate-400">
                          DESCRIPTION
                        </div>
                        <div className="text-left  md:text-left md:px-0 text-md pt-1 text-slate-500">
                          {event.content}
                        </div>
                        {event.linkUrl !== null && (
                          <a
                            className="inline-block cursor-pointer justify-center rounded-lg text-xs font-semibold mt-4 text-slate-700 py-2.5 px-4 bg-slate-100 hover:bg-slate-200"
                            href={event.linkUrl}
                            target="_blank"
                          >
                            {event.linkDesc}
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex place-content-center m-2 pt-4 md:pt-0 md:place-content-start">
                      <add-to-calendar-button
                        name={event.title}
                        description={event.content}
                        startDate={calendarDate(event.eventDate)}
                        startTime={event.eventTime}
                        endTime={event.eventTime}
                        timeZone="Europe/Dublin"
                        location={event.address}
                        options="'Apple','Google','iCal','Outlook.com'"
                        buttonStyle="text"
                        tabIndex={0}
                      ></add-to-calendar-button>
                    </div>
                  </div>

                  <div className="md:flex-1">
                    <div className="relative px-12 pt-4 pb-12 md:py-0 md:px-0">
                      <Image
                        className="w-[100%] hidden md:block"
                        src={googleStaticMapURL}
                        alt="Google Map"
                        width={350}
                        height={350}
                      />
                      <form
                        className="h-[400px] md:h-auto md:absolute bottom-0 right-4"
                        action="https://maps.google.com/maps"
                        method="get"
                        target="_blank"
                      >
                        <input type="hidden" name="Your location" />
                        <input
                          type="hidden"
                          name="daddr"
                          value={event.address}
                        />
                        <input
                          className="inline-flex text-xs font-semibold mb-4 w-full justify-center cursor-pointer rounded-md border border-transparent bg-slate-800 px-4 py-2 text-white shadow-sm hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-xs"
                          type="submit"
                          value="View Map / Get directions"
                          tabIndex={0}
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block p-1 bg-sky-700 text-center rounded-b-lg mx-1"></div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Post;
