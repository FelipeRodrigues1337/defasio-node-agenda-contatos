import User from "../model/User";
import { getRepository } from "typeorm";
import AppError from "../errors/AppError";

export default class DeleteUserService {
  public async execute(id: string): Promise<User | undefined> {
    const usersRepository = getRepository(User);

    const checkUserExist = await usersRepository.findOne({
      where: { id },
    });

    if (!checkUserExist) {
      throw new AppError("This ID does not exist.");
    }

    await usersRepository.delete({ id });

    return checkUserExist;
  }
}
