// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { XMLParser } from "fast-xml-parser";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const parser = new XMLParser();
  return fetch(
    "https://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML?StationDesc=Skerries"
  )
    .then((response) => response.text())
    .then((textResponse) => {
      let jObj = parser.parse(textResponse);
      let trains = jObj.ArrayOfObjStationData.objStationData;
      let result = trains.map((result) => {
        return {
          direction: result.Direction,
          arrival: result.Exparrival,
          destination: result.Destination,
        };
      });
      res.end(JSON.stringify(result));
    })
    .catch((error) => {
      console.log(error);
    });
}
