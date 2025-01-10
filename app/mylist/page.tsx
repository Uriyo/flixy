"use client"

import { useState, useEffect, Key } from 'react';
import Link from 'next/link';
import { Film, Tv, Play, Share, Bird,ArrowDownWideNarrow } from 'lucide-react';
import { MediaCard } from '@/components/ui/media-card';
import { Movie } from '@/lib/types';
import { Button } from '@/components/ui/button';
const testSavedMedia = [
    {
      id: 1,
      title: "Inception",
      description: "A skilled thief is given a chance to erase his criminal record if he can successfully plant an idea in a target's mind.",
      releaseYear: 2010,
      genre: "Science Fiction",
      plotRating: 9,
      actingRating: 8.5,
      visualsRating: 9.5,
      soundRating: 9,
      thumbnailUrl: "https://example.com/inception-thumbnail.jpg",
      youtubeTrailerId: "YoHD9XEInc0",
      rating: 8.8
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      description: "Two imprisoned men develop a deep bond while finding ways to cope with the harsh realities of prison life.",
      releaseYear: 1994,
      genre: "Drama",
      plotRating: 9.5,
      actingRating: 9.7,
      visualsRating: 8,
      soundRating: 8.5,
      thumbnailUrl: "https://example.com/shawshank-thumbnail.jpg",
      youtubeTrailerId: "6hB3S9bIaco",
      rating: 9.3
    },
    {
      id: 3,
      title: "The Dark Knight",
      description: "A vigilante hero must confront his most cunning foe while protecting his city from chaos.",
      releaseYear: 2008,
      genre: "Action",
      plotRating: 9.2,
      actingRating: 9.3,
      visualsRating: 9.6,
      soundRating: 9.4,
      thumbnailUrl: "https://example.com/dark-knight-thumbnail.jpg",
      youtubeTrailerId: "EXeTwQWrcwY",
      rating: 9.0
    },
    {
      id: 4,
      title: "Interstellar",
      description: "A team of astronauts venture into a wormhole, risking everything to secure humanity's survival.",
      releaseYear: 2014,
      genre: "Science Fiction",
      plotRating: 8.8,
      actingRating: 9,
      visualsRating: 9.8,
      soundRating: 9.7,
      thumbnailUrl: "https://example.com/interstellar-thumbnail.jpg",
      youtubeTrailerId: "zSWdZVtXT7E",
      rating: 8.6
    }
  ];
  
  const categories = [
    {
      title: "Movies",
      icon: Film,
      href: "/movies",
      description: "Discover the latest blockbusters and timeless classics"
    },
    {
      title: "TV Shows",
      icon: Tv,
      href: "/tv-shows",
      description: "Binge-worthy series and compelling dramas"
    },
    {
      title: "Anime",
      icon: Play,
      href: "/anime",
      description: "Explore popular anime series and movies"
    }
  ];
  
export default function MyListPage() {
  const [savedMedia, setSavedMedia] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    // Here you would typically fetch the user's saved media from your backend
    const loadSavedMedia = async () => {
      try {
        // Temporary: Get from localStorage for demo
        const saved = localStorage.getItem('savedMedia');
        //setSavedMedia(saved ? JSON.parse(saved) : []);
        console.log(testSavedMedia);
        setSavedMedia(testSavedMedia);
      } catch (error) {
        console.error('Error loading saved media:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSavedMedia();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (savedMedia.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 mt-10">My List</h1>
      <p className="flex flex-row text-lg font-thin ">
        You can now share your list{" "}
        <Share className="ml-3 text-lg mb-2 cursor-pointer hover:text-blue-600" />{" "}
      </p>
      <br />
      <br />
      <div className="grid gap-16 md:grid-cols-[1fr,1fr,1fr] mx-auto">
        {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> */}
        <div>
          <h1 className="text-xl mb-2 font-semibold flex flex-row ">
            Movies <ArrowDownWideNarrow className="ml-2 mt-1 text-lg " />
          </h1>
          {savedMedia?.length < 0 ? (
            savedMedia.map((media,index: Key) => <MediaCard key={index} {...media} />)
          ) : (
            <div className="p-6 rounded-lg border bg-card transition-colors hover:bg-accent">
              <Film className="w-12 h-12 mb-4 text-primary" />
              <h2 className="text-lg font-semibold mb-2">Movies </h2>
              <p className="text-muted-foreground text-sm mb-4">Discover the latest blockbusters and timeless classics</p>
              <Button className="w-full">Browse to add movies    </Button>
            </div>
          )}
        </div>
        <div>
          
          <h1 className="text-xl mb-2 font-semibold flex flex-row ">
            TV Shows <ArrowDownWideNarrow className="ml-2 mt-1 text-lg " />
          </h1>
          {savedMedia?.length > 0 ? (
            savedMedia.map((media,index:Key) => <MediaCard key={index} {...media} />)
          ) : (
            <div>No media to display.</div>
          )}
        </div>
        <div>
          <h1 className="text-xl mb-2 font-semibold flex flex-row ">
            Anime <ArrowDownWideNarrow className="ml-2 mt-1 text-lg " />
          </h1>

          {savedMedia?.length > 0 ? (
            savedMedia.map((media,index:Key) => <MediaCard key={index} {...media} />)
          ) : (
            <div>No media to display.</div>
          )}
        </div>
      </div>
    </>
  );
}

function EmptyState() {
  

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
      <Bird className="w-12 h-12 text-primary mx-auto" />
      <br/>
        <h1 className="text-3xl font-bold mb-4">Your List is Empty </h1>
        
        <p className="text-muted-foreground mb-8">
          Start building your watchlist by exploring our collection and share with friends
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
        {categories.map((category,index) => (
          <Link
            key={index}
            href={category.href}
            className="group block"
          >
            <div className="p-6 rounded-lg border bg-card transition-colors hover:bg-accent">
              <category.icon className="w-12 h-12 mb-4 text-primary" />
              <h2 className="text-lg font-semibold mb-2">{category.title}</h2>
              <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
              <Button className="w-full">Browse to add {category.title}</Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}