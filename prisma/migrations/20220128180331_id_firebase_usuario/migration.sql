/*
  Warnings:

  - A unique constraint covering the columns `[id_firebase]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_firebase` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "id_firebase" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "usuario_id_firebase_key" ON "usuario"("id_firebase");
