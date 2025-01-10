"use client";

import { useEffect, useRef, useState } from 'react';
import { FilterSection } from '@/components/movies/filters/filter';
import { GenreSection } from '@/components/movies/genre-section';
import { MovieFilters } from '@/lib/types/filters';
import { fetchFilteredMovies } from '@/lib/api';
import { MovieGrid } from '@/components/ui/movie-grid';
import { Media } from '@/lib/types';

export default function MoviesPage() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [filters, setFilters] = useState<MovieFilters>({});
  const [movies, setMovies] = useState<Media[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const filterSectionRef = useRef<HTMLDivElement>(null);

  // Handle filter changes
  const handleFilterChange = (newFilters: MovieFilters) => {
    console.log('Filter changed:', newFilters);
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
      genre: selectedGenre || undefined,
    }));
    // Reset movies when filters change
    setMovies([]);
    setHasMore(true);
  };

  // Handle genre selection
  const handleGenreSelect = (genre: string | null) => {
    setSelectedGenre(genre);
    // Reset movies when genre changes
    setMovies([]);
    setHasMore(true);
  };

  // Initial fetch function
  const fetchInitialMovies = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching with params:', {  // Debug log
        genres: selectedGenre || '',
        minRating: filters.minRating,
        maxRating: filters.maxRating,
        minYear: filters.minYear,
        maxYear: filters.maxYear,
      });
      const response = await fetchFilteredMovies({
        page: 1,
        genres: selectedGenre || '',
        minRating: filters.minRating,
        maxRating: filters.maxRating,
        minYear: filters.minYear,
        maxYear: filters.maxYear,
      });
      if (!response.movies) {
        console.error('No movies array in response:', response);
        return;
      }
      
      setMovies(response.movies);
      setHasMore(response.hasMore);
      console.log(response);
    } catch (error) {
      console.error('Error fetching initial movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch more function for pagination
  const fetchMore = async (page: number) => {
    try {
      const response = await fetchFilteredMovies({
        page,
        genres: selectedGenre || '',
        minRating: filters.minRating,
        maxRating: filters.maxRating,
        minYear: filters.minYear,
        maxYear: filters.maxYear,
      });
      
      return response.movies;
    } catch (error) {
      console.error('Error fetching more movies:', error);
      return [];
    }
  };

  // Fetch movies when filters or genre change
  useEffect(() => {
    if (selectedGenre) {
      fetchInitialMovies();
    }
  }, [selectedGenre, filters]);

  // Scroll to filter section when genre is selected
  useEffect(() => {
    if (selectedGenre && filterSectionRef.current) {
      filterSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      window.scrollBy(0, 950);
    }
  }, [selectedGenre]);

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <h1 className="text-3xl font-bold">Movies</h1>
      <GenreSection onGenreSelect={handleGenreSelect} />

      {!selectedGenre ? (
        <></>
      ) : (
        <div ref={filterSectionRef}>
          <FilterSection onFilterChange={handleFilterChange} />
          <MovieGrid 
            movies={movies}
            fetchMore={fetchMore}
            hasMore={hasMore}
          />
        </div>
      )}
    </div>
  );
}