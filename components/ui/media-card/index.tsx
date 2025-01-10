"use client"

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { YouTubeTrailer } from './youtube-trailer';
import { MediaStats } from './media-stats';
import { Button } from '../button';

interface MediaCardProps {
  title: string;
  thumbnailUrl: string;
  youtubeTrailerId: string;
  rating: number;
  duration: string;
  trending: number;
}

export function MediaCard({
  title,
  thumbnailUrl,
  youtubeTrailerId,
  rating,
  duration,
  trending,
}: MediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group transition-all duration-300 hover:shadow-xl"
    >
      <CardContent className="p-6">
        <YouTubeTrailer
          videoId={youtubeTrailerId}
          thumbnailUrl={thumbnailUrl}
          isHovered={isHovered}
        />
        <h3 className="text-lg font-semibold my-2">{title}</h3>
        <div className=''>
        
        <MediaStats
          rating={rating}
          duration={duration}
          trending={trending}
        />
        </div>
      </CardContent>
    </Card>
  );
}