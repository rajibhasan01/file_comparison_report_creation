import * as fs from 'fs';

// internal import
import { getFilesFromDir } from './getFilesFromDir.js';
import { getFileSize } from './fileSize.js';
import { getFramePerSecondFromFileName } from './fpsCount.js';
import { convertMp4ToGif } from './fileConverter.js';
import { alphNumericName } from './generateUniqueId.js';

// media file directory
const fileDir = '/home/rajibhasan/Desktop/gifbuz-tump/MovFile';
const baseDir = '/home/rajibhasan/Desktop/gifbuz-tump';

// Main Function
const mainFunction = async () => {
    try {
        const result = [];

        const files = await getFilesFromDir(fileDir);
        files.forEach(async(fileName, index) => {
            // const newName = alphNumericName() + '.MOV';
            // await fs.promises.rename(`${fileDir}/${fileName}`, `${fileDir}/${newName}`);

            const fps = await getFramePerSecondFromFileName(`${fileDir}/${fileName}`);
            const size = await getFileSize(`${fileDir}/${fileName}`);
            const sdSize = await getFileSize(`${baseDir}/sdGif/${fileName.replace('.MOV', '.gif')}`);
            const hdSize = await getFileSize(`${baseDir}/hdGif/${fileName.replace('.MOV', '.gif')}`);
            // convertMp4ToGif(`${fileDir}/${fileName}`, `${baseDir}/sdGif/${fileName}`, fps.SDFps);
            // convertMp4ToGif(`${fileDir}/${fileName}`, `${baseDir}/hdGif/${fileName}`, fps.HDFps);

            const fileDetails = {};
            fileDetails["Name"] = fileName;
            fileDetails["DefaultFps"] = fps.original;
            fileDetails["HDFps"] = fps.HDFps;
            fileDetails["SDFps"] = fps.SDFps;
            fileDetails["OrginalSizeInByte"] = size.bytes;
            fileDetails["OrginalSizeInMB"] = Number(size.mb.toFixed(2));
            fileDetails["SDSizeInByte"] = sdSize.bytes;
            fileDetails["SDSizeInMB"] = Number(sdSize.mb.toFixed(2));
            fileDetails["HDSizeInByte"] = hdSize.bytes;
            fileDetails["HDSizeInMB"] = Number(hdSize.mb.toFixed(2));

            result[index] = fileDetails;
            console.log(result)

            // console.log(`${index}. ${fileName} ================== ${fps.original} ==== ${fps.HDFps} ==== ${fps.SDFps} ==== ${size.bytes}`);

        })
    } catch (error) {
        console.log("Error => ", error);
    }
};

await mainFunction();

