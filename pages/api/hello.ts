// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const website = "https://www.tidetime.org/europe/ireland/skerries.htm";
  let html;
  try {
    axios(website).then((response) => {
      const html = response.data;
      res.status(200).json(html);
    });
  } catch (error) {
    console.log(error, error.message);
  }
}
