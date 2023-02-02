// pages/create.tsx

import React, { use, useState } from "react";
import Head from "next/head";
import Router from "next/router";
import Header from "@/components/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [venue, setVenue] = useState("");
  const [address, setAddress] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content, venue, address, eventDate };
      await fetch("/api/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/event-drafts");
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
          <h1>New Event Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <input
            autoFocus
            onChange={(e) => setVenue(e.target.value)}
            placeholder="Venue"
            type="text"
            value={venue}
          />
          <input
            autoFocus
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            type="text"
            value={address}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Description"
            rows={8}
            value={content}
          />
          <DatePicker
            selected={eventDate}
            onChange={(date: Date) => setEventDate(date)}
          />
          <input disabled={!title} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
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
