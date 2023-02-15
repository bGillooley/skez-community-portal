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
      "https://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML?StationDesc=Skerries",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
        },
      }
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
