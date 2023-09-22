import { Car, Prisma, Specification } from "@prisma/client";
import { ICarsRepository } from "../../../../repositories/cars/ICarsRepository";
import { prisma } from "../../../../database";

export class CarsRepository implements ICarsRepository {
  async findAvailable(categoryId?: string, name?: string, brand?: string) {
    const cars = await prisma.car.findMany({
      where: {
        available: true,
      },
    });

    if (categoryId || name || brand) {
      const carsFiltered = await prisma.car.findMany({
        where: {
          available: true,
          category_id: categoryId && categoryId,
          name: name && name,
          brand: brand && brand,
        },
      });

      return carsFiltered;
    }

    return cars ? cars : null;
  }

  async findById(carId: string) {
    const car = await prisma.car.findUnique({
      where: {
        id: carId,
      },
    });

    return car ? car : null;
  }

  async findByLicensePlate(licentePlate: string) {
    const car = await prisma.car.findUnique({
      where: {
        license_plate: licentePlate,
      },
    });

    return car ? car : null;
  }

  async saveSpecification(carId: string, specificationId: string) {
    const car = await prisma.car.update({
      where: {
        id: carId,
      },
      data: {
        specifications: {
          create: [{ specification_id: specificationId }],
        },
      },
    });

    return car;
  }

  async create(data: Prisma.CarUncheckedCreateInput) {
    const car = await prisma.car.create({
      data,
    });

    return car;
  }

  async updateAvailable(carId: string, available: boolean) {
    await prisma.car.update({
      where: {
        id: carId,
      },
      data: {
        available,
      },
    });
  }
}
