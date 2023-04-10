import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// POST /api/event
export default async function handle(req, res) {
  const {
    title,
    category,
    content,
    venue,
    address,
    eventTime,
    eventDate,
    linkUrl,
    linkDesc,
  } = req.body;

  const session = await getSession({ req });
  console.log(session);
  const result = await prisma.event.create({
    data: {
      title: title,
      category: category,
      content: content,
      venue: venue,
      address: address,
      eventTime: eventTime,
      eventDate: eventDate,
      linkUrl: linkUrl,
      linkDesc: linkDesc,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
