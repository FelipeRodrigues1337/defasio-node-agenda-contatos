import User from "../model/User";
import { getRepository } from "typeorm";
import AppError from "../errors/AppError";

interface RequestDTO {
  name: string;
  email: string;
  telefone: string;
}

export default class CreateUserService {
  public async execute({ name, email, telefone }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExist = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExist) {
      throw new AppError("Email address already used.");
    }

    const user = usersRepository.create({
      name,
      email,
      telefone,
    });

    await usersRepository.save(user);

    return user;
  }
}
