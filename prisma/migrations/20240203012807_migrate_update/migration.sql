/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `Content` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Content_description_key" ON "Content"("description");
