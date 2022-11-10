import * as exec from "child_process";
import * as fs from "fs";

export const convertMp4ToGif = async (fileName, newFileName, frameRate, startTime = 0, duration = 0) => {
    return new Promise(async (resolve, reject) => {
      newFileName = newFileName.replace(".mp4", ".gif");
      newFileName = newFileName.replace(".MP4", ".gif");
      newFileName = newFileName.replace(".MOV", ".gif");
      newFileName = newFileName.replace(".mov", ".gif");
      newFileName = newFileName.replace(".webm", ".gif");
      newFileName = newFileName.replace(".WEBM", ".gif");
      newFileName = newFileName.replace(".GIF", ".gif");
      console.log("new filename => ", newFileName, fileName);
      try {
        if (fs.existsSync(`${newFileName}`)) {
          fs.unlinkSync(`${newFileName}`);
        }

        const result = exec.execSync(
            `ffmpeg -ss ${startTime} -t ${duration} -i ${fileName} -vf "fps=${frameRate},scale=500:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 ${newFileName} `,
            ).toString();

        resolve(result);

      } catch (err) {
        reject(err);
      }

    }).catch((error) => {
      console.log('convertMp4ToGif error: ', error)
      throw error;
    });
  }
