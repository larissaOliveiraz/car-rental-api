import { randomUUID } from "crypto";
import { Car, Prisma, Specification } from "@prisma/client";
import { ICarsRepository } from "../ICarsRepository";

interface ICar extends Car {
  specifications?: string[];
}

export class InMemoryCarsRepository implements ICarsRepository {
  private cars: ICar[] = [];

  async findById(carId: string) {
    const car = this.cars.find((item) => item.id === carId);

    return car ? car : null;
  }

  async findByLicensePlate(licentePlate: string) {
    const car = this.cars.find((item) => item.license_plate === licentePlate);

    return car ? car : null;
  }

  async findAvailable(categoryId: string, name: string, brand: string) {
    const cars = this.cars.filter((item) => item.available === true);

    if (categoryId || name || brand) {
      const carsSerch = cars.filter(
        (car) =>
          (categoryId && car.category_id === categoryId) ||
          (name && car.name === name) ||
          (brand && car.brand === brand)
      );

      return carsSerch;
    }

    return cars;
  }

  async saveSpecification(carId: string, specificationId: string) {
    const carIndex = this.cars.findIndex((item) => item.id === carId);

    this.cars[carIndex].specifications = [];
    const specificationsAdded = this.cars[carIndex].specifications;

    specificationsAdded.push(specificationId);

    return this.cars[carIndex];
  }

  async create(data: Prisma.CarUncheckedCreateInput) {
    const car: Car = {
      id: data.id ? data.id : randomUUID(),
      category_id: data.category_id,
      name: data.name,
      description: data.description,
      brand: data.brand,
      available: JSON.stringify(data.available) ? data.available : true,
      daily_rate: data.daily_rate,
      fine_amount: data.fine_amount,
      license_plate: data.license_plate,
      created_at: new Date(),
    };

    this.cars.push(car);

    return car;
  }

  async updateAvailable(id: string, available: boolean) {
    const carIndex = this.cars.findIndex((item) => item.id === id);
    if (this.cars[carIndex]) {
      this.cars[carIndex].available = available;
    }
  }
}
