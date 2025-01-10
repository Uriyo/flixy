import { 
    Film, 
    Sword, 
    Heart, 
    Laugh, 
    Ghost, 
    Rocket, 
    Drama, 
    Baby, 
    Glasses,
    Bomb,
    Music,
    Trophy
  } from 'lucide-react';
  
  export const genres = [
    {
      id: 'action',
      name: 'Action',
      description: 'Thrilling adventures and explosive excitement',
      icon: Bomb,
      color: 'text-red-600'
    },
    {
      id: 'drama',
      name: 'Drama',
      description: 'Compelling stories and emotional journeys',
      icon: Drama,
      color: 'text-blue-500'
    },
    {
      id: 'comedy',
      name: 'Comedy',
      description: 'Laugh-out-loud entertainment',
      icon: Laugh,
      color: 'text-yellow-500'
    },
    {
      id: 'romance',
      name: 'Romance',
      description: 'Love stories and heartfelt moments',
      icon: Heart,
      color: 'text-pink-500'
    },
    {
      id: 'scifi',
      name: 'Sci-Fi',
      description: 'Futuristic tales and space adventures',
      icon: Rocket,
      color: 'text-purple-500'
    },
    {
      id: 'horror',
      name: 'Horror',
      description: 'Spine-chilling thrills and scares',
      icon: Ghost,
      color: 'text-gray-500'
    },
    {
      id: 'animation',
      name: 'Animation',
      description: 'Animated features for all ages',
      icon: Baby,
      color: 'text-green-500'
    },
    {
      id: 'documentary',
      name: 'Documentary',
      description: 'Real stories and educational content',
      icon: Glasses,
      color: 'text-amber-500'
    },
    {
      id: 'musical',
      name: 'Musical',
      description: 'Music-filled entertainment',
      icon: Music,
      color: 'text-indigo-500'
    },
    {
      id: 'sports',
      name: 'Sports',
      description: 'Athletic achievements and competition',
      icon: Trophy,
      color: 'text-orange-500'
    },
    {
      id: 'fantasy',
      name: 'Fantasy',
      description: 'Magical worlds and epic adventures',
      icon: Sword,
      color: 'text-teal-500'
    },
    {
      id: 'classic',
      name: 'Classics',
      description: 'Timeless films and masterpieces',
      icon: Film,
      color: 'text-slate-500'
    }
  ];

  export const genrefilters=[
    "Thriller","Documentary","Mystrey and Suspense","Adventure",
    "Action & Adventure","Drama","Comedy","Romance","Sci-fi",
    "Comedy","Horror","Animations"
  ]