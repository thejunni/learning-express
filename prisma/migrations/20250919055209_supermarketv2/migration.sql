/*
  Warnings:

  - You are about to drop the column `nama` on the `Supermarket` table. All the data in the column will be lost.
  - You are about to drop the column `owner` on the `Supermarket` table. All the data in the column will be lost.
  - Added the required column `name` to the `Supermarket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Supermarket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Supermarket" DROP CONSTRAINT "Supermarket_owner_fkey";

-- AlterTable
ALTER TABLE "public"."Supermarket" DROP COLUMN "nama",
DROP COLUMN "owner",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Supermarket" ADD CONSTRAINT "Supermarket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
