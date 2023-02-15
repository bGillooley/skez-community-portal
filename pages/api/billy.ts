import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import * as cheerio from "cheerio";

interface TrainTimes {
  destination: string;
  departs: string;
}
// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  let trains: TrainTimes[] = [];
  try {
    const response = await fetch(
      "https://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML?StationDesc=Skerries"
    );
    const htmlString = await response.text();
    for (var pair of response.headers.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
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
