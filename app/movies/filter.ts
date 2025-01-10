import { NextApiRequest, NextApiResponse } from "next";
import { searchMoviesWithFilters } from "@/lib/searchMovies";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query, rating, genre } = req.query;

  try {
    const movies = await searchMoviesWithFilters(
      typeof query === "string" ? query : "",
      rating ? parseFloat(rating as string) : undefined,
      genre ? (genre as string) : undefined
    );
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
