import React from "react";

const formatDate = (dateString: string) => {
  const options = { day: "numeric", month: "short", weekday: "short" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  eventDate: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <p>{post.content}</p>
      <p>{formatDate(post.eventDate)}</p>
    </div>
  );
};

export default Post;
