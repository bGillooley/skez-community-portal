import prisma from "../../../../lib/prisma";

// PUT /api/publish/:id
export default async function handle(req, res) {
  const postId = req.query.id;
  const event = await prisma.event.update({
    where: { id: postId },
    data: { published: true },
  });
  res.json(event);
}
