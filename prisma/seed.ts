// const { PrismaClient } = require('@prisma/client');
// const fs = require('fs');

// const prisma = new PrismaClient();
// interface TvShows {
//   id: number;
//   title: string;
//   thumbnailUrl: string;
//   youtubeTrailerId: string;
//   rating: number;
//   duration: string;
//   trending: boolean;
// }

// async function main() {
//   // Read and transform JSON data
//   const movies = JSON.parse(fs.readFileSync('../project/public/data/tvshows.json', 'utf-8'));
//   const transformedMovies = movies.map((movie:TvShows) => ({
//     title: movie.title,
//     genres: [],
//     release_year: null,
//     duration: movie.duration,
//     cast: [],
//     rating: movie.rating,
//     description: null,
//     thumbnail_url: movie.thumbnailUrl || null,
//     youtube_trailer_id: movie.youtubeTrailerId
//   }));

//   // Insert the data
//   await prisma.TvShow.createMany({
//     data: transformedMovies,
//     skipDuplicates: true, 
//   });

//   console.log('Data inserted successfully!');
// }

// main()
//   .catch(e => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// const { PrismaClient } = require('@prisma/client');
// const fs = require('fs');

// const prisma = new PrismaClient();

// interface Movie {
//   movieId: number;
//   title: string;
//   genres: string; // The genres will be a string with '|' separated values
// }

// async function main() {
//   // Read the movie data
//   const movies = JSON.parse(fs.readFileSync('../project/public/data/movies.json', 'utf-8'));

//   // Function to extract the release year from the title
//   const extractReleaseYear = (title: string): number | null => {
//     const match = title.match(/\((\d{4})\)/);
//     return match ? parseInt(match[1], 10) : null;
//   };

//   // Transform the movie data
//   const transformedMovies = movies.map((movie: Movie) => ({
//     title: movie.title,
//     genres: movie.genres ? movie.genres.split('|') : [], 
//     release_year: extractReleaseYear(movie.title), // Extract the release year from the title
//     duration: null, // Adjust as needed
//     rating: 0, // Adjust as needed
//     description: "", // Adjust as needed
//     posterURL: null, // Adjust as needed
//     trailerURL: "" // Adjust as needed
//   }));

//   // Insert the data into the database
//   await prisma.Movies.createMany({
//     data: transformedMovies,
//     skipDuplicates: true, // Avoid inserting duplicates
//   });
  
//   console.log('Movies data inserted successfully!');
//   console.log(transformedMovies);
// }

// main()
//   .catch(e => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });


// const { PrismaClient } = require('@prisma/client');
// const fs = require('fs');

// const prisma = new PrismaClient();

// interface Movie {
//   movieId: number;
//   title: string;
//   genres: string; // The genres will be a string with '|' separated values
// }

// async function main() {
//   // Read the movie data
//   const movies = JSON.parse(fs.readFileSync('../data/movies.json', 'utf-8'));

//   // Function to extract the release year from the title
//   const extractReleaseYear = (title: string): number | null => {
//     const match = title.match(/\((\d{4})\)/);
//     return match ? parseInt(match[1], 10) : null;
//   };

//   // Transform the movie data
//   const transformedMovies = movies.map((movie: Movie) => ({
//     title: movie.title,
//     genres: movie.genres ? movie.genres.split('|') : [],
//     release_year: extractReleaseYear(movie.title),
//     duration: null,
//     rating: 0,
//     description: "",
//     posterURL: null,
//     trailerURL: ""
//   }));

//   // Check for existing movies in the database based on title
//   const existingMovies = await prisma.Movies.findMany({
//     where: {
//       title: {
//         in: transformedMovies.map((movie: { title: any; }) => movie.title),
//       },
//     },
//   });

//   // Filter out movies that already exist
//   const newMovies = transformedMovies.filter(
//     (movie: { title: any; }) => !existingMovies.some((existingMovie: { title: any; }) => existingMovie.title === movie.title)
//   );

//   // Insert only new movies
//   if (newMovies.length > 0) {
//     await prisma.Movies.createMany({
//       data: newMovies,
//       skipDuplicates: true,
//     });
//     console.log(`${newMovies.length} new movie(s) inserted.`);
//   } else {
//     console.log('No new movies to insert.');
//   }

//   console.log('Transformed Movies:', transformedMovies);
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// import { PrismaClient } from '@prisma/client';
// import { promises as fs } from 'fs';

// const prisma = new PrismaClient();

// interface NetflixData {
//   show_id: string;
//   type: string;
//   title: string;
//   director: string;
//   cast: string;
//   country: string;
//   date_added: string;
//   release_year: number;
//   rating: string;
//   duration: string;
//   listed_in: string;
//   description: string;
// }
// interface AnimeData{
//    uid: number;
//    title: string;
//    synopsis: string;
//    genre: string;
//    aired: string;
//    episodes: number;
//    members: number;
//    popularity: number;
//    ranked: number;
//    score: string;
//    img_url: string;
//    link: string;
// }

// interface MovieData {
//   title: string;
//   description: string;
//   release_year: number | null;
//   rating: number;
//   trailerURL: string;
//   genres: string[];
//   duration: string | null;
//   cast: string[];
//   posterURL: string | null;
// }

// interface TvShowData {
//   title: string;
//   description: string;
//   release_year: number | null;
//   rating: number;
//   youtube_trailer_id: string | null;
//   genres: string[];
//   duration: string;
//   cast: string[];
//   thumbnail_url: string | null;
// }
// interface Anime{
// id:	number;	
// title	:string;
// thumbnail_url	:string	;
// youtube_trailer_id:string	;
// rating	:number	;
// duration:string	;
// release_year	:number	;
// genres	:string[];
// description	:string;
// }
// function normalizeRating(rating: string): number {
//   // Convert rating to a number between 0 and 9.99
//   const numRating = parseFloat(rating) || 0;
//   return Math.min(Math.max(numRating, 0), 9.99);
// }

// async function importData() {
//   try {
//     const rawData = await fs.readFile('../data/amazon_prime_titles.json', 'utf-8');
//     const data: AnimeData[] = JSON.parse(rawData);

//     const movies: Anime[] = [];
//     //const tvShows: TvShowData[] = [];

//     data.forEach(item => {
//       const genres = item.genre.split(',').map(g => g.trim());
//       const cast = item.cast ? item.cast.split(',').map(c => c.trim()) : [];

//       if (item.type.toLowerCase() === 'movie') {
//         movies.push({
//           title: item.title,
//           description: item.description || '',
//           release_year: item.release_year || null,
//           rating: normalizeRating(item.rating),
//           trailerURL: '',
//           genres,
//           duration: item.duration || null,
//           cast,
//           posterURL: null
//         });
//       }
//        else if (item.type.toLowerCase() === 'tv show') {
//         tvShows.push({
//           title: item.title,
//           description: item.description || '',
//           release_year: item.release_year || null,
//           rating: parseFloat(item.rating) || 0,
//           youtube_trailer_id: null,
//           genres,
//           duration: item.duration || '0 min',
//           cast,
//           thumbnail_url: null
//         });
//       }
//       else{
//         console.log("failed");
//       }
//     });

//     // Check for existing items
//     const existingMovies = await prisma.movies.findMany({
//       where: {
//         title: {
//           in: movies.map(movie => movie.title),
//         },
//       },
//     });

//     const existingTvShows = await prisma.tvShow.findMany({
//       where: {
//         title: {
//           in: tvShows.map(show => show.title),
//         },
//       },
//     });

//     // Filter out existing items
//     const newMovies = movies.filter(
//       movie => !existingMovies.some(existing => existing.title === movie.title)
//     );

//     const newTvShows = tvShows.filter(
//       show => !existingTvShows.some(existing => existing.title === show.title)
//     );

//     // Insert new items
//     if (newMovies.length > 0) {
//       await prisma.movies.createMany({
//         data: newMovies,
//         skipDuplicates: true,
//       });
//       console.log(`${newMovies.length} new movie(s) inserted.`);
//     }

//     if (newTvShows.length > 0) {
//       await prisma.tvShow.createMany({
//         data: newTvShows,
//         skipDuplicates: true,
//       });
//       console.log(`${newTvShows.length} new TV show(s) inserted.`);
//     }

//     console.log('Import completed successfully');
//   } catch (error) {
//     console.error('Error importing data:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// importData();



// import { PrismaClient } from '@prisma/client';
// import { promises as fs } from 'fs';

// const prisma = new PrismaClient();

// interface AnimeData {
//   uid: number;
//   title: string;
//   synopsis: string;
//   genre: string;
//   aired: string;
//   episodes: number;
//   members: number;
//   popularity: number;
//   ranked: number;
//   score: string;
//   img_url: string;
//   link: string;
// }

// function normalizeRating(score: string): number {
//   const numScore = parseFloat(score) || 0;
//   return Math.min(Math.max(numScore, 0), 9.99);
// }

// function extractYear(aired: string): number | null {
//   const match = aired.match(/\d{4}/);
//   return match ? parseInt(match[0]) : null;
// }

// function parseGenres(genreStr: string): string[] {
//   try {
//     return JSON.parse(genreStr.replace(/'/g, '"'));
//   } catch {
//     return [];
//   }
// }

// async function importData() {
//   try {
//     const rawData = await fs.readFile('../data/animes.json', 'utf-8');
//     const data: AnimeData[] = JSON.parse(rawData);

//     const animeList = data.map(item => ({
//       title: item.title,
//       description: item.synopsis,
//       thumbnail_url: item.img_url,
//       youtube_trailer_id: null,
//       rating: normalizeRating(item.score),
//       duration: `${item.episodes} episodes`,
//       release_year: extractYear(item.aired),
//       genres: parseGenres(item.genre),
//     }));

//     const existingAnime = await prisma.anime.findMany({
//       where: {
//         title: {
//           in: animeList.map(anime => anime.title),
//         },
//       },
//     });

//     const newAnime = animeList.filter(
//       anime => !existingAnime.some(existing => existing.title === anime.title)
//     );

//     if (newAnime.length > 0) {
//       await prisma.anime.createMany({
//         data: newAnime,
//         skipDuplicates: true,
//       });
//       console.log(`${newAnime.length} new anime(s) inserted.`);
//     }

//     console.log('Import completed successfully');
//   } catch (error) {
//     console.error('Error importing data:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// importData();



import { PrismaClient } from '@prisma/client';
import { promises as fs } from 'fs';

const prisma = new PrismaClient();

interface AnimeData {
  anime_id: number;
  Name: string;
  Score: string;
  Genres: string;
  Synopsis: string;
  Episodes: string;
  Aired: string;
  Duration: string;
  Rating: string;
  "Image URL": string;
}

function normalizeRating(score: string): number {
  const numScore = parseFloat(score) || 0;
  return Math.min(Math.max(numScore, 0), 9.99);
}

function extractYear(aired: string): number | null {
  const match = aired.match(/\d{4}/);
  return match ? parseInt(match[0]) : null;
}

function parseGenres(genres: string): string[] {
  return genres.split(',').map(g => g.trim());
}

async function importData() {
  try {
    const rawData = await fs.readFile('../data/anime-dataset-2023.json', 'utf-8');
    const data: AnimeData[] = JSON.parse(rawData);

    const animeList = data.map(item => ({
      title: item.Name,
      description: item.Synopsis,
      thumbnail_url: item["Image URL"],
      youtube_trailer_id: null,
      rating: normalizeRating(item.Score),
      duration: item.Duration,
      release_year: extractYear(item.Aired),
      genres: parseGenres(item.Genres)
    }));

    const existingAnime = await prisma.anime.findMany({
      where: {
        title: {
          in: animeList.map(anime => anime.title)
        }
      }
    });

    const newAnime = animeList.filter(
      anime => !existingAnime.some(existing => existing.title === anime.title)
    );

    if (newAnime.length > 0) {
      await prisma.anime.createMany({
        data: newAnime,
        skipDuplicates: true
      });
      console.log(`${newAnime.length} new anime(s) inserted.`);
    }

    console.log('Import completed successfully');
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importData();