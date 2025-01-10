/*
  Warnings:

  - The `interatcion_type` column on the `User_Movie_Interactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Movies" ALTER COLUMN "duration" DROP NOT NULL,
ALTER COLUMN "cast" SET DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "User_Movie_Interactions" DROP COLUMN "interatcion_type",
ADD COLUMN     "interatcion_type" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
