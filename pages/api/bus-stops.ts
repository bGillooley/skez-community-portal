// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=ev%20charging%stations%%20near%20Skerries%20County%20Dublin&key=${process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_API_KEY}`
    );

    let ev = await response.json();

    res.statusCode = 200;
    return res.json(ev);
  } catch (err) {
    console.log(err);
  }
}
