import { Media } from "@/lib/types";

export function filterMovies(movies: Media[], searchQuery: string, ratingFilter: string): Media[] {
  return movies.filter(movie => {
    const matchesSearch = movie?.title.toLowerCase().includes(searchQuery.toLowerCase());
    console.log(movie);
    const matchesRating = filterByRating(movie?.rating, ratingFilter);
    return matchesSearch && matchesRating;
  });
}

function filterByRating(rating: number, filter: string): boolean {
  switch (filter) {
    case 'high':
      return rating >= 8.5;
    case 'medium':
      return rating >= 7 && rating < 8.5;
    case 'low':
      return rating < 7;
    default:
      return true;
  }
}