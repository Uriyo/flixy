import { NextResponse } from "next/server";
import fetchAndSaveTrailerId from "@/lib/fetchtrailer";

export async function POST(req: Request) {
  try {
    const { movieTitle } = await req.json();

    if (!movieTitle) {
      return NextResponse.json({ error: "Movie title is required." }, { status: 400 });
    }

    const trailerURL = await fetchAndSaveTrailerId(movieTitle);
    if (trailerURL) {
      return NextResponse.json({ trailerURL });
    } else {
      return NextResponse.json({ error: "Trailer not found." }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
