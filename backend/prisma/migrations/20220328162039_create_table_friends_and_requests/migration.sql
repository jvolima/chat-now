-- CreateTable
CREATE TABLE "requests_to_be_a_friend" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "requester_id" TEXT NOT NULL,
    "requested_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmation_date" DATETIME,
    CONSTRAINT "requests_to_be_a_friend_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "requests_to_be_a_friend_requested_id_fkey" FOREIGN KEY ("requested_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "friends" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "friend_id" TEXT NOT NULL,
    CONSTRAINT "friends_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "friends_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
