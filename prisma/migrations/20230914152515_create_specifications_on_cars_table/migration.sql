/*
  Warnings:

  - A unique constraint covering the columns `[license_plate]` on the table `cars` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "specifications_on_cars" (
    "car_id" TEXT NOT NULL,
    "specification_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "specifications_on_cars_pkey" PRIMARY KEY ("car_id","specification_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cars_license_plate_key" ON "cars"("license_plate");

-- AddForeignKey
ALTER TABLE "specifications_on_cars" ADD CONSTRAINT "specifications_on_cars_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specifications_on_cars" ADD CONSTRAINT "specifications_on_cars_specification_id_fkey" FOREIGN KEY ("specification_id") REFERENCES "specifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
