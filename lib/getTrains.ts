import { XMLParser } from "fast-xml-parser";

export const getTrains = async () => {
  const parser = new XMLParser();
  let response = await fetch(
    "https://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML?StationDesc=Skerries"
  );
  let data = await response.text();
  let jObj = await parser.parse(data);
  let trains = jObj.ArrayOfObjStationData.objStationData;
  let result = trains.map((result) => {
    return {
      direction: result.Direction,
      arrival: result.Exparrival,
      destination: result.Destination,
    };
  });
  return result;
};
