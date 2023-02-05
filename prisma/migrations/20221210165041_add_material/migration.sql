/*
  Warnings:

  - The primary key for the `material` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `material` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `materialquantitylog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `materialquantitylog` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `idMaterial` to the `MaterialQuantityLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `material` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `name` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `materialquantitylog` DROP PRIMARY KEY,
    ADD COLUMN `idMaterial` INTEGER NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `loggedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `MaterialQuantityLog` ADD CONSTRAINT `MaterialQuantityLog_idMaterial_fkey` FOREIGN KEY (`idMaterial`) REFERENCES `Material`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
