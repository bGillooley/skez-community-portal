// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from "cheerio";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      "https://www.irishrail.ie/en-ie/train-timetables/live-departure-train-times?key=skerries&REQ0JourneyStopskeyID=&HWAI%3DJS%21js=yes&HWAI%3DJS%21ajax=yes#live-departure-anchor",
      { cache: "no-cache" }
    );
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    let trains = {};
    $("div.ir-live-timetable > table")
      .toArray()
      .map((element, i) => {
        const section = $(element).find("caption:first").text().trim();
        trains["heading" + (i + 1)] = section;
        trains["details" + (i + 1)] = [];
        let obj = {};
        $(element)
          .find("tbody > tr:not([class])")
          .each((idx, elm) => {
            let obj = {
              destination: $(elm)
                .find("button:first")
                .text()
                .trim()
                .replace(/\s*[\[{(].*?[)}\]]\s*/g, ""),
              eta: $(elm).find("td:nth-child(4)").text().trim(),
              duein: $(elm).find("td:nth-child(5)").text().trim(),
              info: $(elm).find("td:nth-child(6)").text().trim(),
            };
            trains["details" + (i + 1)].push(obj);
          });
      });

    res.statusCode = 200;
    return res.json(trains);
  } catch (err) {
    console.log(err);
  }
}
