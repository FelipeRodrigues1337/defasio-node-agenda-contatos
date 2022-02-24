import { Router } from "express";
import CreateUserService from "../services/CreateUserService";
import multer from "multer";
import uploadConfig from "../config/upload";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import DeleteUserService from "../services/DeleteUserService";
import UpdateUserService from "../services/UpdateUserService";
import ListUserService from "../services/ListUserService";
import FindUserByIDService from "../services/FindUserByIDService";

const usersRouter = Router();
const upload = multer(uploadConfig);

//Criar novo contato
usersRouter.post("/", async (request, response) => {
  try {
    const { name, email, telefone } = request.body;

    const userService = new CreateUserService();
    const user = await userService.execute({ name, email, telefone });

    return response.json(user);
  } catch (Error) {
    return response.status(400).json({ Error });
  }
});

//Listar
usersRouter.get("/", async (request, response) => {
  const listUserService = new ListUserService();

  const list = await listUserService.execute();

  return response.json(list);
});

//Listar por ID
usersRouter.get("/:id", async (request, response) => {
  const { id } = request.params;
  const findByIdService = new FindUserByIDService();

  const user = await findByIdService.execute(id);

  return response.json(user);
});

//Atualizar dados
usersRouter.put("/update/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const { name, email, telefone } = request.body;
    const updateUserService = new UpdateUserService();

    const updatedUser = await updateUserService.execute({
      id: id,
      name: name,
      email: email,
      telefone: telefone,
    });

    return response.json({ updatedUser });
  } catch (Error) {
    return response.status(400).json({ Error });
  }
});

//Atualizar avatares
// Por ser um projeto pequeno vou tratar os arquivos de forma statica
usersRouter.patch(
  "/avatar/:id",
  upload.single("avatar"),
  async (request, response) => {
    const { id } = request.params;
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: id,
      avatarFilename: request.file.filename,
    });
    return response.json(user);
  }
);

//Remover contato
usersRouter.delete("/remove/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deleteUserService = new DeleteUserService();

    await deleteUserService.execute(id);

    return response.status(200).send();
  } catch (Error) {
    return response.status(400).json({ Error });
  }
});

export default usersRouter;
