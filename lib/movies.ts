import  {prisma } from '@/lib/prisma';

export async function getMoviesByGenre(genre: string) {
  return await prisma.movies.findMany({
    where: {
      genres: {
        has: genre
      }
    },
    orderBy: {
      rating: 'desc'
    }
  });
}

export async function getFilteredMovies({
  genre,
  search,
  minRating
}: {
  genre?: string;
  search?: string;
  minRating?: number;
}) {
  return await prisma.movies.findMany({
    where: {
      AND: [
        genre ? { genres: { has: genre } } : {},
        search ? { title: { contains: search, mode: 'insensitive' } } : {},
        minRating ? { rating: { gte: minRating } } : {}
      ]
    },
    orderBy: {
      rating: 'desc'
    }
  });
}