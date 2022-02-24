import User from "../model/User";
import { getRepository } from "typeorm";
import AppError from "../errors/AppError";

interface RequestDTO {
  id: string;
  name: string;
  email: string;
  telefone: string;
}

export default class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    telefone,
  }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExist = await usersRepository.findOne({
      where: { id },
    });

    if (!checkUserExist) {
      throw new AppError("This ID does not exist.", 400);
    }

    await usersRepository.update(
      {
        id: id,
      },
      {
        name,
        email,
        telefone,
      }
    );

    const updatedUser = await usersRepository.findOne({
      where: { id },
    });

    if (!updatedUser) {
      throw new AppError("An error occurred during the update", 500);
    }

    return updatedUser;
  }
}
