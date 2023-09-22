import { RentalsRepository } from "../../../infra/prisma/repositories/rentals/RentalsRepository";
import { UsersRepository } from "../../../infra/prisma/repositories/users/UsersRepository";
import { ListRentalsByUser } from "../ListRentalsByUserService";

export function makeListRentalsByUserService() {
  const rentalsRepository = new RentalsRepository();
  const usersRepository = new UsersRepository();
  const service = new ListRentalsByUser(rentalsRepository, usersRepository);

  return service;
}
