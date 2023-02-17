// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from "cheerio";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      "https://www.tidetime.org/europe/ireland/skerries.htm"
    );
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    let tides = [];

    $("#tideTable > tbody > tr > td").each((i, elm) => {
      let tideData = $(elm).html();
      let obj = {
        tides: tideData,
      };
      tides.push(obj);
    });

    res.statusCode = 200;
    return res.json(tides);
  } catch (err) {
    console.log(err);
  }
}
