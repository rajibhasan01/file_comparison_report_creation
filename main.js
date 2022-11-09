import * as fs from 'fs';

// internal import
import { getFilesFromDir } from './getFilesFromDir.js';
import { getFileSize } from './fileSize.js';
import { getFramePerSecondFromFileName } from './fpsCount.js';
import { alphNumericName } from './generateUniqueId.js';

// media file directory
const fileDir = '/home/rajibhasan/Desktop/gifbuz-tump/MovFile';


// Main Function
const mainFunction = async () => {
    try {
        const files = await getFilesFromDir(fileDir);
        files.forEach(async(fileName, index) => {
            // const newName = alphNumericName() + '.MOV';
            // await fs.promises.rename(`${fileDir}/${fileName}`, `${fileDir}/${newName}`);

            const fps = await getFramePerSecondFromFileName(`${fileDir}/${fileName}`);
            const size = await getFileSize(`${fileDir}/${fileName}`);
            console.log(`${index}. ${fileName} ================== ${fps.original} ==== ${fps.HDFps} ==== ${fps.SDFps} ==== ${size.bytes}`);

            

        })
    } catch (error) {
        console.log("Error => ", error);
    }
};

mainFunction();
