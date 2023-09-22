import { UserNotFoundError } from "../../errors/users/UserNotFoundError";
import { IRentalsRepository } from "../../repositories/rentals/IRentalsRepository";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

interface IRequest {
  userId: string;
}

export class ListRentalsByUser {
  constructor(
    private rentalsRepository: IRentalsRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute({ userId }: IRequest) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError();
    }

    const rentals = await this.rentalsRepository.findManyByUser(userId);

    return rentals;
  }
}
