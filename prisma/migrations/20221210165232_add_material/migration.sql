/*
  Warnings:

  - Added the required column `idUser` to the `MaterialQuantityLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `materialquantitylog` ADD COLUMN `idUser` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `MaterialQuantityLog` ADD CONSTRAINT `MaterialQuantityLog_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
