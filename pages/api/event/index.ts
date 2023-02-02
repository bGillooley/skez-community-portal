import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// POST /api/event
export default async function handle(req, res) {
  const { title, content, venue, address, eventDate } = req.body;

  const session = await getSession({ req });
  const result = await prisma.event.create({
    data: {
      title: title,
      content: content,
      venue: venue,
      address: address,
      eventDate: eventDate,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
