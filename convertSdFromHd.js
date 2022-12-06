import * as exec from "child_process";
import * as fs from "fs";

export const convertHdToSdGif = async (fileName, newFileName, frameRate, width = 500, startTime = 0, duration = 0) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (fs.existsSync(`${newFileName}`)) {
          fs.unlinkSync(`${newFileName}`);
        }

        const result = exec.execSync(
            `ffmpeg -ss ${startTime} -t ${duration} -i ${fileName} -filter_complex "[0:v] fps=${frameRate},scale=${width}:-1,split [a][b];[a] palettegen=reserve_transparent=on:transparency_color=ffffff [p];[b][p] paletteuse" -f gif ${newFileName}`,
            ).toString();

        resolve(result);

      } catch (err) {
        reject(err);
      }

    }).catch((error) => {
      console.log('convertHdToSDGif error: ', error)
      throw error;
    });
  }


  export const copyHDtoSD = async (fileName, newFileName, frameRate, width = 500, startTime = 0, duration = 0) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (fs.existsSync(`${newFileName}`)) {
          fs.unlinkSync(`${newFileName}`);
        }

        const result = exec.execSync(
            // `ffmpeg -ss ${startTime} -t ${duration} -i ${fileName} -filter_complex "[0:v] fps=${frameRate},scale=${width}:-1,split [a][b];[a] palettegen=max_colors=64:reserve_transparent=0[p];[b][p] paletteuse" -f gif ${newFileName}`,
            `ffmpeg -i ${fileName} -codec copy -f gif ${newFileName}`
            ).toString();

        resolve(result);

      } catch (err) {
        reject(err);
      }

    }).catch((error) => {
      console.log('convertHdToSDGif error: ', error)
      throw error;
    });
  }