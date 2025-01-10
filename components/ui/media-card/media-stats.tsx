import React from 'react';
import { Star, PlayCircle, TrendingUp,ThumbsUp } from 'lucide-react';

interface MediaStatsProps {
  rating: number;
  duration: string;
  trending: number;
}

export function MediaStats({ rating, duration, trending }: MediaStatsProps) {
  return (
    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
      <span className="flex items-center">
        <Star className="w-4 h-4 mr-1" />
        {rating}/10
        
      </span>
      <span className="flex items-center">
        <PlayCircle className="w-4 h-4 mr-1" />
        {duration}
      </span>
      <span className="flex items-center">
        <TrendingUp className="w-4 h-4 mr-1" />
        {trending}
      </span>
      <span>
        <ThumbsUp className="w-4 h-4 mr-1" />
      </span>
    </div>
  );
}