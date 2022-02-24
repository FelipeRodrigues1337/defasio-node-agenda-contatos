import User from "../model/User";
import { getRepository } from "typeorm";

export default class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getRepository(User);

    const list = await usersRepository.find();

    return list;
  }
}
