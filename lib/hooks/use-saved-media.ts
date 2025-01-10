"use client"

import { useState, useEffect } from 'react';
import { Movie } from '@/lib/types';

export function useSavedMedia() {
  const [savedMedia, setSavedMedia] = useState<Movie[]>([]);

  useEffect(() => {
    // Load saved media from localStorage
    const saved = localStorage.getItem('savedMedia');
    if (saved) {
      setSavedMedia(JSON.parse(saved));
    }
  }, []);

  const addToList = (movie: Movie) => {
    const updatedList = [...savedMedia, movie];
    setSavedMedia(updatedList);
    localStorage.setItem('savedMedia', JSON.stringify(updatedList));
  };

  const removeFromList = (movieId: number) => {
    const updatedList = savedMedia.filter(item => item.id !== movieId);
    setSavedMedia(updatedList);
    localStorage.setItem('savedMedia', JSON.stringify(updatedList));
  };

  const isInList = (movieId: number) => {
    return savedMedia.some(item => item.id === movieId);
  };

  return {
    savedMedia,
    addToList,
    removeFromList,
    isInList
  };
}