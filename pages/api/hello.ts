// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getTrains } from "@/lib/getTrains";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let mitch = await fetch(
      "https://api.kucoin.com/api/v1/market/stats?symbol=BTC-USDT"
    );
    const data = await mitch.json();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
}
