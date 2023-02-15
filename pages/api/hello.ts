// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const cheerio = require("cheerio");

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
      "https://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML?StationDesc=Skerries"
    );
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    $("objStationData")
      .get()
      .map((train) => {
        trains.push({
          destination: $(train).find("Destination").text(),
          departs: $(train).find("Exparrival").text(),
        });
      });
    res.statusCode = 200;
    return res.json(trains);
  } catch (err) {
    console.log(err);
  }
}
