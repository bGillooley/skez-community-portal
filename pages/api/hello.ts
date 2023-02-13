// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { XMLParser } from "fast-xml-parser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const parser = new XMLParser();
  try {
    const response = await fetch(
      "https://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML?StationDesc=Skerries"
    );
    const data = await response.text();
    let jObj = await parser.parse(data);
    let trains = jObj.ArrayOfObjStationData.objStationData;
    let result = trains.map((result) => {
      return {
        direction: result.Direction,
        arrival: result.Exparrival,
        destination: result.Destination,
      };
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
}
