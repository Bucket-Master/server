/*
  Warnings:

  - Added the required column `number` to the `buckets` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_buckets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_buckets" ("created_at", "id", "status") SELECT "created_at", "id", "status" FROM "buckets";
DROP TABLE "buckets";
ALTER TABLE "new_buckets" RENAME TO "buckets";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
