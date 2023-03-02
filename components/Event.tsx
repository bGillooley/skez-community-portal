import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowForwardIos } from "react-icons/md";

import "add-to-calendar-button";
const formatDate = (dateString) => {
  const timeformat = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour12: false,
  } as const;

  const options = { day: "numeric", month: "short", weekday: "short" };
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

const calendarDate = (dateStringInput) => {
  const dateString = new Date(dateStringInput);
  const year = dateString.toLocaleString("default", { year: "numeric" });
  const month = dateString.toLocaleString("default", { month: "2-digit" });
  const day = dateString.toLocaleString("default", { day: "2-digit" });
  return `${year}-${month}-${day}`;
};

export type EventProps = {
  id: string;
  title: string;
  content: string;
  address: string;
  venue: string;
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
  return (
    <>
      <div
        onClick={() => setModalVisible(true)}
        key={event.id}
        className="flex relative justify-between bg-white hover:bg-slate-100 drop-shadow border border-gray-100 rounded-md py-2 px-3 cursor-pointer"
      >
        <div className="flex-grow">
          <div className="text-base text-black pb-4 truncate overflow-hidden">
            {event.title}
          </div>
          <div className="text-sm text-slate-500">{event.venue}</div>
        </div>
        <div>
          <div className="text-base text-slate-500 pb-4 text-right">
            {formatDate(event.eventDate)}
          </div>
          <div className="text-sm text-slate-500 text-right">
            {event.eventTime}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {modalVisible && (
          <div className="fixed left-0 top-0 w-full h-full z-50">
            <motion.div
              className="fixed w-full h-full bg-black opacity-50 z-10"
              onClick={() => setModalVisible(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
            ></motion.div>
            <div className="flex md:w-screen md:h-screen md:items-center md:justify-center">
              <motion.div
                className="relative w-full md:w-[680px] h-auto z-50 rounded-lg"
                initial={{ y: 1500, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.25 }}
                exit={{ y: 1500, opacity: 0 }}
              >
                <div className="w-full pt-14 md:pt-4 md:p-4  md:bg-sky-700 text-white md:rounded-t-lg">
                  <div className="bg-sky-700 rounded-t-md pb-4 md:pb-0">
                    <div
                      className="md:hidden flex flex-col place-content-center mb-4 pt-2 cursor-pointer z-50"
                      onClick={() => setModalVisible(false)}
                    >
                      <div className="rotate-90 mx-auto origin-center text-3xl text-slate-200">
                        <MdArrowForwardIos />
                      </div>
                      <span className="text-slate-400 text-xs text-center">
                        close
                      </span>
                    </div>
                    <h2 className="text-center mx-2 text-xl md:text-xl">
                      {event.title}
                    </h2>
                    <div className="text-center  text-md text-slate-200">
                      {formatDateLong(event.eventDate)} | {event.eventTime}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col  md:flex-row bg-white">
                  <div className="md:flex md:flex-1 md:justify-center md:items-center">
                    <div className="md:px-4">
                      <div className="text-center md:text-left pt-4 md:pt-0 text-lg">
                        {event.venue}
                      </div>
                      <div className="text-center md:text-left text-xs">
                        {event.address}
                      </div>

                      <div className="mx-auto md:mx-0 mt-4 w-[50px] h-[4px] bg-sky-900"></div>
                      <div className="text-center md:text-left text-md pt-1">
                        {event.content}
                      </div>
                      <div className="flex place-content-center">
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
                        ></add-to-calendar-button>
                      </div>
                    </div>
                  </div>

                  <div className="md:flex-1">
                    <div className="relative px-12 py-4 md:py-0 md:px-0">
                      <Image
                        className="w-[100%]"
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
                          className="inline-flex mb-2 w-full justify-center cursor-pointer rounded-md border border-transparent bg-sky-600 px-4 py-2 text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                          type="submit"
                          value="View Map / Get directions"
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 text-center rounded-b-lg hidden md:block">
                  <button
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-800 px-4 py-2 text-white shadow-sm hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                    onClick={() => setModalVisible(false)}
                  >
                    DISMISS
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Post;
