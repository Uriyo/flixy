"use client";

import { useState, useEffect, useCallback } from 'react';
import { MediaCard } from '@/components/ui/media-card';
import { Media } from '@/lib/types';
import { useInView } from 'react-intersection-observer';

interface MovieGridProps {
  movies: Media[];
  fetchMore: (page: number) => Promise<Media[]>;
  hasMore: boolean;
}

export function MovieGrid({ movies: initialMovies, fetchMore, hasMore: initialHasMore }: MovieGridProps) {
  const [movies, setMovies] = useState<Media[]>(initialMovies);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);
  
  // Create ref for intersection observer
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px', // Load more content before reaching the bottom
  });

  const loadMoreMovies = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const newMovies = await fetchMore(page + 1);
      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies(prev => [...prev, ...newMovies]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error loading more movies:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchMore, page, loading, hasMore]);

  // Handle intersection observer
  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView, loadMoreMovies]);

  // Reset state when initial movies change (e.g., when filters change)
  useEffect(() => {
    setMovies(initialMovies);
    setPage(1);
    setHasMore(initialHasMore);
  }, [initialMovies, initialHasMore]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {movies.map((item, index) => (
          <MediaCard
            key={`${item.title}-${index}`}
            title={item.title}
            thumbnailUrl={
              item.thumbnail_url && item.thumbnail_url !== "N/A"
                ? item.thumbnail_url
                : "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSf1DK32xKMQzqSl8wnY1BLVu_gdwsRYzVSNM6A03r6c-fEwrif8raKzkFRuerw1KHdDICvOw"
            }
            youtubeTrailerId={item.youtube_trailer_id || ""}
            rating={Number(item.rating)}
            duration={item.duration || ""}
            trending={item.trending || 0}
          />
        ))}
      </div>
      
      {movies.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No results found</p>
        </div>
      )}

      {/* Intersection Observer Target & Loading State */}
      <div 
        ref={ref}
        className="w-full py-8 flex justify-center"
      >
        {loading && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          </div>
        )}
        {!hasMore && movies.length > 0 && (
          <p className="text-muted-foreground">No more items to load</p>
        )}
      </div>
    </div>
  );
}