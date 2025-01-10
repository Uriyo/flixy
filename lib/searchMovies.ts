// lib/searchMovies.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function searchMoviesWithFilters(query: string, rating?: number, genre?: string) {
  return prisma.movies.findMany({
    where: {
      AND: [
        query
          ? {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
              ],
            }
          : undefined,
        rating ? { rating: { gte: rating } } : undefined,
        genre ? { genres: { has: genre } } : undefined,
      ],
    },
    select: {
      movie_id: true,
      title: true,
      description: true,
      release_year: true,
      rating: true,
      posterURL: true,
    },
  });
}
