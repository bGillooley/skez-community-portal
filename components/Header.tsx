// Header.tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();
  // const userRole = session.user.role;
  let left = <div className="left"></div>;

  let right = null;

  if (status === "loading") {
    left = (
      <div className="left">
        <Link href="/" legacyBehavior>
          <a className="bold" data-active={isActive("/")}>
            Home
          </a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = <div className="right"></div>;
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/" legacyBehavior>
          <a className="bold text-black" data-active={isActive("/")}>
            Home
          </a>
        </Link>
        {session.user.role === "editor" && (
          <Link href="/event-drafts" legacyBehavior>
            <a data-active={isActive("/event-drafts")}>
              {session.user.name}'s Events
            </a>
          </Link>
        )}
        {session.user.role === "admin" && (
          <Link href="/manage-events" legacyBehavior>
            <a data-active={isActive("/manage-events")}>Manage Events</a>
          </Link>
        )}

        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left a[data-active="true"] {
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create-event" legacyBehavior>
          <button>
            <a>Add Event</a>
          </button>
        </Link>
        <button onClick={() => signOut({ callbackUrl: "/" })}>
          <a>Log out</a>
        </button>
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            border: none;
          }
        `}</style>
      </div>
    );
  }

  if (session) {
    return (
      <div className="w-full top-0 fixed z-40">
        <nav>
          {left}
          {right}
          <style jsx>{`
            nav {
              display: flex;
              padding: 1rem;
              align-items: center;
              background: #f1f5f9;
            }
          `}</style>
        </nav>
      </div>
    );
  }

  return <div className="fixed hidden">I am the invisible header for now</div>;
};

export default Header;
