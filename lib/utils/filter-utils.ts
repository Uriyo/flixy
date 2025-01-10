import { MovieFilters, RatingOption } from '../types/filters';
import { RATING_OPTIONS } from '../constants/filter-options';
import { Movies } from '@prisma/client';

export function getRatingRange(ratingValue: string): RatingOption['range'] {
  const option = RATING_OPTIONS.find(opt => opt.value === ratingValue);
  return option?.range || { min: 0, max: 10 };
}

export function applyMovieFilters(movies: Movies[], filters: MovieFilters): Movies[] {
  return movies.filter(movie => {
    const matchesSearch = !filters.search || 
      movie.title.toLowerCase().includes(filters.search.toLowerCase());

    const matchesGenre = !filters.genre || 
      movie.genres.includes(filters.genre);

    const matchesRating = !filters.rating || 
      isInRatingRange(movie.rating, getRatingRange(filters.rating));

    const matchesYear = !filters.yearRange || 
      isInYearRange(movie.release_year, filters.yearRange);

    return matchesSearch && matchesGenre && matchesRating && matchesYear;
  });
}

function isInRatingRange(rating: number, range: { min: number; max: number }): boolean {
  return rating >= range.min && rating <= range.max;
}

function isInYearRange(
  year: number | null, 
  range: { start: number; end: number }
): boolean {
  if (!year) return false;
  return year >= range.start && year <= range.end;
}