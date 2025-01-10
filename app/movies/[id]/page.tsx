"use client"

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { YoutubeTrailer } from '@/components/movies/youtube-trailer';
import { MovieStats } from '@/components/movies/movie-stats';
import { AddToListButton } from '@/components/movies/add-to-my-list-button';
import { PlotRating } from '@/components/movies/plot-rating';
import { fetchMovieById } from '@/lib/api';
import { Movie } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import Grid from '@/components/movies/grid';
import Image from 'next/image';


const actors = [
    {
      imageUrl: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRfHIpfwa5CYyO_kDDFRR-dS1k2Wqx_SzGs1PVhkKhksuFV0d7-5m20Eq07OqLGnkFWrqwX0oasx-g78XbhV0zvCg",
      name: "Brad Pitt"
    },
    {
      imageUrl: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQpiBx_-J6gBh2cdE4UmcWfI2lILjDxvoKDbcv1m3dlcKmYUrbCB-Rfw4cluDGkZKtLgZJFrtG_jM9QYnA3OHqIzg",
      name: "Angelina Jolie"
    },
    {
      imageUrl: "https://i.ytimg.com/vi/xpyrefzvTpI/maxresdefault.jpg",
      name: "Leonardo DiCaprio"
    },
    {
      imageUrl: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSYji4RU7VgVueAszZAVKmqFZ2KrxcWmgy1UMTU5Mq6dF6fKfXYIk6jEwJbGodEGT45zcuOEj0Yek5f2r23xlx9-g",
      name: "Sandra Bullock"
    }
  ];

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await fetchMovieById(id as string);
        setMovie(data);
      } catch (error) {
        console.error('Error loading movie:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return <MovieDetailsSkeleton />;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="container mx-auto  py-8">
      <div className="grid gap-12 md:grid-cols-[2fr,3fr]">
        {/* Left Column - Thumbnail and Quick Stats */}
        <div className="space-y-6">
          {/* <div className="aspect-[2/3] relative rounded-lg overflow-hidden">
            <img
              src={movie.thumbnailUrl}
              alt={movie.title}
              className="object-cover w-full h-full"
            />
          </div> */}
          
          <MovieStats
            rating={movie.rating}
            duration={movie.duration}
            releaseYear={movie.releaseYear}
            genre={movie.genre}
          />
          <AddToListButton movieId={movie.id} />
          <h1 className="text-2xl font-semibold">Plot</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam est
            odit illum, modi cupiditate ex, rem sequi fuga exercitationem iure
            tempora totam omnis deserunt dolor rerum ullam voluptas obcaecati
            mollitia.
          </p>
          <h1 className="text-2xl font-semibold">Cast</h1>
          <div className="grid grid-cols-2 gap-4">
          {actors.map((actor,index) => (
          <div key={index} className="text-center">
            <Image
              src={actor.imageUrl}
              alt={actor.name}
              width={20}
              height={20}
              className="w-full h-40 object-cover rounded"
            />
            <p className="mt-2 text-lg font-medium">{actor.name}</p>
          </div>
        ))}
        </div>
        </div>

        {/* Right Column - Details and Trailer */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            {/* <p className="text-lg text-muted-foreground">{movie.description}</p> */}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Trailer</h2>
            <div className="aspect-video">
              <YoutubeTrailer trailerId={movie.youtubeTrailerId} />
            </div>
          </div>

          <PlotRating
            plot={movie.plotRating}
            acting={movie.actingRating}
            visuals={movie.visualsRating}
            sound={movie.soundRating}
          />
        </div>
      </div>
    </div>
  );
}

function MovieDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-[2fr,3fr]">
        <div className="space-y-6">
          <Skeleton className="aspect-[2/3] w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-24 w-full" />
          </div>
          <Skeleton className="aspect-video w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}