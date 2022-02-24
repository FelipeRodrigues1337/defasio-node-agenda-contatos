import User from "../model/User";
import { getRepository } from "typeorm";
import AppError from "../errors/AppError";

export default class FindUserByIDService {
  public async execute(id: string): Promise<User | undefined> {
    const usersRepository = getRepository(User);

    const checkUserExist = await usersRepository.findOne({
      where: { id },
    });

    if (!checkUserExist) {
      throw new AppError("This User does not exist.");
    }

    return checkUserExist;
  }
}
