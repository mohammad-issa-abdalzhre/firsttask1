/*
  Warnings:

  - Added the required column `position` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employeeId" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "employeeSalary" REAL NOT NULL
);
INSERT INTO "new_Employee" ("employeeId", "employeeSalary", "id") SELECT "employeeId", "employeeSalary", "id" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_employeeId_key" ON "Employee"("employeeId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
