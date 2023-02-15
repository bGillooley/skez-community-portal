// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from "cheerio";

interface TrainTimes {
  destination: string;
  departs: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let trains: TrainTimes[] = [];
  try {
    const response = await fetch(
      "https://www.irishrail.ie/en-ie/train-timetables/live-departure-train-times?key=skerries&REQ0JourneyStopskeyID=&HWAI%3DJS%21js=yes&HWAI%3DJS%21ajax=yes#live-departure-anchor"
    );
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const micky = $("#D811").text().replace(/\s/g, "");
    res.statusCode = 200;
    return res.json({ hello: micky });
  } catch (err) {
    console.log(err);
  }
}
