import React, { useState } from "react";
import Image from "next/image";
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
  const googleStaticMapURL = `https://maps.googleapis.com/maps/api/staticmap?center=${encodedAddress}&zoom=18&markers=color:blue|${encodedAddress}&size=400x400&key=AIzaSyA4BalRHLk2OCd_j-xiyBBfJSXBpiq2J8s`;
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      <div
        onClick={() => setShowDetails(!showDetails)}
        key={event.id}
        className="flex relative justify-between bg-white drop-shadow border border-gray-100 rounded-md py-2 px-3"
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
          <div className="text-sm text-slate-500 text-right">6.30pm</div>
        </div>
      </div>
      {showDetails && (
        <div className="fixed left-0 top-0 w-full h-full z-50">
          <div className="fixed w-full h-full bg-black opacity-50 z-10"></div>
          <div className="flex w-screen h-screen items-center justify-center">
            <div className="bg-white h-auto z-50 px-10 py-10">
              <Image
                src={googleStaticMapURL}
                alt="Google Map"
                width={350}
                height={350}
              />

              <form
                action="http://maps.google.com/maps"
                method="get"
                target="_blank"
              >
                <input type="hidden" name="Your location" />
                <input type="hidden" name="daddr" value={event.address} />
                <input
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-2 py-1 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                  type="submit"
                  value="Get directions"
                />
              </form>
              <button
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-2 py-1 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                onClick={() => setShowDetails(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
