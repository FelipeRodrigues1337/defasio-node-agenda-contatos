import path from "path";
import crypto from "crypto";
import multer from "multer";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      //gera um hash baseado no nome original da img, posteriormente funcionara como "ID" para ser retornado ao front.
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
