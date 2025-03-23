import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const { UNSPLASH_API_URL, UNSPLASH_ACCESS_KEY } = process.env;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { query } = req.query;
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await axios.get(`${UNSPLASH_API_URL}/search/photos`, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
      params: {
        query,
        per_page: 12,
        orientation: "portrait",
      },
    });
    return res.status(200).json(response.data.results);
  } catch (error) {
    console.error("Error fetching images:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
