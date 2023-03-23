// pages/create.tsx

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css?v=1.2";
const Draft: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const query = router.query;
  const id = query.id;

  const [title, setTitle] = useState(query.title);
  const [content, setContent] = useState(query.content);
  const [venue, setVenue] = useState(query.venue);
  const [address, setAddress] = useState(query.address);
  const [category, setCategory] = useState(query.category);
  const [eventTime, setEventTime] = useState(query.eventTime);
  const [eventDate, setEventDate] = useState(new Date());
  const [linkUrl, setLinkUrl] = useState(query.eventUrl);
  const [linkDesc, setLinkDesc] = useState(query.eventDesc);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = {
        title,
        category,
        content,
        venue,
        address,
        eventDate,
        eventTime,
        linkUrl,
        linkDesc,
      };
      await fetch(`/api/event/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (session.user.role === "editor") {
        router.push("/event-drafts");
      }
      if (session.user.role === "admin") {
        router.push("/publish-event");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      console.log(query.eventDate);
      const updateDate = query.eventDate;
      setEventDate(new Date(updateDate));
    }
  }, [query.eventDate]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="bg-slate-100">
        <div className="mx-auto my-16 max-w-md">
          <form onSubmit={submitData}>
            <h1 className="text-3xl mb-8 mt-12">New Event Draft</h1>
            <label className="block text-gray-700 text-sm font-bold mt-4 mb-1">
              Event Title
            </label>
            <input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Short description"
              type="text"
              value={title}
            />
            <label className="block text-gray-700 text-sm font-bold mt-2 mb-1">
              Event Venue
            </label>
            <input
              onChange={(e) => setVenue(e.target.value)}
              placeholder="Venue name"
              type="text"
              value={venue}
            />
            <label className="block text-gray-700 text-sm font-bold mt-4 mb-1">
              Venue Address
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Venue address (for google maps)"
              type="text"
              value={address}
            />
            <label className="block text-gray-700 text-sm font-bold mt-4 mb-1">
              Event Category
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="border-2 rounded-md bg-slate-50 px-1 py-2"
              value={category}
            >
              <option hidden>Select from:</option>
              <option value="culture">culture</option>
              <option value="music">music</option>
              <option value="sport">sport</option>
            </select>
            <label className="block text-gray-700 text-sm font-bold mt-4 mb-1">
              Event Description
            </label>
            <textarea
              cols={50}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Add event description (optional)"
              rows={8}
              value={content}
            />
            <label className="block text-gray-700 text-sm font-bold mt-4 mb-1">
              Event Button Link URL
            </label>
            <input
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="eg. https://yourfacebookpage.etc"
              type="text"
              value={linkUrl}
            />
            <label className="block text-gray-700 text-sm font-bold mt-4 mb-1">
              Event Button Link Label
            </label>
            <input
              onChange={(e) => setLinkDesc(e.target.value)}
              placeholder="eg. Book Tickets etc"
              type="text"
              value={linkDesc}
            />
            <label className="block text-gray-700 text-sm font-bold mt-4 mb-1">
              Event Time
            </label>
            <input
              onChange={(e) => setEventTime(e.target.value)}
              placeholder="eg. 20.30"
              type="text"
              value={eventTime}
            />
            <label className="block text-gray-700 text-sm font-bold mt-4 mb-1">
              Event Date
            </label>
            <DatePicker
              placeholder="Event Date"
              selected={eventDate}
              dateFormat="dd/MM/yyyy"
              onChange={(date: Date) => setEventDate(date)}
            />
            <input disabled={!title} type="submit" value="UPDATE EVENT" />
            <a
              className="back"
              href="#"
              onClick={() => {
                if (session.user.role === "editor") {
                  router.push("/event-drafts");
                }
                if (session.user.role === "admin") {
                  router.push("/publish-event");
                }
              }}
            >
              or Cancel
            </a>
          </form>
        </div>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </>
  );
};

export default Draft;
