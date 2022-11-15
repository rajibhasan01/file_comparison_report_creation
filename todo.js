import * as path from 'path';
import * as fs from 'fs';

// internal import
import { getFilesFromDir } from './getFilesFromDir.js';
import { getFileSize } from './fileSize.js';
import { getFramePerSecondFromFileName } from './fpsCount.js';
import { convertMp4ToGif } from './fileConverter.js';
import { alphNumericName } from './generateUniqueId.js';
import { avrgRightCornerColor } from './addTextToGif.js';

export const toDo = async (fileDir, tragetDir) => {
    return new Promise(async(resolve, reject) => {
        try {
            const sdDir = `${tragetDir}/sdGif`;
            const hdDir = `${tragetDir}/hdGif`;
            const hd2sdGif = `${tragetDir}/hd2sdGif`;

            if (!fs.existsSync(hdDir)) {
                fs.mkdirSync(hdDir);
            }
            if (!fs.existsSync(sdDir)) {
                fs.mkdirSync(sdDir);
            }
            if (!fs.existsSync(hd2sdGif)) {
                fs.mkdirSync(hd2sdGif);
            }


            const result = [];
            let itemsProcessed = 0;
            let count = 0;

            const files = await getFilesFromDir(fileDir);
            files.forEach(async(fileName, index) => {
                const ext = path.extname(fileName);
                const fileType = ['.mp4', '.gif', '.mov'];
                if(fileType.indexOf(ext.toLocaleLowerCase()) !== -1){
                    const key = alphNumericName();
                    const newName = key + ext;
                    await fs.promises.rename(`${fileDir}/${fileName}`, `${fileDir}/${newName}`);
                    fileName = newName;

                    const fps = await getFramePerSecondFromFileName(`${fileDir}/${fileName}`);

                    // Create HD gif from media file
                    convertMp4ToGif(`${fileDir}/${fileName}`, `${hdDir}/${fileName}`, fps.HDFps);

                    // Create SD gif from media file
                    convertMp4ToGif(`${fileDir}/${fileName}`, `${sdDir}/${fileName}`, fps.SDFps);

                    // Create SD gif from HD gif file
                    convertMp4ToGif(`${hdDir}/${key}.gif`, `${hd2sdGif}/${fileName}`, fps.SDFps);

                    // Get the file size
                    const size = await getFileSize(`${fileDir}/${fileName}`);
                    const sdSize = await getFileSize(`${sdDir}/${key}.gif`);
                    const hdSize = await getFileSize(`${hdDir}/${key}.gif`);
                    const hd2sdSize = await getFileSize(`${hd2sdGif}/${key}.gif`);

                    // Get the avrg top right corner color [selective area is (80,30) from (5,5) axis]
                    const avrgColor = await avrgRightCornerColor(`${fileDir}/${fileName}`);

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
                    fileDetails["HD2SDSizeInByte"] = hd2sdSize.bytes;
                    fileDetails["HD2SDSizeInMB"] = Number(hd2sdSize.mb.toFixed(2));
                    fileDetails['topRightCornerAvrgColor'] = Number(avrgColor);

                    result[count++] = fileDetails;

                }
                // console.log(`${index}. ${fileName} ================== ${fps.original} ==== ${fps.HDFps} ==== ${fps.SDFps} ==== ${size.bytes}`);

                itemsProcessed++;
                if(itemsProcessed === files.length) {
                    console.log(result)
                    resolve(result);
                }

            });
        } catch (error){
            reject(error);
            throw error;
        }

    }).catch((error) => {
        throw error;
    })
}