/*
  Warnings:

  - You are about to drop the column `id_user` on the `users_tokens` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `users_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users_tokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "refresh_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_date" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_users_tokens" ("created_at", "expires_date", "id", "refresh_token") SELECT "created_at", "expires_date", "id", "refresh_token" FROM "users_tokens";
DROP TABLE "users_tokens";
ALTER TABLE "new_users_tokens" RENAME TO "users_tokens";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
