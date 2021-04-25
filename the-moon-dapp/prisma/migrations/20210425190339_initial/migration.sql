-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userAuthId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "profilePic" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
