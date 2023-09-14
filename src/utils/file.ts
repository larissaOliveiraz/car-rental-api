import fs, { readdirSync, rmSync } from "fs";

export const deleteFile = async (filename: string) => {
   try {
      await fs.promises.stat(filename);
   } catch (error) {
      return;
   }

   await fs.promises.unlink(filename);
};

export const deleteAllFiles = async (directory: string) => {
   try {
      readdirSync(directory).forEach((file) => rmSync(`${directory}/${file}`));
   } catch (error) {
      return;
   }
};
