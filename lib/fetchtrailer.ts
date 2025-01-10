import { getJson } from "serpapi";
import prisma from "@/lib/prisma";

const fetchAndSaveTrailerId = async (movieTitle: string): Promise<string | null> => {
  try {
    // Find the first movie by title (if title is not unique)
    const movie = await prisma.movies.findFirst({
      where: { title: movieTitle },
    });

    if (movie?.trailerURL && movie.trailerURL !== "") {
      console.log(`Trailer ID already exists for "${movieTitle}": ${movie.trailerURL}`);
      return movie.trailerURL;
    }

    // If not found, fetch trailer ID from SERP API
    console.log(`Fetching trailer for "${movieTitle}" from SERP API...`);
    const searchParams = {
      engine: "youtube",
      search_query: `${movieTitle} trailer`,
      api_key: process.env.SERP_API_KEY!,
    };

    const fetchTrailerId = () =>
      new Promise<string>((resolve, reject) => {
        getJson(searchParams, (json: { video_results: any[] }) => {
          if (json && json.video_results && json.video_results.length > 0) {
            // Extract the video ID from the first result's YouTube URL
            const youtubeUrl = json.video_results[0].link;
            const videoId = new URL(youtubeUrl).searchParams.get("v");
            if (videoId) {
              resolve(videoId);
            } else {
              reject(new Error(`No valid video ID found for "${movieTitle}"`));
            }
          } else {
            reject(new Error(`No trailer found for "${movieTitle}"`));
          }
        });
      });

    const trailerId = await fetchTrailerId();

    // Update the database with the new trailer ID
    if (movie) {
      await prisma.movies.update({
        where: { movie_id: movie.movie_id }, // Update using the movie_id
        data: {
          trailerURL: `${trailerId}`,
        },
      });

      console.log(`Trailer ID fetched and saved for "${movieTitle}": ${trailerId}`);
      return `https://www.youtube.com/watch?v=${trailerId}`;
    } else {
      console.log(`No movie found with title "${movieTitle}"`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching trailer ID for "${movieTitle}":`, error.message);
    return null;
  }
};

export default fetchAndSaveTrailerId;
