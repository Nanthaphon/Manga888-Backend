/*
  Warnings:

  - You are about to drop the column `phone_No` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `phone_No`,
    ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `country` VARCHAR(191) NULL,
    ADD COLUMN `mobile` INTEGER NULL,
    ADD COLUMN `province` VARCHAR(191) NULL,
    ADD COLUMN `zipCode` INTEGER NULL;
