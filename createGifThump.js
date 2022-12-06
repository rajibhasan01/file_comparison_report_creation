import * as exec from "child_process";
import * as fs from "fs";

export const createGifThumb = async (fileName, newFileName, frameRate) => {
    return new Promise( async (resolve, reject) => {

      exec.exec(
        `ffmpeg -i ${fileName} -vf "fps=${frameRate},scale=200:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 -f gif ${newFileName}-200px`,
        (error, stdout, stderr) => {
          if (error) {
            reject(error);
          }
          resolve("thumbCreatedSuccessfully");
        }
      );
    }).catch((error) => {
      console.log('createGifThumb error: ', error);
      throw error;
    });
  }