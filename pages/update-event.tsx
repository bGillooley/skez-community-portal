// pages/create.tsx

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const Draft: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const query = router.query;
  const id = query.id;

  console.log(query.eventDate);
  const [title, setTitle] = useState(query.title);
  const [content, setContent] = useState(query.content);
  const [venue, setVenue] = useState(query.venue);
  const [address, setAddress] = useState(query.address);
  const [category, setCategory] = useState(query.category);
  const [eventTime, setEventTime] = useState(query.eventTime);
  const [eventDate, setEventDate] = useState(new Date());

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
      <div className="mx-auto my-16 max-w-md">
        <form onSubmit={submitData}>
          <h1 className="text-3xl">Edit Event</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <input
            onChange={(e) => setVenue(e.target.value)}
            placeholder="Venue"
            type="text"
            value={venue}
          />
          <input
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            type="text"
            value={address}
          />
          <select
            onChange={(e) => setCategory(e.target.value)}
            value="Choose Category:"
          >
            <optgroup label="Select Category">
              <option disabled hidden>
                Choose Category:
              </option>
              <option value="music">music</option>
              <option value="sport">sport</option>
              <option value="satanism">satanism</option>
            </optgroup>
          </select>
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Description"
            rows={8}
            value={content}
          />
          <input
            onChange={(e) => setEventTime(e.target.value)}
            placeholder="Event Time"
            type="text"
            value={eventTime}
          />
          <DatePicker
            placeholder="Event Date"
            selected={eventDate}
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
