/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Product";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ProductDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "details" TEXT NOT NULL
);
