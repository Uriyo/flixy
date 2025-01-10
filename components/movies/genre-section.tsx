"use client"

import { GenreCard } from './genre-card';
import { genres } from '@/lib/constants/genres';

interface GenreSectionProps {
  onGenreSelect: (genre: string) => void;
}

export function GenreSection({ onGenreSelect }: GenreSectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Browse by Genre</h2>
        <p className="text-muted-foreground">Select a genre to explore movies</p>
      </div>
      
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {genres.map((genre) => (
          <GenreCard
            key={genre.id}
            {...genre}
            onSelect={() => onGenreSelect(genre.name)}
          />
        ))}
      </div>
    </div>
  );
}