import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// POST /api/event
export default async function handle(req, res) {
  const { title, category, content, venue, address, eventTime, eventDate } =
    req.body;

  const session = await getSession({ req });
  const result = await prisma.event.create({
    data: {
      title: title,
      category: category,
      content: content,
      venue: venue,
      address: address,
      eventTime: eventTime,
      eventDate: eventDate,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
