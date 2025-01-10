export interface Media {
  movie_id: number;
  title: string;
  description: string | null;
  release_year: number | null;
  rating: number;
  youtube_trailer_id: string;
  genres: string[];
  duration: string | null;
  cast: string[];
  thumbnail_url: string | null;
  trending?: number; // Add other properties as necessary
}

  export interface Movie extends Media {
    description: string;
    releaseYear: number;
    genre: string;
    plotRating: number;
    actingRating: number;
    visualsRating: number;
    soundRating: number;
  }
  
  export type MediaType = 'movies' | 'tvshows' | 'anime';