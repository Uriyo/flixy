"use client"

import React, { useState } from 'react';
import { SearchBar } from '@/components/movies/search-bar';
import { Filters } from '@/components/movies/filters';
import { MediaGrid } from '@/components/ui/media-grid';

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold">Animes</h1>
      
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <Filters
          rating={ratingFilter}
          onRatingChange={setRatingFilter}
        />
      </div>

      <MediaGrid 
        type="anime" 
        searchQuery={searchQuery}
        ratingFilter={ratingFilter}
      />
    </div>
  );
}