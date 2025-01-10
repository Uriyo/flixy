"use client";

import React, { useState, useEffect } from 'react';
import { MediaCard } from '@/components/ui/media-card';
import { fetchLatestByType } from '@/lib/api';
import { Media, MediaType } from '@/lib/types';

interface MediaGridProps {
  type: MediaType;
}

export function MediaGrid({ type }: MediaGridProps) {
  const [media, setMedia] = useState<Media[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // const [hasMore, setHasMore] = useState(true);
  // const { ref, inView } = useInView({
  //   threshold: 0,
  //   rootMargin: '100px',
  // });

  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadMoreMedia = async () => {
    //if (loading) return;

    setLoading(true);
    try {
      const newItems = await fetchLatestByType(type);
      setMedia(prev => [...prev, ...newItems]);
      setPage(prev => prev + 1);
      console.log(media);
    } catch (error) {
      console.error("Error loading more media:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMedia([]);
    setPage(1);
    loadMoreMedia();
  }, [type]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {media.map((item, index) => (
          <MediaCard
            key={index}
            title={item.title}
            thumbnailUrl={
              item.thumbnail_url && item.thumbnail_url !== "N/A"
                ? item.thumbnail_url
                : "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSf1DK32xKMQzqSl8wnY1BLVu_gdwsRYzVSNM6A03r6c-fEwrif8raKzkFRuerw1KHdDICvOw"
            }
            youtubeTrailerId={item.youtube_trailer_id || ""}
            rating={Number(item.rating)}
            duration={item.duration}
            trending={item.trending || 0}
          />
        ))}
      </div>
      
      {media.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No results found</p>
        </div>
      )}
      
      <div className="w-full py-8 flex justify-center">
        {loading && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          </div>
        )}
        {  media.length > 0 && (
          <p className="text-muted-foreground">No more items to load</p>
        )}
      </div>
    </div>
  );
}
