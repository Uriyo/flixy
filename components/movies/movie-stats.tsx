"use client"

import { Star, Clock, Calendar, Tag } from 'lucide-react';

interface MovieStatsProps {
  rating: number;
  duration: string;
  releaseYear: number;
  genre: string;
}

export function MovieStats({ rating, duration, releaseYear, genre }: MovieStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-500" />
        <div>
          <div className="font-semibold">{rating.toFixed(1)}/10</div>
          <div className="text-sm text-muted-foreground">Rating</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5" />
        <div>
          <div className="font-semibold">{duration}</div>
          <div className="text-sm text-muted-foreground">Duration</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        <div>
          <div className="font-semibold">{releaseYear}</div>
          <div className="text-sm text-muted-foreground">Year</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Tag className="w-5 h-5" />
        <div>
          <div className="font-semibold">{genre}</div>
          <div className="text-sm text-muted-foreground">Genre</div>
        </div>
      </div>
    </div>
  );
}