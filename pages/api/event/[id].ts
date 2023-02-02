import prisma from "../../../lib/prisma";

// DELETE /api/event/:id
export default async function handle(req, res) {
  const postId = req.query.id;
  if (req.method === "DELETE") {
    const event = await prisma.event.delete({
      where: { id: postId },
    });
    res.json(event);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
