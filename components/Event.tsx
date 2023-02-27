import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
            <div className="flex w-screen h-screen items-center justify-center">
              <motion.div
                className="relative bg-white md:w-[680px]  h-auto z-50 m-2 rounded-lg"
                initial={{ scale: 0.75, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="p-4 text-center text-xl bg-sky-700 text-white rounded-t-lg">
                  <h2>{event.title}</h2>
                </div>
                <div className="flex flex-col md:flex-row">
                  <div className="md:flex md:flex-1 md:justify-center md:items-center">
                    <div className="md:px-4">
                      <div className="text-center md:text-left pt-1 text-lg pl-2">
                        {event.venue}
                      </div>
                      <div className="text-center md:text-left text-xs px-2">
                        {event.address}
                      </div>
                      <div className="text-center md:text-left text-md pt-2 pl-2">
                        {formatDateLong(event.eventDate)} | {event.eventTime}
                      </div>
                      <div className="mt-4 ml-2 w-[50px] h-[4px] bg-sky-900"></div>
                      <div className="text-md pl-2 pt-1">{event.content}</div>
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

                  <div className="md:flex-1">
                    <div className="relative">
                      <Image
                        className="w-[100%]"
                        src={googleStaticMapURL}
                        alt="Google Map"
                        width={350}
                        height={350}
                      />
                      <form
                        className="absolute bottom-0 right-4"
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
                          className="inline-flex mb-2 w-full justify-center cursor-pointer rounded-md border border-transparent bg-sky-600 px-2 py-1 text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                          type="submit"
                          value="View Map / Get directions"
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 text-center rounded-b-lg">
                  <button
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-2 py-1 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
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
