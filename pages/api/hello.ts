// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getTrains } from "@/lib/getTrains";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let mitch = await getTrains();
  res.status(200).json(mitch);
}
