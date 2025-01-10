import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10); // Default to page 1
  const itemsPerPage = 25;
  const minRating = parseFloat(url.searchParams.get("minRating") || "0");
  const maxRating = parseFloat(url.searchParams.get("maxRating") || "10");
  const genre = url.searchParams.get("genre") || undefined;
  const minYear = parseInt(url.searchParams.get("minYear") || "1900", 10);
  const maxYear = parseInt(url.searchParams.get("maxYear") || "2023", 10);

  const skip = (page - 1) * itemsPerPage;

  try {
    const where: any = {};
    if (genre) {
      where.genres = { has: genre }; // Assumes `genres` is a string array in Prisma schema
    }
    if (minRating || maxRating) {
      where.rating = {
        gte: minRating,
        lte: maxRating
      };
    }
    if (minYear || maxYear) {
      where.release_year = {
        gte: minYear,
        lte: maxYear
      };
    }

    const movies = await prisma.movies.findMany({
      where,
      orderBy: {
        rating: 'desc', // Order by highest rating first
      },
      skip,
      take: itemsPerPage,
    });

    const totalCount = await prisma.movies.count({ where });
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const hasMore = page < totalPages;

    return NextResponse.json(
      { movies,
        totalCount,
        totalPages,
        hasMore,
      }, { status: 200 });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies." },
      { status: 500 }
    );
  }
}
