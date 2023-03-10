// pages/event-drafts.tsx

import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Event, { EventProps } from "../components/Event";
import prisma from "../lib/prisma";
import Header from "@/components/Header";
import Router from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  let drafts = await prisma.event.findMany({
    where: {
      author: { email: session.user.email },
    },
    include: {
      author: {
        select: { name: true },
      },
    },
    orderBy: {
      eventDate: "asc",
    },
  });
  drafts = JSON.parse(JSON.stringify(drafts));
  return {
    props: { drafts },
  };
};

type Props = {
  feed: EventProps[];
};

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/event/${id}`, {
    method: "DELETE",
  });
  Router.reload();
}

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();
  if (session && session.user.role === "admin") {
    console.log("Billy is Happy");
  } else {
    console.log("Billy is sad");
  }
  if (!session) {
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
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </>
    );
  }

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
      <div className="mx-8 lg:mx-auto mt-48 max-w-5xl">
        <h1 className="text-4xl pb-8">Your Events</h1>
        <main className="lg:grid lg:grid-cols-3 lg:gap-4">
          {props.drafts.map((event) => (
            <div className="mb-4 rounded border border-gray-100 bg-slate-50">
              <Event event={event} />
              <div className="p-2 shadow-inner">
                <button
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-2 py-1 text-white shadow-sm hover:bg-red-700 sm:mr-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                  onClick={() => deletePost(event.id)}
                >
                  Delete Event
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: var(--geist-background);
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </>
  );
};

export default Drafts;
