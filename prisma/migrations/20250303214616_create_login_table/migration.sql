/*
  Warnings:

  - You are about to drop the `vlog_table` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "vlog_table";

-- CreateTable
CREATE TABLE "login" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ID" PRIMARY KEY ("id")
);
