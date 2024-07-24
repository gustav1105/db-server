/*
  Warnings:

  - A unique constraint covering the columns `[filename]` on the table `ProductDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductDetails_filename_key" ON "ProductDetails"("filename");
