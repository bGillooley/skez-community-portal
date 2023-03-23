import prisma from "../../../lib/prisma";

// DELETE /api/event/:id
export default async function handle(req, res) {
  const postId = req.query.id;
  if (req.method === "DELETE") {
    const event = await prisma.event.delete({
      where: { id: postId },
    });
    res.json(event);
  } else if (req.method === "PUT") {
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
    const update = await prisma.event.update({
      where: { id: postId },
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
      },
    });
    res.json(update);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
