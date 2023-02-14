// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const cheerio = require("cheerio");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const username = req.body.TWuser;

  const response = await fetch(
    `https://www.tidetime.org/europe/ireland/skerries.htm`
  );
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);
  const tides = $("div#tides-today p").text();
  res.statusCode = 200;
  return res.json({
    user: tides,
  });
}
