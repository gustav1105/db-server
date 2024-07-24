/*
  Warnings:

  - Added the required column `filename` to the `ProductDetails` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "details" TEXT NOT NULL,
    "filename" TEXT NOT NULL
);
INSERT INTO "new_ProductDetails" ("details", "id") SELECT "details", "id" FROM "ProductDetails";
DROP TABLE "ProductDetails";
ALTER TABLE "new_ProductDetails" RENAME TO "ProductDetails";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
