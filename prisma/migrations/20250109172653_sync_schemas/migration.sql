/*
  Warnings:

  - You are about to drop the column `posterURL` on the `Movies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movies" DROP COLUMN "posterURL",
ADD COLUMN     "thumbnail_url" TEXT;
