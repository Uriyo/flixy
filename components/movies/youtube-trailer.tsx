"use client"

interface YoutubeTrailerProps {
  trailerId: string;
}

export function YoutubeTrailer({ trailerId }: YoutubeTrailerProps) {
  return (
    <div className="relative w-full h-full">
      <iframe
        src={`https://www.youtube.com/embed/${trailerId}?autoplay=0&rel=0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-lg"
      />
    </div>
  );
}