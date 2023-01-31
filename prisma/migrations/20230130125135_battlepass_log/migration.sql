-- CreateTable
CREATE TABLE `BattlepassLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `xp` INTEGER NOT NULL,
    `currentLimitProgress` INTEGER NOT NULL,
    `loggedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idUser` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BattlepassLog` ADD CONSTRAINT `BattlepassLog_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
