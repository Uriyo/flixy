// pages/api/movies/genres.ts
import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "@/lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const genres = await prisma.movies.findMany({
      select: { genres: true },
    });

    // Flatten and remove duplicates
    const uniqueGenres = Array.from(new Set(genres.flatMap((movie) => movie.genres)));
    res.status(200).json(uniqueGenres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
