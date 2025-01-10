"use client"

import Image from 'next/image';
import React, { useState } from 'react';

interface YouTubeTrailerProps {
  videoId: string;
  thumbnailUrl: string;
  isHovered: boolean;
}

export function YouTubeTrailer({ videoId, thumbnailUrl, isHovered }: YouTubeTrailerProps) {
    const [imageError, setImageError] = useState(false);
    const fallbackThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
    <div className="aspect-video relative rounded-lg overflow-hidden">
      {isHovered ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&start=6`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <Image
          src={thumbnailUrl}
          fill
          alt="Media file"
          priority
          onError={() => setImageError(true)}
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      )}
    </div>
  );
}