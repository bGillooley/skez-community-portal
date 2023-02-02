// pages/drafts.tsx

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
      published: false,
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
  drafts: EventProps[];
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/event/${id}`, {
    method: "PUT",
  });
  Router.reload();
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/event/${id}`, {
    method: "DELETE",
  });
  await Router.reload();
}

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <Head>
          <title>Publish Events</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="noindex"></meta>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <h1>Publish events</h1>
        <div>You need to be authenticated to view this page.</div>
      </>
    );
  }

  if (session.user.role === "editor") {
    return (
      <>
        <Head>
          <title>Publish Events</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="noindex"></meta>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <h1>Publish events</h1>
        <div>You need to be authenticated to view this page.</div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Publish Events</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="mx-auto my-16 max-w-md">
        <h1>Publish Events</h1>
        <main>
          {props.drafts.map((event) => (
            <>
              <div
                key={event.id}
                className="flex relative justify-between bg-white drop-shadow-md  mb-2 lg:mb-0 rounded-md py-2 px-3"
              >
                <Event event={event} />
              </div>
              <button
                className="py-4 pr-4"
                onClick={() => publishPost(event.id)}
              >
                Publish
              </button>
              <button
                className="py-4 pr-4 text-red-600"
                onClick={() => deletePost(event.id)}
              >
                Delete
              </button>
            </>
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
