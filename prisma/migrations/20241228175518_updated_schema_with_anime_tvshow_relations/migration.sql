/*
  Warnings:

  - You are about to drop the `Recommendations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recommendations" DROP CONSTRAINT "Recommendations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_movie_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Movie_Interactions" DROP CONSTRAINT "User_Movie_Interactions_movie_id_fkey";

-- AlterTable
ALTER TABLE "Movies" ALTER COLUMN "genres" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "genres" SET DATA TYPE TEXT[];

-- AlterTable
ALTER TABLE "Reviews" ADD COLUMN     "anime_id" INTEGER,
ADD COLUMN     "tv_show_id" INTEGER,
ALTER COLUMN "movie_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User_Movie_Interactions" ADD COLUMN     "anime_id" INTEGER,
ADD COLUMN     "tv_show_id" INTEGER,
ALTER COLUMN "movie_id" DROP NOT NULL;

-- DropTable
DROP TABLE "Recommendations";

-- CreateTable
CREATE TABLE "Anime" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "youtube_trailer_id" TEXT,
    "rating" DOUBLE PRECISION NOT NULL,
    "duration" TEXT,
    "release_year" INTEGER NOT NULL,
    "genres" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TvShow" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "youtube_trailer_id" TEXT,
    "rating" DOUBLE PRECISION NOT NULL,
    "duration" TEXT NOT NULL,
    "release_year" INTEGER,
    "genres" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cast" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TvShow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "movie_id" INTEGER,
    "anime_id" INTEGER,
    "tv_show_id" INTEGER,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User_Movie_Interactions" ADD CONSTRAINT "User_Movie_Interactions_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movies"("movie_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Movie_Interactions" ADD CONSTRAINT "User_Movie_Interactions_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "Anime"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Movie_Interactions" ADD CONSTRAINT "User_Movie_Interactions_tv_show_id_fkey" FOREIGN KEY ("tv_show_id") REFERENCES "TvShow"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movies"("movie_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "Anime"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_tv_show_id_fkey" FOREIGN KEY ("tv_show_id") REFERENCES "TvShow"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movies"("movie_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "Anime"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_tv_show_id_fkey" FOREIGN KEY ("tv_show_id") REFERENCES "TvShow"("id") ON DELETE SET NULL ON UPDATE CASCADE;
