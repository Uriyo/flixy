import { Media, MediaType, Movie } from './types';

// const ITEMS_PER_PAGE = 37;
interface FetchMoviesParams {
  page?: number;
  minRating?: number;
  maxRating?: number;
  genres?: string;
  minYear?: number;
  maxYear?: number;
  limit?: number;
}
interface MovieResponse {
  movies: Media[];
  totalPages: number;
  hasMore: boolean;
  totalCount: number;
}
export async function fetchFilteredMovies({
  page = 1,
  minRating = 0,
  maxRating = 10,
  genres = '',
  minYear = 1900,
  maxYear = new Date().getFullYear(),
  limit = 50
}: FetchMoviesParams): Promise<MovieResponse> {
  try {
    // Construct query parameters
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      minRating: minRating.toString(),
      maxRating: maxRating.toString(),
      genres: genres,
      minYear: minYear.toString(),
      maxYear: maxYear.toString(),
    });

    // Make the API request
    const response = await fetch(`/api/movies?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }
    console.log(response);
    const data = await response.json();
    console.log('API response data:', data);

    // Return structured response with pagination info
    return {
      movies: data.movies || [],
      totalPages: data.totalPages || 1,
      hasMore: data.hasMore || false,
      totalCount: data.totalCount || 0
    };
  } catch (error) {
    console.error('Error in fetching movies:', error);
    // Return empty state with pagination info
    return {
      movies: [],
      totalPages: 1,
      hasMore: false,
      totalCount: 0
    };
  }
}
export async function fetchLatestByType(
  type:MediaType
): Promise<Media[]>{
  try{
    const response =await fetch(`/api/${type}/latest?page=1&limit=25`);
    if(!response.ok) throw new Error(`Failed to fetch latest ${type}`);
    return response.json();
  }catch(error){
    console.error("failed to fetch",error);
    return [];
  }
}


export async function fetchMovies(page: number,genre:string ,filters?: { minRating?: number }): Promise<Media[]> {
  const params = new URLSearchParams({ page: String(page), limit: "100" });
  
  if (genre) params.append("genre", genre);
  if (filters?.minRating) params.append("minRating", String(filters.minRating));
  
  const res = await fetch(`/api/movies?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch movies");
  
  return res.json(); // Returns an array of movies directly
}




export async function fetchMovieById(id: string): Promise<Movie | null> {
  try {
    const response = await fetch('/data/movies.json');
    const allMovies: Movie[] = await response.json();
    const movie = allMovies.find(m => m.movie_id.toString() === id);
    
    if (!movie) {
      throw new Error('Movie not found');
    }
    
    return movie;
  } catch (error) {
    console.error('Error fetching movie:', error);
    return null;
  }
}