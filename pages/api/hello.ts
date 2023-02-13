// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { XMLParser } from "fast-xml-parser";

import axios from "axios";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const parser = new XMLParser();
  try {
    const response = await axios.get(
      "https://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML?StationDesc=Skerries",
      {
        "Content-Type": "application/xml; charset=utf-8",
      }
    );
    console.log(response);
    let jObj = parser.parse(response.data);
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
