-- CreateTable
CREATE TABLE "rentals" (
    "id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3),
    "expected_return_date" TIMESTAMP(3) NOT NULL,
    "total" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "car_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "rentals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
