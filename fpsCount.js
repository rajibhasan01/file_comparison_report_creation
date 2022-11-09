import { exec } from 'child_process';

export const getFramePerSecondFromFileName = async(fileName) => {
    return new Promise((resolve , reject) => {
      try{
        exec(
          `ffprobe -v error -select_streams v -of default=noprint_wrappers=1:nokey=1 -show_entries stream=r_frame_rate /var/tmp/${fileName} `,
          (error, stdout, stderr) => {
            if (error) {
              // console.log('error => ', error);
              reject(error.message);
            }
            const result = stdout.toString().replace("\n", "");
            const fps = Math.floor(Number(result.split('/')[0])/Number(result.split('/')[1]));
            const fpsObj = {}
            fpsObj["HDFps"] = fps > 25 ? 25 : fps;
            fpsObj["SDFps"] = fps > 25 ? 18 : fps > 20 ? fps - 6 : fps > 15 ? fps - 5 : fps > 10 ? fps - 3 : fps > 5 ? fps - 2 : fps;
            resolve(fpsObj);
          }
        );
      } catch (error){
        console.log("Error occured => ", error);
        throw error;
      }

  }).catch(error => {
    console.log("error => ", error);
    throw error;
  })
  };