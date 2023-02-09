import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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

export type EventProps = {
  id: string;
  title: string;
  content: string;
  address: string;
  venue: string;
  eventDate: string;
  published: boolean;
};

const Post: React.FC<{ event: EventProps }> = ({ event }) => {
  const encodedAddress = encodeURIComponent(event.address);
  const googleStaticMapURL = `https://maps.googleapis.com/maps/api/staticmap?center=${encodedAddress}&zoom=18&markers=color:blue|${encodedAddress}&size=400x400&key=${process.env.NEXT_PUBLIC_GOOGLE_STATIC_MAP_KEY}`;
  const [selectedId, setSelectedId] = useState(null);
  return (
    <>
      <motion.div
        layoutId={event.id}
        onClick={() => setSelectedId(event.id)}
        key={event.id}
        className="flex relative justify-between bg-white drop-shadow border border-gray-100 rounded-md py-2 px-3"
      >
        <div className="flex-grow">
          <motion.div className="text-base text-black pb-4 truncate overflow-hidden">
            {event.title}
          </motion.div>
          <div className="text-sm text-slate-500">{event.venue}</div>
        </div>
        <div>
          <div className="text-base text-slate-500 pb-4 text-right">
            {formatDate(event.eventDate)}
          </div>
          <div className="text-sm text-slate-500 text-right">6.30pm</div>
        </div>
      </motion.div>
      <AnimatePresence type="crossfade">
        {selectedId && (
          <div className="fixed left-0 top-0 w-full h-full z-50">
            <div
              className="fixed w-full h-full bg-black opacity-50 z-10"
              onClick={() => setSelectedId(null)}
            ></div>
            <div className="flex w-screen h-screen items-center justify-center">
              <motion.div
                layoutId={selectedId}
                className="bg-white  h-auto z-50 px-2 py-2 lg:px-10 lg:py-10"
              >
                <h2>{event.title}</h2>
                <p>Venue: {event.venue}</p>
                <p>Date: {formatDate(event.eventDate)} | Time: 20:45pm</p>
                <Image
                  src={googleStaticMapURL}
                  alt="Google Map"
                  width={350}
                  height={350}
                />

                <form
                  action="https://maps.google.com/maps"
                  method="get"
                  target="_blank"
                >
                  <input type="hidden" name="Your location" />
                  <input type="hidden" name="daddr" value={event.address} />
                  <input
                    className="inline-flex mb-2 w-full justify-center rounded-md border border-transparent bg-sky-600 px-2 py-1 text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                    type="submit"
                    value="Get directions"
                  />
                </form>
                <button
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-2 py-1 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                  onClick={() => setSelectedId(null)}
                >
                  Close
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Post;
