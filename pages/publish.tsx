// pages/drafts.tsx

import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import Header from "@/components/Header";
import Router from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  let drafts = await prisma.post.findMany({
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
  drafts: PostProps[];
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  Router.reload();
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
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
          <title>Create Next App</title>
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
          <title>Create Next App</title>
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
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="page">
        <h1>Publish Events</h1>
        <main>
          {props.drafts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
              <button onClick={() => publishPost(post.id)}>Publish</button>
              <button onClick={() => deletePost(post.id)}>Delete</button>
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
