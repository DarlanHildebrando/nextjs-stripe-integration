/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "client"("email");
