import React from "react";

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
  return (
    <>
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
    </>
  );
};

export default Post;
