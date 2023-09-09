import multer from "multer";
import { resolve } from "path";
import { randomBytes } from "node:crypto";

export default {
   upload(folder: string) {
      return {
         storage: multer.diskStorage({
            destination: resolve(__dirname, "..", "..", folder),
            filename: (request, file, callback) => {
               const fileHash = randomBytes(16).toString("hex");
               const filename = `${fileHash}-${file.originalname}`;

               return callback(null, filename);
            },
         }),
      };
   },
};
